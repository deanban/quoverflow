const express = require('express')
const passport = require('passport')

const router = express.Router()

const helpers = require('./helpers/voteHelper')

router.post(
	'/upvote',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { id } = req.user

		if (req.body.questionId) {
			const { questionId } = req.body
			helpers.upVoteQuestion({ accountId: id, questionId, res, next })
		} else if (req.body.answerId) {
			const { answerId } = req.body
			helpers.upVoteAnswer({ accountId: id, answerId, res, next })
		} else if (req.body.commentId) {
			const { commentId } = req.body
			helpers.upVoteComment({ accountId: id, commentId, res, next })
		}
	}
)

module.exports = router
