const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const OTP = mongoose.model('otps', otpSchema);

module.exports = OTP;
