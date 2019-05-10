const express = require('express')
const passport = require('passport')

const router = express.Router()

const UserCategory = require('../../../models/api/v2/userCategory')
const Question = require('../../../models/api/v2/question')
const Answer = require('../../../models/api/v2/answer')

//recommended questions based on categories that user liked
router.get(
	'/questions',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { id } = req.user
		Question.getRecommendedQsByCates({ accountId: id })
			.then(({ questions }) => {
				if (questions && questions.length > 0) {
					res.json({
						type: 'FOUND',
						message: 'Here are some questions based on the users\' categories',
						questions: questions
					})
				} else {
					//todo: recommended questions by upvotes/answered/commented
					//questions categories
					//further todo: recommended questions by upvotes/answered/commented by users followed/followers

					// for now all questions
					Question.getAllQuestions().then(({ questions }) => {
						if (questions && questions.length > 0) {
							res.json({
								type: 'FOUND',
								message: 'All questions',
								questions: questions
							})
						} else {
							res.json({
								type: 'NO_QUESTIONS',
								message:
									'No question has been asked yet. Be the first to ask a meaningful question.'
							})
						}
					})
				}
			})
			.catch(err => next(err))
	}
)

module.exports = router
