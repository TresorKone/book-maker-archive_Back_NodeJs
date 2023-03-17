const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.postSignup = (req, res, next) => {
    const email = req.body.email;

    User.findOne({ email: email })
        .then( async userCheck => {
            if (userCheck) {
                return res.status(303).json({
                    message: 'user:' + email + '. already exist'
                })
            } else {
                try {
                    const {email, password} = req.body;
                    const hash = await bcrypt.hash(password, 10);

                    const user = await User({
                        email: email,
                        password: hash,
                        books: []
                    });
                    user.save()
                        .then(r => {
                            res.status(201).json({
                                message: 'user created'
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).send('error when saving user');
                        })
                } catch (e) {
                    console.log(e);
                    res.status(500).send('something my be broke')
                }
            }

        })
};

exports.postLogin = (req, res, next) => {
    let fetchedUser;
    try {
        const {email, password} = req.body;

        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: 'user don\'t exist'
                    });
                }

                fetchedUser = user
                return bcrypt.compare(password, user.password)

            })
            .then(match => {
                if (!match) {
                    return res.status(401).json({
                        message: 'invalid password'
                    })
                }

                const token = jwt.sign({
                        email: fetchedUser.email,
                        userId: fetchedUser._id.toString()
                    }, 'secretultimatespecialkey',
                    { expiresIn: '1h' });
                res.status(200).json({
                    token: token,
                    userId: fetchedUser._id.toString()
                });
            })
            .catch(err => {
                console.log(err);
                next(err);
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    } catch (e) {
        console.log(e);
        res.status(500).send('something my be broke')
    }
};