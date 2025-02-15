import mongoose from 'mongoose';

// Define privilege levels as constants
export const PRIVILEGES = {
    USER: 0,        // Basic user
    ORGANIZER: 1,   // Can create and manage events
    OFFICER: 2,     // Can manage events and some user privileges
    ADMIN: 3        // Full system access
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['user', 'organizer', 'officer', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual properties
userSchema.virtual('isAdmin').get(function() {
    return this.role === 'admin';
});

userSchema.virtual('isOfficer').get(function() {
    return this.role === 'officer' || this.role === 'admin';
});

userSchema.virtual('isOrganizer').get(function() {
    return this.role === 'organizer' || this.role === 'officer' || this.role === 'admin';
});

// Helper method to get role name
userSchema.methods.getRoleName = function() {
    switch (this.role) {
        case 'admin':
            return 'admin';
        case 'officer':
            return 'officer';
        case 'organizer':
            return 'organizer';
        default:
            return 'user';
    }
};

// Helper method to check if user has required privilege level
userSchema.methods.hasPrivilege = function(requiredRole) {
    return this.role === requiredRole || this.role === 'admin';
};

// Ensure virtuals are included in JSON output
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', userSchema);

export default User; 