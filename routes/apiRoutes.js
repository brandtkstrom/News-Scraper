const db = require('../models');

module.exports = app => {
    app.get('/api/headlines', (req, res) => {
        // Get all articles from DB

        db.Headline.find()
            .then(docs => {
                console.log('endpoint hit');
                res.json(docs);
            })
            .catch(err => res.status(500).send(err));
    });

    app.post('/api/headlines', (req, res) => {
        if (!req.body) {
            res.status(400).send('Missing headline data.');
            return;
        }

        const headline = new db.Headline(req.body);
        headline
            .save()
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                res.status(500).send(err.message || err);
            });
    });

    app.delete('/api/headlines/:id', (req, res) => {
        const headlineId = req.params.id;
        db.Headline.deleteOne({ _id: headlineId })
            .then(() => {
                res.status(204).send('Delete successful');
            })
            .catch(err => {
                const error = err.message || err;
                console.log(`Error deleting Headline ${headlineId}: ${error}`);
                res.status(500).send(error);
            });
    });
};
