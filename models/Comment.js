
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    headline: { type: Schema.Types.ObjectId, ref: 'Headline' },
    content: { type: String },
    date: { type: Date }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;