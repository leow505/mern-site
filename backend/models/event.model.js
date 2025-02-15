import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    date:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    picture:{
        type: String,
        default: null
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
    
});

const Event = mongoose.model('Event', eventSchema);
export default Event;