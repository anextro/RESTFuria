var mongoose = require('mongoose'), Schema = mongoose.Schema;

var Article = new Schema({
    
    title: {type: String},
    content: {type: String},
    owner: {type: Schema.Types.ObjectId, required: true},
    created: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    }
});

Article.set("autoIndex", true);

module.exports = mongoose.model('Article', Article);