import {create} from "zustand"

export const useEventStore = create((set) => ({
    events:[],
    setEvents: (events) => set({events}),
    createEvent: async (newEvent) => {
        if(!newEvent.name || !newEvent.date || !newEvent.location){
            return {success:false, message:"Please fill in all fields"}
        }
        const res =await fetch("/api/events", {
            method:"POST", 
            headers:{
            "Content-Type": "application/json",},
            body:JSON.stringify(newEvent),
    })
    const data = await res.json();
    set((state) => ({events: [...state.events, data.data]}));
    return {success:true, message:"Event Created"}
    },

    fetchEvents: async () => {
        const res = await fetch("/api/events");
        const data = await res.json();
        set({events: data.data});
    },

    deleteEvents: async () => {
        const res = await fetch(`/api/events/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        // updates current viewing list after delete so we don't need to refresh to display
        set(state => ({events: state.events.filter(event => event._id !== pid)}));
        return { success: true, message:data.message};
    }
}));

