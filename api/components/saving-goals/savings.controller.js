const Saving = require('./savings.model');
const mongoose = require('mongoose');

exports.get_savings = (req, res, next) => {
    const filter = { user: req.userData.userID };
    Saving
        .find(filter)
        .exec()
        .then(docs => {
            res.status(200).json({docs: docs, user: req.userData})
        })
        .catch(err=>{
            console.error(err)
            res.status(500).json({error: err});
        })
}

exports.post_saving = (req, res, next) => {
    const savingGoal = new Saving({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        value: req.body.value,
        user: req.userData.userID
    })

    savingGoal
        .save()
        .then(() => {
            res.status(201).json({
                message: 'Saving goal saved successfully',
                registeredSaving: savingGoal,
            });
        })
        .catch(err=>{
            res.status(500).json(err);
        })
}

exports.update_saving = (req, res, next) => {
    const id = req.params.savingID;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Saving
        .updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result =>{
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
}

exports.delete_saving = (req, res, next) => {
    const id = req.params.savingID;
    Saving
        .deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({message: id + " deleted", result: result});
        })
        .catch(err=>{
            res.status(500).json({error: err});
            console.error(err)
        })

}