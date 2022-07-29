const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventTitle: String,
    eventDescription: String,
    eventDate: Date,
    eventStartTime: String,
    eventEndTime: String,
    eventLocation: String,
    eventCreator: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
    },
    eventParticipants: [{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
    }]


});

const Event = mongoose.model("event", eventSchema);

module.exports = { Event };