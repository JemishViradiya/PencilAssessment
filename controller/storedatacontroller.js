
var mongoose = require('mongoose')
const xlsx = require('xlsx')
const file = xlsx.readFile('./QuestionsandTopics.xlsx')
var question = mongoose.model('Question')
var topic = mongoose.model("Topic")

module.exports = {
    SaveData: function () {
        let data = {}
        const sheetData = xlsx.utils.sheet_to_json(file.Sheets['Topics'])
        const questionSheet = xlsx.utils.sheet_to_json(file.Sheets['Questions'])
        sheetData.forEach(a => {
            if (a['Topic Level 1']) {
                data.topic1 = a['Topic Level 1']
            }
            if (a['Topic Level 2']) {
                data.topic2 = a['Topic Level 2']
            }
            if (a['Topic Level 3']) {
                data.topic3 = a['Topic Level 3']
            }
            var newTopic = new topic(data)
            newTopic.save()
            data = {}
        })
        questionSheet.forEach(q => {
            data.questionNumber = q['Question number']
            if (q['Annotation 1']) {
                data.annotation1 = q['Annotation 1']
            }
            if (q['Annotation 2']) {
                data.annotation2 = q['Annotation 2']
            }
            if (q['Annotation 3']) {
                data.annotation3 = q['Annotation 3']
            }
            if (q['Annotation 4']) {
                data.annotation4 = q['Annotation 4']
            }
            if (q['Annotation 5']) {
                data.annotation5 = q['Annotation 5']
            }
            var newQuestion = new question(data)
            newQuestion.save()
            data = {}
        })
    },
    GetQuestionList: function (req, res) {
        const queryParam = req.params.q.toString()
        let data = []
        let questionNumberList = []
        topic.find({}, function (err, result) {
            if (err) throw err
            if (result) {
                result.forEach(function (topic) {
                    if (topic.topic1.toLowerCase().includes(queryParam.toLowerCase())) {
                        if (data.indexOf(topic.topic1) === -1) {
                            data.push(topic.topic1)
                            if (data.indexOf(topic.topic2) === -1) {
                                data.push(topic.topic2)
                                if (data.indexOf(topic.topic3) === -1) {
                                    if (topic.topic3) {
                                        data.push(topic.topic3)
                                    }

                                }
                            }
                            else {
                                if (data.indexOf(topic.topic3) === -1) {
                                    if (topic.topic3) {
                                        data.push(topic.topic3)
                                    }
                                }
                            }
                        }
                        else {
                            if (data.indexOf(topic.topic2) === -1) {
                                data.push(topic.topic2)
                                if (data.indexOf(topic.topic3) === -1) {
                                    if (topic.topic3) {
                                        data.push(topic.topic3)
                                    }
                                }

                            }
                            else {
                                if (data.indexOf(topic.topic3) === -1) {
                                    if (topic.topic3) {
                                        data.push(topic.topic3)
                                    }
                                }
                            }

                        }

                    }
                    if (topic.topic2.toLowerCase().includes(queryParam.toLowerCase())) {
                        if (data.indexOf(topic.topic2) === -1) {
                            data.push(topic.topic2)
                            if (data.indexOf(topic.topic3) === -1) {
                                if (topic.topic3) {
                                    data.push(topic.topic3)
                                }
                            }
                        }
                        else {
                            if (data.indexOf(topic.topic3) === -1) {
                                if (topic.topic3) {
                                    data.push(topic.topic3)
                                }
                            }
                        }
                    }
                    if (topic.topic3) {
                        if (topic.topic3.toLowerCase().includes(queryParam.toLowerCase())) {
                            if (data.indexOf(topic.topic3) === -1) {
                                if (topic.topic3) {
                                    data.push(topic.topic3)
                                }
                            }
                        }
                    }
                })
                question.find({}, function (err, questionResult) {
                    if (err) throw error
                    if (questionResult) {
                        const newResult = questionResult.filter(q =>
                            data.find(topic => topic === q.annotation1 ||
                                topic === q.annotation2 ||
                                topic === q.annotation3 ||
                                topic === q.annotation4 ||
                                topic === q.annotation5
                            )
                        )
                        newResult.forEach(x => questionNumberList.push(x.questionNumber))
                        if (!questionNumberList.length) {
                            res.send({ message: 'No data found' })
                        } else {
                            res.send(questionNumberList)
                        }
                    }

                })

            }

        })
    }
}