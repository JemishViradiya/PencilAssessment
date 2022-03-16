const express = require('express')
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const xlsx = require('xlsx')
const file = xlsx.readFile('./QuestionsandTopics.xlsx')
const app = express()
const port = 3000

require('./model/question')
require('./model/topic')

//MongoDB Connection
mongoose.connect("mongodb+srv://root:root@cluster0.mncan.mongodb.net/PencilAssessment?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const dbconnection = mongoose.connection;
dbconnection.on('error', console.error.bind(console, 'connection error'))
dbconnection.once('open', function () {
    console.log("We are connected on mongoose!");
})


var storeDataController = require('./controller/storedatacontroller')

app.get('/', storeDataController.SaveData)
app.get('/search/:q', storeDataController.GetQuestionList)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
