const Vote = require('../../../../models/api/v2/vote')

function upVoteQuestion({ accountId, questionId, res, next }) {
	Vote.checkVote({
		accountId,
		questionId
	}).then(result => {
		if (result === undefined || result.votes <= 0) {
			Vote.upVote({
				accountId,
				questionId
			})
				.then(() => {
					Vote.countVotes({ questionId })
				})
				.then(result => {
					if (result === undefined || result.total === null) {
						res.json({
							type: 'TOTAL',
							message: `Total votes for Question ID- ${questionId}`,
							total: 0
						})
					} else {
						res.json({
							type: 'TOTAL',
							message: `Total votes for Question ID- ${questionId}`,
							total: result.total
						})
					}
				})
		} else if (result.votes > 0) {
			res.json({
				type: 'FOUND',
				message: 'You Have Already Upvoted This Question.'
			})
		}
	})
}

function upVoteAnswer({ accountId, answerId, res, next }) {
	Vote.checkVote({
		accountId,
		answerId
	}).then(result => {
		if (result === undefined || result.votes <= 0) {
			Vote.upVote({
				accountId,
				answerId
			})
				.then(() => {
					Vote.countVotes({ answerId })
				})
				.then(result => {
					if (result === undefined || result.total === null) {
						res.json({
							type: 'TOTAL',
							message: `Total votes for Answer ID- ${answerId}`,
							total: 0
						})
					} else {
						res.json({
							type: 'TOTAL',
							message: `Total votes for Answer ID- ${answerId}`,
							total: result.total
						})
					}
				})
		} else if (result.votes > 0) {
			res.json({
				type: 'FOUND',
				message: 'You Have Already Upvoted This Question.'
			})
		}
	})
}

function upVoteComment({ accountId, commentId, res, next }) {
	Vote.checkVote({
		accountId,
		commentId
	}).then(result => {
		if (result === undefined || result.votes <= 0) {
			Vote.upVote({
				accountId,
				commentId
			})
				.then(() => {
					Vote.countVotes({ commentId })
				})
				.then(result => {
					if (result === undefined || result.total === null) {
						res.json({
							type: 'TOTAL',
							message: `Total votes for Comment ID- ${commentId}`,
							total: 0
						})
					} else {
						res.json({
							type: 'TOTAL',
							message: `Total votes for Comment ID- ${commentId}`,
							total: result.total
						})
					}
				})
		} else if (result.votes > 0) {
			res.json({
				type: 'FOUND',
				message: 'You Have Already Upvoted This Question.'
			})
		}
	})
}

module.exports = { upVoteQuestion, upVoteAnswer, upVoteComment }
