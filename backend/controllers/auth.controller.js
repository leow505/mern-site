import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured in environment variables');
    }
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with default role
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        });

        if (user) {
            try {
                const token = generateToken(user._id);
                return res.status(201).json({
                    success: true,
                    data: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        isAdmin: user.isAdmin,
                        isOfficer: user.isOfficer,
                        isOrganizer: user.isOrganizer,
                        token
                    }
                });
            } catch (tokenError) {
                console.log("Error generating token: ", tokenError.message);
                return res.status(201).json({
                    success: true,
                    data: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    warning: 'User created but token generation failed. Please contact administrator.'
                });
            }
        }
    } catch (error) {
        console.log("Error in registration: ", error.message);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        try {
            // Generate JWT token
            const token = generateToken(user._id);

            return res.status(200).json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isAdmin: user.isAdmin,
                    isOfficer: user.isOfficer,
                    isOrganizer: user.isOrganizer,
                    token
                }
            });
        } catch (tokenError) {
            console.log("Error generating token: ", tokenError.message);
            return res.status(500).json({ 
                success: false, 
                message: 'Login successful but token generation failed. Please contact administrator.' 
            });
        }
    } catch (error) {
        console.log("Error in login: ", error.message);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

export const logout = async (req, res) => {
    try {
        // Since we're using JWT, we just need to send a success response
        // The client will handle removing the token
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.log("Error in logout: ", error.message);
        res.status(500).json({ success: false, message: 'Server error during logout' });
    }
};

export const verifyToken = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Error in token verification: ", error.message);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export const getUsers = async (req, res) => {
    try {
        // Fetch all users except the current admin user
        const users = await User.find({ _id: { $ne: req.user._id } })
            .select('-password') // Exclude password field
            .sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.log("Error fetching users: ", error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while fetching users' 
        });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        // Validate role
        const validRoles = ['user', 'organizer', 'officer'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role specified'
            });
        }

        // Find user and update role
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Prevent changing admin role
        if (user.role === 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Cannot modify admin role'
            });
        }

        // Set role and corresponding title
        user.role = role;
        switch (role) {
            case 'officer':
                user.title = 'Officer';
                break;
            case 'organizer':
                user.title = 'Event Organizer';
                break;
            default:
                user.title = '';
        }

        await user.save();

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                title: user.title,
                role: user.role
            }
        });
    } catch (error) {
        console.log("Error updating user role: ", error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while updating user role'
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, title } = req.body;

        // Find user and update information
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Prevent updating admin users
        if (user.role === 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Cannot modify admin user'
            });
        }

        // Check if email is being changed and if it's already in use
        if (email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already in use'
                });
            }
        }

        user.name = name;
        user.email = email;
        user.title = title;

        await user.save();

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                title: user.title,
                role: user.role
            }
        });
    } catch (error) {
        console.log("Error updating user: ", error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while updating user'
        });
    }
};

export const getOfficers = async (req, res) => {
    try {
        // Find all users with role 'officer' and select only public information
        const officers = await User.find({ role: 'officer' })
            .select('name title description')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: officers
        });
    } catch (error) {
        console.log("Error fetching officers: ", error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while fetching officers' 
        });
    }
}; 