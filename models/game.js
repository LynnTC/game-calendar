const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const gameSchema = new Schema ({
    user: { type: Schema.Types.ObjectId, required: true },
    name: {type: String, required: true},
    releaseDate: {type: Date, required: true},
    background: {type: String, required: true},
    description: {type: String},
})