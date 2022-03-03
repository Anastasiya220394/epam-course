const { Schema, model } = require('mongoose');

const schema = new Schema({
    todo: {type: String, required: true}
})

module.exports = model('todo', schema)
