import {create} from "zustand"

export const useEventStore = create((set) => ({
    events:[],
    setEvents: (events) => set({events}),
    createEvent: async (newEvent) => {
        if(!newEvent.name || !newEvent.date || !newEvent.location){
            return {success:false, message:"Please fill in all fields"}
        }
        const token = localStorage.getItem('userToken');
        const res = await fetch("/api/events", {
            method:"POST", 
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(newEvent),
        });
        const data = await res.json();
        if (data.success) {
            set((state) => ({events: [...state.events, data.data]}));
            return {success:true, message:"Event Created"};
        }
        return {success:false, message: data.message || "Failed to create event"};
    },

    fetchEvents: async () => {
        const token = localStorage.getItem('userToken');
        const res = await fetch("/api/events", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await res.json();
        if (data.success) {
            set({events: data.data});
            return {success: true, data: data.data};
        }
        return {success: false, message: data.message || "Failed to fetch events"};
    },

    deleteEvents: async (eventId) => {
        const token = localStorage.getItem('userToken');
        const res = await fetch(`/api/events/${eventId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        // updates current viewing list after delete so we don't need to refresh to display
        set(state => ({events: state.events.filter(event => event._id !== eventId)}));
        return { success: true, message:data.message};
    }
}));

