const DB = require('../models');
const Scraper = require('../app/scraper');

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/saved', (req, res) => {
        // Get all saved headlines from DB
        DB.Headline.find()
            .then(docs => {
                res.render('saved');
            })
            .catch(error => {
                res.status(500).send(error.message || error);
            });
    });

    app.get('/scrape', (req, res) => {
        // Scrape new headlines, add to DB, then render view
        const scraper = new Scraper();
        scraper.scrapeNews(10).then(headlines => {

            res.render('home', {
                headlines: headlines
            });
        }).catch(error => {
            res.status(500).send(error.message || error);
        })
    })
};
