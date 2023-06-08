const OTP = require("../models/index");

exports.otp = async (payload) => {
    const { phone } = payload;

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const existingOTP = await OTP.findOne({ phone });
    if (existingOTP) {
        console.log("existingOTP", existingOTP);
        // Update the existing OTP if it exists
        existingOTP.otp = otp;
        // Update OTP create time
        existingOTP.createdAt = Date.now();
        await existingOTP.save();
    } else {
        // Create a new OTP if it doesn't exist
        const newOTP = new OTP({ phone, otp });
        await newOTP.save();
    }

    console.log(`OTP for ${phone}: ${otp}`);
    return { message: 'OTP sent successfully' };
}

exports.verifyOTP = async (payload) => {
    const { phone, otp } = payload;
    console.log("phone", phone);
    // Find the OTP for the given phone number
    const savedOTP = await OTP.findOne({ phone });
    console.log("savedOTP", savedOTP);
    if (savedOTP && savedOTP.otp === otp) {
        const timeDifferenceInMinutes = Math.floor((Date.now() - savedOTP.createdAt) / 1000);
        // Check OTP expire time
        if (timeDifferenceInMinutes >= 120) {
            return { message: 'OTP expire!' };
        }
        return { message: 'OTP validated successfully' };
    } else {
        return { error: 'Invalid OTP, Please enter valid OTP.' };
    }
}