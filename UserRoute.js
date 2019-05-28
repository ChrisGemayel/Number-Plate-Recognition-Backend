const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('./validation/register');
const validateLoginInput = require('./validation/login');
const User = require('./models/User');

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid) {
        console.log(req.body);
        console.log(errors);
        return res.status(400).json(errors);
    }

    User.findOne({
        Email: req.body.Email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                Email: 'Email already exists'
            });
        }
        else {
            const newUser = new User({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Password: req.body.Password,
                Email: req.body.Email
            });
            console.log(newUser);


            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.Password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.Password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                        console.log(errors);
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    console.log(req.body);

    if(!isValid) {
        console.log(errors);
        return res.status(400).json(errors);
    }

    const Email = req.body.Email;
    const Password = req.body.Password;

    User.findOne({Email})
        .then(user => {
            if(!user) {
                errors.Email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(Password, user.Password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            FirstName: user.FirstName,
                            LastName: user.LastName
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }
                    else {
                        errors.Password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;