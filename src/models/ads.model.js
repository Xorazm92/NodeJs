const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: false
    },
    technologies: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true,
        enum: ['sherik', 'ish', 'xodim', 'ustoz', 'shogird']
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ads = mongoose.model('Ads', adsSchema);

module.exports = {
    Ads
};
