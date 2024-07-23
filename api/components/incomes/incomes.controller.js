// import models
const Income = require('./income.model');
const mongoose = require('mongoose');


exports.get_incomes = (req, res, next) => {

    console.log('Geting incomes')

    // filtering by month
    const month = req.query.month; // Assuming the parameter is named 'month'
    const year = req.query.year; // Assuming the parameter is named 'month'

    // Construct a filter object based on the month parameter
    const filter = { user: req.userData.userID };
    if (month && year) {
        // Add a condition to filter by month if the 'month' and 'year' parameter is provided
        const startOfMonth = new Date(Date.UTC(year, month - 1, 1));
        const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
        filter.date = { $gte: startOfMonth, $lte: endOfMonth };
    }
    else if (month) {
        // Add condition to filter by month if only 'month' parameter is provided
        const startOfMonth = new Date(Date.UTC(new Date().getFullYear(), month - 1, 1));
        const endOfMonth = new Date(Date.UTC(new Date().getFullYear(), month, 0, 23, 59, 59, 999));
        filter.date = { $gte: startOfMonth, $lte: endOfMonth };
    }

    // display every income from that user

    Income
        .find(filter)
        .exec()
        .then(docs =>{
            res.status(200).json({docs: docs, userData: req.userData});
        })
        .catch(err =>  {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.post_income =   (req,res,next)=>{
    // Creating an Income instance
    const income = new Income({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        date: req.body.date,
        category: req.body.category,
        price: req.body.price,
        user: req.userData.userID
    });

    // saving the instance in mongoose 
    income.save().then(result => {
        res.status(201).json({
            message: 'Income saved successfully',
            registeredIncome: income,
        });
        
    }).catch(err => {
        
        res.status(500).json(err);
    });
};

exports.get_income_by_id =    (req,res,next)=>{
    const id = req.params.incomeID;
    
    // search in the mongoose model by id

    Income.findById(id)
    .exec()
    .then(doc => {
        
        if (doc){
            res.status(200).json(doc);
        } else{
            res.status(404).json({message: id + " not found"})
        }
        
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
};

exports.update_income =   (req,res,next)=>{
    const id = req.params.incomeID;

    // loop over the properties parsed in the body
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    
    // updating
    Income
        .updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result =>{
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
};

exports.delete_income =   (req,res,next)=>{
    const id = req.params.incomeID;
    Income
        .deleteOne({_id: id})
        .exec()
        .then(result =>{
            res.status(200).json({message: id + " deleted", result: result});
        })
        .catch(err => {
            res.status(500).json({error: err});
            console.log(err);
        });
};