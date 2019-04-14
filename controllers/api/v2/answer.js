const express = require('express')
const passport = require('passport')

const router = express.Router()

const validateBody = require('../../../validations/validateBody')
const Answer = require('../../../models/api/v2/answer')

//POST new answer
//PROTECTED
router.post(
	'/new',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { id } = req.user
		const { body, questionId } = req.body

		Answer.getUserAnswerToQuestion({ accountId: id, questionId }).then(
			({ answers }) => {
				if (answers && answers.length > 0) {
					res.json({
						type: 'FOUND',
						message:
							'You have already answered this question. You can edit with the edit button under your answer.'
					})
				} else {
					const { errors, isValid } = validateBody(req.body)
					if (!isValid) return res.status(400).json(errors)

					Answer.storeAnswer({ body, questionId, accountId: id })
						.then(() =>
							res.json({
								type: 'SUCCESS',
								message: 'Answer Stored!'
							})
						)
						.catch(err => next(err))
				}
			}
		)
	}
)

//GET top 5 answers for a question
router.get('/question', (req, res, next) => {
	const { questionId } = req.body

	Answer.getAllAnswersForQuestion({ questionId })
		.then(({ answers }) => {
			if (answers && answers.length > 0) {
				res.json({
					type: 'FOUND',
					message: `Answers for quesitonId: ${questionId}`,
					answers: answers
				})
			} else {
				res.json({
					type: 'NO_ANSWERS',
					message: 'There are no answers for this question yet.'
				})
			}
		})
		.catch(err => next(err))
})

//GET all answers in a profile or current user
//PROTECTED
router.get(
	'/current-user',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		// console.log(req.user)
		const { id } = req.user
		Answer.getAnswersByAccount({ accountId: id })
			.then(({ answers }) => {
				if (answers && answers.length > 0) {
					res.json({
						type: 'FOUND',
						message: `All answers of accountId: ${id}`,
						answers: answers
					})
				} else {
					res.json({
						type: 'NO_ANSWERS_POSTED',
						message: 'You have not answered any questions yet.'
					})
				}
			})
			.catch(err => next(err))
	}
)

module.exports = router
