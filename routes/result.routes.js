module.exports = (app) => {
    const results = require('../controllers/result.controller.js');

    // Create a new Note
    app.post('/results', results.create);

    // Retrieve all Notes
    app.get('/results', results.findAll);

    // Retrieve a single Note with noteId
    app.get('/results/:resultId', results.findOne);

    // Update a Note with noteId
    app.put('/results/:resultId', results.update);

    // Delete a Note with noteId
    app.delete('/results/:resultId', results.delete);
}