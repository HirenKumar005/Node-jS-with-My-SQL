const db = require('../startup/db');
const bcrypt = require('bcrypt')
const { validateUser, validateUserloging, validateResetPassword, validateReset } = require('../validation/userValidate');
const { OTPsend } = require('../startup/mail');

exports.register = (req, res) => {
    res.send('User register Page')
}
var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);


exports.signup = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        if (error.details[0].context.key == 'first_name') {
            var err1 = error.details[0].message;
            return res.status(400).send(err1)
        }

        if (error.details[0].context.key == 'last_name') {
            var err2 = error.details[0].message;
            return res.status(400).send(err2)

        }
        if (error.details[0].context.key == 'email') {
            var err3 = error.details[0].message;
            return res.status(400).send(err3)
        }
        if (error.details[0].context.key == 'phone') {
            var err4 = error.details[0].message;
            return res.status(400).send(err4)
        }
        if (error.details[0].context.key == 'password') {
            var err5 = error.details[0].message;
            return res.status(400).send(err5)
        }
        if (error.details[0].context.key == 'repassword') {
            var err6 = error.details[0].message;
            return res.status(400).send(err6)
        }
        if (error.details[0].context.key == 'gender') {
            var err7 = error.details[0].message;
            return res.status(400).send(err7)
        }
        if (error.details[0].context.key == 'country') {
            var err8 = error.details[0].message;
            return res.status(400).send(err8)
        }
        if (error.details[0].context.key == 'hobbies') {
            var err9 = error.details[0].message;
            return res.status(400).send(err9)
        }

    }
    const { first_name, last_name, email, phone, password, gender, country, hobbies } = req.body;
    const profile = req.file.filename;
    db.query('SELECT email FROM users WHERE email=?', [email], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            return res.status(400).send('Email is already register ')
        }
    })
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    db.query('INSERT INTO users SET ?', {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: hashPassword,
        profile: profile,
        gender: gender,
        country: country,
        hobbies: hobbies

    }, (err) => {
        if (err) {
            console.log(err);
        }
    })
    res.status(200).send('User Registered')
}
exports.login = async (req, res) => {

    const { error } = validateUserloging(req.body);
    if (error) {
        if (error.details[0].context.key == 'email') {
            var err3 = error.details[0].message;
            return res.status(400).send(err3)
        }
        if (error.details[0].context.key == 'password') {
            var err5 = error.details[0].message;
            return res.status(400).send(err5)
        }
    }
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email=?', [email], async (err, result) => {
        if (result.length > 0) {
            const validPassword = await bcrypt.compare(password, result[0].password);
            if (validPassword) {
                res.send('login Successful')
            }
            else {
                res.status(400).send('Username or Password was incorrect')
            }
        }
        else {
            res.status(400).send('User not found')
        }

    })


}
exports.forgot = async (req, res) => {
    const { error } = validateUserloging(req.body);
    if (error) {
        if (error.details[0].context.key == 'email') {
            var err3 = error.details[0].message;
            return res.status(400).send(err3)
        }
    }
    const { email } = req.body;
    db.query('SELECT * FROM users WHERE email=?', [email], async (err, result) => {
        if (result.length > 0) {

            OTPsend(email, otp);
            res.send('Otp send successfuly');
        }
        else {
            res.status(400).send('User not found')
        }
    })

}
exports.verifyotp = async (req, res) => {
    const { userotp } = req.body;
    if (otp == userotp) {
        res.send('otp matched')
    }
    else {
        res.status(400).send('Enter the incorrect otp ')
    }
}
exports.resetpassword = async (req, res) => {
    const { error } = validateResetPassword(req.body);
    if (error) {
        if (error.details[0].context.key == 'email') {
            var err1 = error.details[0].message;
            return res.status(400).send(err1)
        }
        if (error.details[0].context.key == 'password') {
            var err5 = error.details[0].message;
            return res.status(400).send(err5)
        }
        if (error.details[0].context.key == 'repassword') {
            var err6 = error.details[0].message;
            return res.status(400).send(err6)
        }

    }
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email=?', [email], async (err, result) => {
        if (result.length > 0) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            db.query(`UPDATE users SET password='${hashPassword}' WHERE email=?`, [email], async (err, updateResult) => {

                if (updateResult) {
                    res.send('Password Will Be Update')
                }
                else {
                    res.status(400).send('Something Was Wrong')
                }
            })
        }
        else {
            res.status(400).send('User not found')
        }
    })

}
exports.viewprofile = async (req, res) => {
    const email = req.user.email;

    db.query('SELECT * FROM users WHERE email=?', [email], async (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.status(400).send('data not found')
        }
    });


}
exports.updateprofile = async (req, res) => {
    try {
        const { error } = validateUser(req.body);

        if (error) {
            if (error.details[0].context.key == 'first_name') {
                var err1 = error.details[0].message;
                return res.status(400).send(err1)
            }

            if (error.details[0].context.key == 'last_name') {
                var err2 = error.details[0].message;
                return res.status(400).send(err2)

            }
            if (error.details[0].context.key == 'email') {
                var err3 = error.details[0].message;
                return res.status(400).send(err3)
            }
            if (error.details[0].context.key == 'phone') {
                var err4 = error.details[0].message;
                return res.status(400).send(err4)
            }
            if (error.details[0].context.key == 'password') {
                var err5 = error.details[0].message;
                return res.status(400).send(err5)
            }
            if (error.details[0].context.key == 'repassword') {
                var err6 = error.details[0].message;
                return res.status(400).send(err6)
            }
            if (error.details[0].context.key == 'gender') {
                var err7 = error.details[0].message;
                return res.status(400).send(err7)
            }
            if (error.details[0].context.key == 'country') {
                var err8 = error.details[0].message;
                return res.status(400).send(err8)
            }
            if (error.details[0].context.key == 'hobbies') {
                var err9 = error.details[0].message;
                return res.status(400).send(err9)
            }

        }
        const { first_name, last_name, email, phone, password, gender, country, hobbies } = req.body;
        const profile = req.file.filename;
        const userEmail = req.user.email;
        db.query('SELECT * FROM users WHERE email=?', [userEmail], async (err, result) => {
            if (result) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                db.query(`UPDATE users SET first_name='${first_name}',last_name='${last_name}',email='${email}',phone='${phone}', password='${hashPassword}',profile='${profile}',gender='${gender}',country='${country}',hobbies='${hobbies}' WHERE email=?`, [email], async (err, updateResult) => {
                    if (updateResult) {
                        res.send('Profile Will Be Update')
                    }
                    else {
                        res.status(400).send('Something Was Wrong')
                    }
                })
            }
            else {
                res.status(400).send('data not found')
            }
        })



    } catch (error) {
        console.error(error);
    }

}
exports.updatePassword = async (req, res) => {
    const { error } = validateReset(req.body);
    if (error) {
        if (error.details[0].context.key == 'oldPassword') {
            var err1 = error.details[0].message;
            return res.status(400).send(err1)
        }
        if (error.details[0].context.key == 'newPassword') {
            var err5 = error.details[0].message;
            return res.status(400).send(err5)
        }
        if (error.details[0].context.key == 'repassword') {
            var err6 = error.details[0].message;
            return res.status(400).send(err6)
        }
    }
    const email = req.user.email;
    const { newPassword } = req.body;
    db.query('SELECT * FROM users WHERE email=?', [email], async (err, result) => {
        if (result) {
            const comparision = await bcrypt.compare(req.body.oldPassword, result[0].password);
            if (comparision) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(newPassword, salt);
                db.query(`UPDATE users SET password='${hashPassword}' WHERE email=?`, [email], async (err, updateResult) => {

                    if (updateResult) {
                        res.send('Password Will Be Update')
                    }
                    else {
                        res.status(400).send('Something Was Wrong')
                    }
                })
            }
            else {
                res.status(400).send('Current Password is incorrect')
            }
        }
    });
}






