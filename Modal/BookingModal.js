const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const bookingSchema = new Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      
    },
    amount: {
        type: Number
    },
    ticketcount: {
        type: Number,
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending"
    }

})

bookingSchema.pre("save", function (next) {
    const IST_OFFSET = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
    const currentIST = new Date(new Date().getTime() + IST_OFFSET);
    this.createdAt = currentIST;
    this.created_at = currentIST;
    this.updatedAt = currentIST;
    next();
});

module.exports = model("booking", bookingSchema);
