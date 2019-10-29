const Modules = require("../model/user");
const jwt = require('jsonwebtoken');


exports.createUser = (req, res) => {
    const user = {
        firstname: req.body.user.firstName,
        lastname: req.body.user.lastName,
        email: req.body.user.email,
        password: req.body.user.password,
    }
    Modules.findOne({firstname: user.firstname}).then(result => {
        if (result)
			return res.sendStatus(409);
        Modules(user).save().then(result => {
            res.sendStatus(200);
        }).catch(err => {
            res.sendStatus(500)
        })
    })
}

exports.signin = (req, res) => {
    const user = {
        firstname: req.body.user.firstName,
        password: req.body.user.password
    }
    Modules.findOne({firstname: user.firstname, password: user.password}).then(result => {
        if (result)
            jwt.sign({user: user.firstname}, 'secretkey', (err, token) => {
                res.json({token});

            }).catch(err => {
            })
    })
}

exports.verify = (req, res) => {
    res.send({verify: true})
}