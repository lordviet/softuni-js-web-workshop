const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: Number,
        required: true
    },
    accessories: [{ type: mongoose.Types.ObjectId, ref: "Accessory" }],
    creatorId: {
        type: String,
        required: true
    }

});


const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;