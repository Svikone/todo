const Modules = require("../model/user");
const jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {
    const user = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        // url_img: req.files[0].filename
    } 
    console.log(req.files)
    if(req.files.length > 0 ) user.url_img = req.files[0].filename
    else user.url_img = "404.png"
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
                res.sendStatus(500);
        })
    })
}

exports.verify = (req, res) => {
    res.send({verify: true})
}

exports.getUser = (req, res) => {
    Modules.findOne({firstname: req.user.user}).then(result => {
        const user = {
            firstname: result.firstname,
            img: result.url_img,
            email: result.email
        }
        res.send({user}).status(200);
    }).catch(err => {
        res.sendStatus(500);
    })
}

exports.editProfil = (req, res) => {
        const img = req.files
        const email = req.body.email
        console.log(img.length)
    if(img.length == 0) {
        Modules.findOne({firstname: req.user.user}).updateOne({email: email}).then(result => {
            res.send().status(200);
        }).catch(err => {
            res.sendStatus(500);
        })
    }
    else {
        Modules.findOne({firstname: req.user.user}).updateOne({email: email, url_img: img[0].filename}).then(result => {
            res.send().status(200);
        }).catch(err => {
            res.sendStatus(500);
        })
    }
    
}

exports.editPassword = (req, res) => {
    const pass = {
        oldPassword: req.body.password.oldPassword,
        newPassword: req.body.password.newPassword,
    }
    Modules.find({firstname: req.user.user, password: pass.oldPassword}).then(result => {
        if(result.length > 0) {
            Modules.find({firstname: req.user.user, password: pass.oldPassword}).update({password: pass.newPassword})
            .then(result2 => {
                res.send().sendStatus(200); 
            }).catch(err => {
                res.sendStatus(500);
            })
        }else {
            res.status(500).send({message:"user is not exist"});
        }
        
    }).catch(error => {
        res.sendStatus(500);

    })
}

