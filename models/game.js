const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const gameSchema = new Schema ({
    user: { type: Schema.Types.ObjectId, required: true },
    name: {type: String, required: true},
    releaseDate: {type: String, required: true},
    background: {
        url: { type: String },
        file: { type: String },
      },
    description: {type: String},
})

module.exports = mongoose.model('Games', gameSchema)