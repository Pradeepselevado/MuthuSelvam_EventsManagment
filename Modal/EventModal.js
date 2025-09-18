const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const eventSchema = new Schema({
    eventName: {
        type: String,
    },
    eventDate: {
        type: Date,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    availableSeats:{
        type:Number
    },
    endDate:{
        type: Date,
    }

})

eventSchema.pre("save", function (next) {
    const IST_OFFSET = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
    const currentIST = new Date(new Date().getTime() + IST_OFFSET);
    this.createdAt = currentIST;
    this.created_at = currentIST;
    this.updatedAt = currentIST;
    next();
});

module.exports = model("event", eventSchema);
