import express from "express";

import { createEvent, deleteEvent, getEvents, updateEvent, getEventID } from "../controllers/event.controller.js";

const router = express.Router();

router.get("/", getEvents);

router.post("/", createEvent);

router.delete("/id", deleteEvent);

router.put("/:id", updateEvent);

router.get("/:id", getEventID);

export default router;