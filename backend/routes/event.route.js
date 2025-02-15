import express from "express";
import { createEvent, deleteEvent, getEvents, updateEvent, getEventID } from "../controllers/event.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getEvents);
router.get("/:id", getEventID);

// Protected routes - require authentication and specific roles
router.post("/", protect, authorize('admin', 'officer', 'organizer'), createEvent);
router.put("/:id", protect, authorize('admin', 'officer', 'organizer'), updateEvent);
router.delete("/:id", protect, authorize('admin', 'officer'), deleteEvent);

export default router;