var mongoose = require('mongoose'), Schema = mongoose.Schema;

User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
        },
        created: {
            type: Date,
            default: Date.now
        },
        update: {
            type: Date,
            default: Date.now
        }
});

User.set('autoIndex', true);

module.exports = mongoose.model('User', User);
