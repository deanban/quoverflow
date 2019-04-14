const express = require('express')
const passport = require('passport')

const router = express.Router()

const validateBody = require('../../../validations/validateBody')
const Question = require('../../../models/api/v2/question')

router.post(
	'/new',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { errors, isValid } = validateBody(req.body)
		const { body, accountId, categoryId } = req.body

		if (!isValid) return res.status(400).json(errors)

		Question.getSimilarQuestions({ body })
			.then(({ questions }) => {
				if (questions && questions.length > 0) {
					res.json({
						message:
							'Here are some similar questions you might want to check out before posting.',
						similarQuestions: questions
					})
				} else {
					Question.storeQuestion({ body, accountId, categoryId })
						.then(() => res.json({ success: `Question- "${body}" Created.` }))
						.catch(err => next(err))
				}
			})
			.catch(err => next(err))
	}
)

router.get('/all', (req, res, next) => {
	Question.getAllQuestions()
		.then(({ questions }) => {
			if (questions && questions.length > 0) {
				res.json({
					message: 'All questions',
					questions: questions
				})
			}
		})
		.catch(err => next(err))
})

router.get(
	'/current-user',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { id } = req.user
		console.log('req.user.id: ', id)
		Question.getQuestionsByAccount({ accountId: id })
			.then(({ questions }) => {
				if (questions && questions.length > 0) {
					res.json({
						message: `Questions of accountId: ${id}`,
						questions: questions
					})
				}
			})
			.catch(err => next(err))
	}
)

module.exports = router
