const Result = require('../models/result.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
     // Validate request
     if(!req.body.data.results) {
        return res.status(400).send({
            message: "empty results"
        });
    }

    //console.log(req.body.data.start)
    
    // Create a Note
    const result = new Result({
        id: req.body.data.id || "id missing", 
        results: req.body.data.results,
        startTime: req.body.data.startTime     
    });

    console.log(result);

    // Save Note in the database
    result.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Result."
        });
    });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Result.find()
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving results."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Result.findById(req.params.resultId)
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "Result not found with id " + req.params.resultId
            });            
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Result not found with id " + req.params.resultId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving result with id " + req.params.resultId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
     // Validate Request
     if(!req.body.results) {
        return res.status(400).send({
            message: "Result content can not be empty"
        });
    }

    // Find note and update it with the request body
    Result.findByIdAndUpdate(req.params.noteId, {
        id: req.body.id || "No id",
        results: req.body.results,
        startTime: req.body.startTime
    }, {new: true})
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "Result not found with id " + req.params.resultId
            });
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Result not found with id " + req.params.resultId
            });                
        }
        return res.status(500).send({
            message: "Error updating result with id " + req.params.resultId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Result.findByIdAndRemove(req.params.resultId)
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "Result not found with id " + req.params.resultId
            });
        }
        res.send({message: "Result deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Result not found with id " + req.params.resultId
            });                
        }
        return res.status(500).send({
            message: "Could not delete result with id " + req.params.resultId
        });
    });
};