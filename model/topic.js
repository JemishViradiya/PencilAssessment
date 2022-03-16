var mongoose = require('mongoose')
var topicSchema = new mongoose.Schema({
    topic1: { type: String },
    topic2: { type: String },
    topic3: { type: String }
})
mongoose.model("Topic", topicSchema)
