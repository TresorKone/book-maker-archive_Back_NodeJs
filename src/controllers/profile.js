const Profile = require('../models/profile');
const User = require('../models/user');

exports.postAddProfile = (req, res, next) => {
    const fullName = req.body.fullName;
    const description = req.body.description;

    const profile = new Profile({
       fullName: fullName,
       description: description,
       account: req.userId
    });


    profile.save()
        .then(r => {
            return User.findById(req.userId);
        })
        .then(user => {
            //to fixe later
            /*
            if (user.profile !== null) {
                res.status(403).json("this user has already an profile");
            }

            user.profile = profile;
            return user.save();

             */

            user.profile = profile;
            return user.save();

        })
        .then(r => {
            return res.status(201).json({
                data: r.profile.id,
                message: 'profile created'
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'profile not created, it might be a server side error'
            });
            //next(err);
        });
};

exports.getProfile = (req, res, next) => {
    const id = req.params.profileId;

    Profile.findById(id)
        .populate('account')
        .then(profile => {
            if (!profile) {
                return res.status(404).json({
                    message: 'could not find this profile'
                })
            }

            res.status(200).json({
                data: profile,
                message: 'profile page'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('server side error');
            next(err)
        })
};

exports.editProfile = (req, res, next) => {
    const id = req.params.profileId;
    const updatedFullName = req.body.fullName;
    const updatedDescription = req.body.description;

    Profile.findById(id)
        .then(profile => {

            //user check
            if (profile.account.toString() !== req.userId) {
                return res.status(403).json('not authorized');
            }

            profile.fullName = updatedFullName;
            profile.description = updatedDescription;

            return profile.save()
                .then(r => {
                    res.status(200).json({
                        data: r,
                        message: "profile edited"
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status('400').json({
                        message: 'profile not edited',
                    });
                    next(err);
                })

        })
        .catch(err => {
            console.log(err);
            res.status('500').json('server side error');
            next(err);
    })
};

exports.deleteProfile = (req, res, next) => {
    const id = req.params.profileId;

    Profile.findById(id)
        .then(profile => {

            //user check
            if (profile.account.toString() !== req.userId) {
                return res.status(403).json('not authorized');
            }

            return Profile.deleteOne({
                _id: id
            });
        })
        .then(() => {
            res.status(202).json({
                message: 'resources deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('profile not deleted it#s might be a server side error');
            next(err);
        })
};