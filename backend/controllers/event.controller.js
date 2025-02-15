import Event from "../models/event.model.js";
import mongoose from "mongoose";


export const getEvents = async (req, res) =>{
    try {
        // Get query parameters
        const { startDate, endDate } = req.query;
        
        // Build query
        let query = {};
        
        // Add date range to query if provided
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        // Find events with query and sort by date
        const events = await Event.find(query)
            .sort({ date: 1 }) 
            .exec();

        res.status(200).json({success: true, data: events});
    } catch (error) {
        console.log("error in getting events: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const getEventID = async (req, res) =>{
    const {id} = req.params;
    try {
        const event = await Event.findById(id);
        res.status(200).json({success: true, data: event});
    } catch (error) {
        console.log("error in getting events: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const createEvent = async (req, res)=>{
    const event = req.body;

    if(!event.name || !event.date || !event.location){
        return res.status(400).json({success:false, message: "Marked fields are missing"});
    }

    const newEvent = new Event(event);
    try {
        await newEvent.save();
        res.status(201).json({success:true, data:newEvent});
    } catch (error) {
        console.log("Error in create event: ", error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
};

export const deleteEvent = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Invalid event id"});
    }
    try {
        const event = await Event.findByIdAndDelete(id);
        res.status(200).json({success: true, message:`Event '${event.name}' deleted`});
    } catch (error) {
        console.log("Error deleting event: ", error.message);
        res.status(500).json({success: false, message: "Event error"});
    }
};

export const updateEvent = async (req,res)=>{
    const {id} = req.params;
    const event = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Invalid event id"});
    }
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, event, {new:true});
        res.status(200).json({success: true, data:updatedEvent});
    } catch (error) {
        res.status(500).json({success: false, message:"Server Error"});
    }
};