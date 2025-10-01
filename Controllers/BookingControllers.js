const BookingModal = require("../Modal/BookingModal");
const eventModal = require("../Modal/EventModal");

module.exports.createBooking = async (req, res) => {
    const { eventId, userId, amount, paymentStatus, ticketcount } = req.body;
    try {

        const newBooking = new BookingModal({ eventId, userId, amount, paymentStatus,ticketcount });

        const eventDetails = await eventModal.findById(eventId);

        console.log(eventDetails.availableSeats);
        if (eventDetails.availableSeats <= 0) {
            return res.json({ status: false, message: "No available Seats" });
        }

        const event = await eventModal.findOneAndUpdate
            ({ _id: eventId }, {
                $inc: { availableSeats: -ticketcount }

            }, { new: true });


            console.log("req.body",
                req.body
            )
        await newBooking.save();

        return res.json({ status: true, message: "Booking created successfully", Booking: newBooking });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getAll = async (req, res) => {
    const { id, statusType } = req.body;
    try {

        if (statusType === "user") {
            const bookings = await BookingModal.find({ userId: id })
                .populate('eventId')
                .populate('userId');
            return res.json({ status: true, bookings });
        }
        if (statusType === "event") {
            const bookings = await BookingModal.find({ eventId: id })
                .populate('eventId')
                .populate('userId');
            return res.json({ status: true, bookings });
        }
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.deleteBooking = async (req, res) => {
    const { BookingId } = req.params;
    try {
        console.log(BookingId);
        const Event = await BookingModal.findById(BookingId);
        if (!Event) {
            return res.json({ status: false, message: "Booking not found" });
        }
        await BookingModal.findByIdAndDelete(BookingId);
        return res.json({ status: true, message: "Booking deleted successfully" });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getBookingById = async (req, res) => {
    const { BookingId } = req.params;
    try {
        const Bookings = await BookingModal.findById(BookingId)
            .populate('eventId')
            .populate('userId');
        if (!Bookings) {
            return res.json({ status: false, message: "Booking not found" });
        }
        return res.json({ status: true, Bookings });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });

    }
}











