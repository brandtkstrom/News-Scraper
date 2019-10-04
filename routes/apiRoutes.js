const db = require('../models');

module.exports = app => {
    app.get('/api/headlines', (req, res) => {
        // Get all articles from DB

        db.Headline.find()
            .populate('comments')
            .then(docs => res.json(docs))
            .catch(err => res.status(500).send(err));
    });

    app.get('/api/comments', (req, res) => {
        db.Comment.find()
            .then(docs => res.json(docs))
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
        db.Headline.findById({ _id: headlineId })
            .then(headline => {
                db.Comment.deleteMany({ _id: { $in: headline.comments } })
                    .then(() => {
                        db.Headline.deleteOne({ _id: headlineId })
                        .then(() => res.status(204).send('Headline deleted'))
                        .catch(err => res.status(500).send(err));
                    })
                    .catch(err => res.status(500).send(err));
            })
            .catch(err => {
                const error = err.message || err;
                console.log(`Error deleting Headline ${headlineId}: ${error}`);
                res.status(500).send(error);
            });
    });

    app.post('/api/headlines/:id/comments', (req, res) => {
        const headlineId = req.params.id;
        const msg = req.body.message;

        const comment = new db.Comment({
            headline: headlineId,
            content: msg
        });

        comment.save().then(doc => {
            // add comment ref to headline
            db.Headline.findById(headlineId)
                .then(headline => {
                    headline.comments.push(doc._id);
                    headline
                        .save()
                        .then(() => res.status(201).send('Comment added'));
                })
                .catch(err => {
                    const msg = err.message || err;
                    res.status(500).send(`Error saving comment: ${msg}`);
                });
        });
    });

    app.delete('/api/comments/:id', (req, res) => {
        const commentId = req.params.id;

        db.Comment.deleteOne({ _id: commentId })
            .then(() => {
                res.status(204).send('Comment deleted.');
            })
            .catch(err => {
                const error = err.message || err;
                console.log(`Error deleting Comment ${headlineId}: ${error}`);
                res.status(500).send(error);
            });
    });
};
