import express from 'express';
import { login, register, logout, verifyToken, getUsers, updateUserRole, updateUser, getOfficers } from '../controllers/auth.controller.js';
import { protect, validateEmailDomain, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', validateEmailDomain, register);
router.post('/login', login);
router.get('/officers', getOfficers);

// Protected routes
router.post('/logout', protect, logout);
router.get('/verify', protect, verifyToken);
router.get('/users', protect, admin, getUsers);
router.put('/users/:userId/role', protect, admin, updateUserRole);
router.put('/users/:userId', protect, admin, updateUser);

export default router;

