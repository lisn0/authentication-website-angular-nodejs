const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    eventID: {
        type: mongoose.Schema.ObjectId,
        ref: 'event',
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
    }

});

const Participant = mongoose.model("participant", participantSchema);

module.exports = { Participant };