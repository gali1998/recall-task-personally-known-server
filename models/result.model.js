const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
    id: String,
    results: Object,
    startTime: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Result', ResultSchema);