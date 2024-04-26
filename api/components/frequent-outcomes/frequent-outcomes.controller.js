const mongoose = require('mongoose');

// Importing the model
const FrequentOutcomeModel = require('./frequent-outcomes.model');

exports.get_outcomes = (req, res, next) => {
    const filter = { user: req.userData.userID };

    FrequentOutcomeModel.find(filter)
        .exec()
        .then(docs =>{
            res.status(200).json({docs: docs, userData: req.userData});
        })
        .catch(err =>{
            console.log(err);
            res.status(400).json({error: err});
        });
};

exports.post_outcome =   (req,res,next)=>{
    const outcome = new FrequentOutcomeModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        frequency: req.body.frequency,
        category: req.body.category,
        price: req.body.price,
        user: req.userData.userID
    });

    // trying to save the instance in mongoose
    outcome.save().then(result =>{
        res.status(201).json({
            message: 'Outcome saved successfully',
            registeredOutcome: outcome
        })
    }).catch(err => {
        res.status(500).json(err);
    });


};

exports.get_outcome_by_id =   (req,res,next)=>{
    const id = req.params.outcomeID;

    FrequentOutcomeModel.
    findById(id)
        .exec()
        .then(doc =>{
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: id + " not found"});
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.update_outcome =   (req,res,next)=>{
    const id = req.params.outcomeID;

    // loop over the properties parsed in the body
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    // updating
    FrequentOutcomeModel
        .updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {

            res.status(500).json(err);
        });
};

exports.delete_outcome =   (req,res,next)=>{
    const id = req.params.outcomeID;

    FrequentOutcomeModel
        .deleteOne({_id: id})
        .exec()
        .then(result =>{
            res.status(200).json({message: id + " deleted", result: result});
        })
        .catch(err =>{
            res.status(500).json(err.message)
        });
};