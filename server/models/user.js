const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
  email: String,
  password: String
})
//parameters(model name, schema, collection in mongo db)
module.exports = mongoose.model('user', userSchema, 'users')
