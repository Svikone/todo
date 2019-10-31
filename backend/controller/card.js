const Modules = require("../model/card");
var objectid = require('objectid');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
    const card = {
        body: req.body.body,
        author: req.user.user,
        state: false
    }
    Modules(card).save().then(result => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(500)
    })
}

exports.getAll = async (req, res) => {
    let page = req.body.page
    if(page == 1) page = 0
    else page = page * 10 - 10
    const count = await Modules.find({author: req.user.user}).count()
    Modules.find({author: req.user.user}).skip(page).limit(10).then(result => {
        res.send({result, count}).status(200);
    }).catch(err => {
        res.sendStatus(500);
    })
}

exports.remove = (req, res) => {
    Modules.find({_id: req.body.id}).remove().then(result => {
        console.log(result)
        res.send(result).sendStatus(200);
    }).catch(err => {
        res.sendStatus(500);
    })
}

exports.getOne = (req, res) => {
    Modules.find({_id: req.body.id}).then(result => {
        res.send(result).sendStatus(200);
    }).catch(err => {
        res.sendStatus(500);
    })
}

exports.edit = (req, res) => {
    Modules.find({_id: req.body.id}).update({body: req.body.body}) 
        .then(result => {
        res.send(result).sendStatus(200);
    }).catch(err => {
        res.sendStatus(500);
    })
}

exports.setState = (req, res) => {
    Modules.find({_id: req.body.id}).update({state: req.body.state}) 
    .then(result => {
        res.send(result).sendStatus(200);
    }).catch(err => {
        res.sendStatus(500);
})
}

