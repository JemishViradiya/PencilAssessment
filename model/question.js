var mongoose = require('mongoose')
var questionsSchema = new mongoose.Schema({}, { strict: false })
mongoose.model("Question", questionsSchema)