const express = require('express')
const passport = require('passport')

const Answer = require('../../../models/api/v1/Answer')
const Question = require('../../../models/api/v1/Question')
const User = require('../../../models/api/v1/User')

const router = express.Router()

router.get('/:questionId', (req, res) => {
	const { questionId } = req.params

	Answer.find({ question: questionId }).then(answer => res.json(answer))
})

router.post('/', (req, res) => {
	const { text, userId, questionId } = req.body
	const errors = {}
	const newAnswer = new Answer({
		question: questionId,
		text: text,
		user: userId
	})
	// Answer.find({ user: userId }).then(answer => {
	// 	// res.json(question)
	// 	if (answer) {
	// 		errors.answerExists = 'You have aanswerd this question already.'
	// 		res.status(400).json(errors)
	// 	} else {
	newAnswer
		.save()
		.then(a => res.json(a))
		.catch(err => res.json(err))
	// 	}
	// })
})

module.exports = router
