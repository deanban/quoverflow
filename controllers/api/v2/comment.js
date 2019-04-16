const passport = require('passport')
const express = require('express')
const router = express.Router()

const validateBody = require('../../../validations/validateBody')
const Comment = require('../../../models/api/v2/comment')

router.post(
	'/new',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { id } = req.user
		const { errors, isValid } = validateBody(req.body)

		if (!isValid) return res.status(400).json(errors)

		if (req.body.questionId) {
			const { body, questionId } = req.body

			Comment.storeCommentToQuestion({ body, questionId, accountId: id })
				.then(() =>
					res.json({
						type: 'SUCCESS',
						message: `Comment to question id- ${questionId}`
					})
				)
				.catch(err => next(err))
		} else if (req.body.answerId) {
			const { body, answerId } = req.body

			Comment.storeCommentToQuestion({ body, answerId, accountId: id })
				.then(() =>
					res.json({
						type: 'SUCCESS',
						message: `Comment to answer id- ${answerId}`
					})
				)
				.catch(err => next(err))
		}
	}
)

router.get('/all', (req, res, next) => {
	Comment.getComments(req.body)
		.then(({ comments }) => {
			if (comments && comments.length > 0) {
				res.json({
					type: 'FOUND',
					message: 'Found comments.',
					comments: comments
				})
			} else {
				res.json({
					type: 'NO_COMMENTS',
					message: 'No comments found.'
				})
			}
		})
		.catch(err => next(err))
})

module.exports = router
