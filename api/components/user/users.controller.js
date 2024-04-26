const mongoose = require('mongoose');

// logger 
const jwt = require('jsonwebtoken')

// encrypted password
const bcrypt = require('bcrypt');

// import models
const User = require('./user.model');
const { token } = require('morgan');

console.log('Hey')

exports.signup = (req, res, next) =>{
    // find an user with that email
    User
        .find({email: req.body.email})
        .exec()
        .then(user => {
            // if it already exists don't create 
            if(user.length >= 1){
                return res.status(422).json({message: "Email already in use"});
            } else{
                // encrypts the password
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    if (err){
                        res.status(500).json(err);
                        return;
                    } else{

                        // sign up the new user

                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            name: req.body.name,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                res.status(201).json({message: "successful" ,result: result, ok: true})
                            })
                            .catch(err => res.status(500).json({error: err}));
                    }
                })
                
            }
        });
};

exports.login = (req, res, next) => {
    console.log(req.body)
    User
        .find({email: req.body.email})
        .exec()
        .then(user=>{
            // res.status(401).json(user[0])
            // check if it finds some user in the array
            if (user.length < 1){
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err){
                    return res.status(401).json({
                        message: "Auth failed"
                    });   
                };
                if (result){
                    const token = jwt.sign({
                        email: user[0],
                        userID: user[0]._id
                    }, 
                    "process.env.JWT_KEY", // environment variables are in nodemon.json
                    {
                        expiresIn: "1h"
                    }); 
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                };
                
                return res.status(401).json({
                message: "Auth failed"
                
            });
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

exports.delete_user = (req,res,next)=>{
    const id = req.params.userID;
    User
        .deleteOne({_id: id})
        .exec()
        .then(result =>{
            res.status(200).json({message: id + " deleted", result: result});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};