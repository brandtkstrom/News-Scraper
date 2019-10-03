const Schema = require('mongoose').Schema;

const HeadlineSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String },
    url: { type: String },
    image: { type: String }
});

module.exports = connection => connection.model('Headline', HeadlineSchema);