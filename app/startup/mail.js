const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,//true
    port: 25,//465
    auth: {
        user: 'hirenundhad.shivinfotech@gmail.com',
        pass: 'hir8980@'
    }
});

const OTPsend = (email, otp) => {
    let mailDetail = {
        to: email,
        subject: "OTP for new Password",
        html: "<h3>OTP for new password is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    }
    return transport.sendMail(mailDetail, function (error, res) {
        if (error) throw error;
        console.log('email has been sent');
    })

};
module.exports = {
    OTPsend
};