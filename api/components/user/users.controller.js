const mongoose = require('mongoose');

// logger 
const jwt = require('jsonwebtoken')

// encrypted password
const bcrypt = require('bcrypt');

// import models
const User = require('./user.model');
const Incomes = require('../incomes/income.model');
const Outcomes = require('../outcomes/outcome.model');
const FrequentOutcomes = require('../frequent-outcomes/frequent-outcomes.model');
const { token } = require('morgan');



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
                if(req.body.password.length < 8){
                    res.status(422).json({message: 'Invalid Password'});
                    return;
                }
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
                    console.log(process.env.JWT_KEY)
                    const token = jwt.sign({
                        email: user[0].email,
                        userID: user[0]._id
                    }, 
                    process.env.JWT_KEY, // environment variables are in nodemon.json
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
            console.error(err);
            res.status(500).json(err);
        });
};

exports.delete_user = (req,res,next)=>{
    const id = req.params.userID;

    const user = User
        .deleteOne({_id: id})


    const incomes = Incomes
        .deleteMany({user: id})

    const outcomes = Outcomes
        .deleteMany({user: id})

    const frequentOutcomes = FrequentOutcomes
        .deleteMany({user:id})

    Promise.all([user, incomes, outcomes, frequentOutcomes])
        .then(result => {
            res.status(200)
                .json({message: id + ' deleted and its incomes and outcomes', result: result})
        })
        .catch(err=>{
            console.error(err);
            res.status(500).json(err)
        })
};

exports.getUser = (req, res, next) => {
    User
        .find({_id: req.userData.userID })
        .then(result => {
            res.status(200)
                .json({result: result})
        })
        .catch(err=>{
            console.error(err);
            res.status(500).json(err)
        })

}