
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HeadlineSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String },
    url: { type: String },
    image: { type: String },
    date: { type: Date },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const Headline = mongoose.model('Headline', HeadlineSchema);

module.exports = Headline;