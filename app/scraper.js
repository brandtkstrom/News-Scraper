const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

class Scraper {

    constructor() {
        this.url = 'https://www.npr.org/sections/news/';
    }

    async scrapeNews() {
        const news = [];
        try {
            // Get washington post main page content
            const response = await axios.get(this.url);
            if (response.status !== 200) {
                throw new Error(`${response.status} - ${response.message}`);
            }

            // Load main section into Cheerio
            const $ = cheerio.load(response.data);

            // Get all article elements (up to specified amount)
            const articles = $('article.item.has-image');

            // Create object for each article with relevant information
            articles.each((i,article) => {
                const id = i;
                const url = $(article).find('a').attr('href');
                const image = $(article).find('img').attr('src');
                const title = $(article).find('h2.title').text().trim();
                const summary = $(article).find('p.teaser').text().trim();
                const dateString = $(article).find('time').attr('datetime');
                const date = moment(dateString).toDate();

                // Push new object onto returned array
                news.push({ id, url, image, title, summary, date });
            });

            // Parse news objects
        } catch (error) {
            console.log('ERROR getting news content:', error.message || error);
        }
        return news;
    }

}

module.exports = Scraper;