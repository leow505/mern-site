import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            console.error('Auth middleware error:', error);
            res.status(401).json({ success: false, message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

// Role-based authorization middleware
export const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        if (!roles.includes(req.user.role) && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: `Not authorized as ${roles.join(' or ')}`
            });
        }

        next();
    };
};

// Specific role middlewares for convenience
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ 
            success: false, 
            message: 'Not authorized as admin' 
        });
    }
};

export const officer = (req, res, next) => {
    if (req.user && (req.user.role === 'officer' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ 
            success: false, 
            message: 'Not authorized as officer' 
        });
    }
};

export const organizer = (req, res, next) => {
    if (req.user && (req.user.role === 'organizer' || req.user.role === 'officer' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ 
            success: false, 
            message: 'Not authorized as organizer' 
        });
    }
};

// Middleware to validate email domain
export const validateEmailDomain = (req, res, next) => {
    try {
        const { email } = req.body;
        
        // List of allowed domains
        const allowedDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com'];
        
        // Extract domain from email
        const domain = email.split('@')[1];
        
        if (!domain || !allowedDomains.includes(domain.toLowerCase())) {
            return res.status(400).json({ 
                success: false, 
                message: `Registration is only allowed with the following email domains: ${allowedDomains.join(', ')}`
            });
        }
        
        next();
    } catch (error) {
        console.log("Error in email domain validation: ", error.message);
        res.status(400).json({ 
            success: false, 
            message: 'Invalid email format' 
        });
    }
}; 