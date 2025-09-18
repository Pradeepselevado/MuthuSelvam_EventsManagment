const eventModal = require("../Modal/EventModal");

module.exports.createEvent = async (req, res) => {
    const { eventName, eventDate, location, description, endDate, totalSeats } = req.body;
    try {
        if (!eventName) {
            return res.json({ status: false, message: "eventName is required" });
        }
        const newEvent = new eventModal({ eventName, eventDate, location, description, endDate, totalSeats });
        await newEvent.save();
        return res.json({ status: true, message: "Event created successfully", Event: newEvent });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.updateEvent = async (req, res) => {
    const { EventId, eventName, eventDate, location, description, endDate ,totalSeats} = req.body;
    try {

        const Event = await eventModal.findById(EventId);
        if (!Event) {
            return res.json({ status: false, message: "Event not found" });
        }
        const updatedData = {};
        if (eventName) updatedData.eventName = eventName;
        if (eventDate) updatedData.eventDate = eventDate;
        if (location) updatedData.location = location;
        if (description) updatedData.description = description;
        if (endDate) updatedData.endDate = endDate;
        if (totalSeats) updatedData.totalSeats = totalSeats;


        const updatedEvent = await eventModal.findByIdAndUpdate(EventId, updatedData, { new: true });
        return res.json({ status: true, message: "Event updated successfully", Event: updatedEvent });

    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getAllEvents = async (req, res) => {
    try {
        console.log("getAllEvents called");
        const Events = await eventModal.find({
            eventDate: { $gte: new Date(Date.now() + 19800000) }
        });
        console.log(Events);

        if (Events.length === 0) {
            return res.json({ status: true, message: "No upcoming events found", Events: [] });
        }

        return res.json({ status: true, Events });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.deleteEvent = async (req, res) => {
    const { EventId } = req.params;
    try {
        const Event = await eventModal.findById(EventId);
        if (!Event) {
            return res.json({ status: false, message: "Event not found" });
        }
        await eventModal.findByIdAndDelete(EventId);
        return res.json({ status: true, message: "Event deleted successfully" });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getEventById = async (req, res) => {
    const { EventId } = req.params;
    try {
        const Event = await eventModal.findById(EventId);
        if (!Event) {
            return res.json({ status: false, message: "Event not found" });
        }
        return res.json({ status: true, Event });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });

    }
}





