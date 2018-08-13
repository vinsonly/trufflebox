const User = require('../models').user
const jwt = require('jsonwebtoken');


module.exports = {
    create(req, res) {
        let name = req.body.name;
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;

        console.log("req.body", req.body);
        
        let saltRounds = 10;

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if(err || !hash) {
                    res.status(400).send(err.message);
                } else {
                    console.log("hash:", hash);
                    // save hash into the database;

                    var newUser = User({
                        name: name,
                        username: username,
                        email: email,
                        password: hash,
                        admin: false
                    });  
        
                    newUser.save(function(err) {
                        if (err) {
                            return res.status(400).send(err);
                        } else {
                            return res.status(201).send(newUser);
                        }
                    });
                }
            });
        });

    },

    read(req, res) {
        User.find({}, function(err, users){
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.send(users);
            }        
        })
    },

    update(req, res) {

        let id = req.body.id;

        let body = req.body;
        body.location = JSON.parse(req.body.location);

        User.findById(id, function(err, user){
            if (err) {
                return res.status(404).send({
                    message: `Cannot find user with id: ${id}`
                });            
            } else {
                for(key in user) {
                    if(key == "name" || 
                    key == "location" ||
                    key == "ether_address") {
                        user[key] = body[key] || user[key]
                    }
                }

                user.save(function(err) {
                    if (err) {
                        return res.status(400).send(err);
                    } else {
                        return res.send(user);
                    }
                });
            }        
        })
    },

    delete(req,res) {
        let id = req.body.id;

        User.findById(id, function(err, user) {
            if (err) {
                return res.status(404).send({
                    message: `Cannot find user with id: ${id}`
                });            
            } else {
                user.remove(function(err) {
                    if (err) {
                        return res.status(500).send(err);
                    } else {            
                        return res.send("User successfully deleted.")
                    }
                }); 
            }  
        });
    },

    findById(req, res) {
        let id = req.params.id;

        User.findById(id, function(err, user) {
            if (err) {
                console.log(err);
                return res.status(404).send({
                    message: `Cannot find user with id: ${id}`
                });            
            } else {
                return res.send(user);
            }          
        })
    }


    
    
}