const db = require('../models');

module.exports = app => {
    app.get('/api/articles', (req, res) => {
        // Get all articles from DB

        db.Headline.find()
            .then(docs => {
                console.log('endpoint hit');
                res.json(docs);
            })
            .catch(err => res.status(500).send(err));
    });
};
