const express = require('express')
const passport = require('passport')

const Question = require('../../../models/api/v1/Question')
const User = require('../../../models/api/v1/User')

const router = express.Router()

/*********************ALL QUESTIONS*********************/
router.get('/', (_, res) => {
	Question.find()
		.sort({ date: -1 })
		.then(questions => res.json(questions))
		.catch(err =>
			res.status(404).json({ questionsnotfound: 'No questions found' })
		)
})
/*********************ALL QUESTIONS*********************/

/*********************QUESTIONS ASKED BY USER*********************/
router.get('/findquestions', (req, res) => {
	Question.find({ user: req.body.userId })
		.populate('answer', '_id text')
		// .populate('tags', '_id text')
		.sort({ date: -1 })
		.exec()
		.then(questions => res.json(questions))
		.catch(err =>
			res.status(404).json({ notAsked: 'You have not asked any questions' })
		)
})
/*********************QUESTIONS ASKED BY USER*********************/

/*********************POST A QUESTION*********************/
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {}
		const { text, userId } = req.body

		const newQuestion = new Question({
			text: text,
			user: userId
		})
		// Question.find({ text: text }).then(question => {
		// 	// res.json(question)
		// 	if (question) {
		// 		errors.questionExists = 'You have asked this question already.'
		// 		res.status(400).json(errors)
		// 	} else {
		newQuestion
			.save()
			.then(q => res.json(q))
			.catch(err => res.json(err))
		// }
		// })
	}
)
/*********************POST A QUESTION*********************/

module.exports = router
