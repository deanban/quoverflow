const pool = require('../../../pgPool')

const VOTE_DEFAULTS = {}

Object.defineProperties(VOTE_DEFAULTS, {
	questionVoteCount: { get: () => 0 },
	answerVoteCount: { get: () => 0 },
	commentVoteCount: { get: () => 0 },
	accountId: { get: () => undefined },
	questionId: { get: () => undefined },
	commentId: { get: () => undefined }
})

module.exports = class Vote {
	//destructure them out. if incoming values are undefined
	//set them to default object
	constructor({
		questionVoteCount,
		answerVoteCount,
		commentVoteCount,
		accountId,
		questionId,
		answerId,
		commentId
	} = {}) {
		this.questionVoteCount =
			questionVoteCount || VOTE_DEFAULTS.questionVoteCount
		this.answerVoteCount = answerVoteCount || VOTE_DEFAULTS.answerVoteCount
		this.commentVoteCount = commentVoteCount || VOTE_DEFAULTS.commentVoteCount
		this.accountId = accountId || VOTE_DEFAULTS.accountId
		this.questionId = questionId || VOTE_DEFAULTS.questionId
		this.answerId = answerId || VOTE_DEFAULTS.answerId
		this.commentId = commentId || VOTE_DEFAULTS.commentId
	}

	static upVote(param) {
		if (!param)
			throw new Error(
				'Must include an object containing either questionId or answerId, or commentId.'
			)
		if (!param.questionId && !param.answerId && !param.commentId)
			throw new Error(
				'Need an Object containing either questionId or answerId, or commentId.'
			)

		if (param.questionId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'INSERT INTO vote("accountId", "questionId", "questionVoteCount") VALUES($1,$2,$3)',
					[param.accountId, param.questionId, 1],
					(err, res) => {
						if (err) return reject(err)
						resolve()
					}
				)
			})
		} else if (param.answerId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'INSERT INTO vote("accountId", "answerId", "answerVoteCount") VALUES($1,$2,$3)',
					[param.accountId, param.answerId, 1],
					(err, res) => {
						if (err) return reject(err)
						resolve()
					}
				)
			})
		} else if (param.commentId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'INSERT INTO vote("accountId", "commentId", "commentVoteCount") VALUES($1,$2,$3)',
					[param.accountId, param.commentId, 1],
					(err, res) => {
						if (err) return reject(err)
						resolve()
					}
				)
			})
		}
	}
	static downVote(param) {
		if (!param)
			throw new Error(
				'Must include an object containing either questionId or answerId, or commentId.'
			)
		if (!param.questionId && !param.answerId && !param.commentId)
			throw new Error(
				'Need an Object containing either questionId or answerId, or commentId.'
			)

		if (param.questionId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'INSERT INTO vote("accountId", "questionId", "questionVoteCount") VALUES($1,$2,$3)',
					[param.accountId, param.questionId, -1],
					(err, res) => {
						if (err) return reject(err)
						resolve()
					}
				)
			})
		} else if (param.answerId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'INSERT INTO vote("accountId", "answerId", "answerVoteCount") VALUES($1,$2,$3)',
					[param.accountId, param.answerId, -1],
					(err, res) => {
						if (err) return reject(err)
						resolve()
					}
				)
			})
		} else if (param.commentId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'INSERT INTO vote("accountId", "commentId", "commentVoteCount") VALUES($1,$2,$3)',
					[param.accountId, param.commentId, -1],
					(err, res) => {
						if (err) return reject(err)
						resolve()
					}
				)
			})
		}
	}

	static countVotes(param) {
		if (!param)
			throw new Error(
				'Must include an object containing either questionId or answerId, or commentId.'
			)
		if (!param.questionId && !param.answerId && !param.commentId) {
			throw new Error(
				'Need an Object containing either questionId or answerId, or commentId.'
			)
		}
		if (param.questionId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'SELECT SUM("questionVoteCount") AS total FROM vote WHERE "questionId"=$1',
					[param.questionId],
					(err, res) => {
						if (err) return reject(err)
						resolve(res.rows[0])
					}
				)
			})
		} else if (param.answerId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'SELECT SUM("answerVoteCount") AS total FROM vote WHERE "answerId"=$1',
					[param.answerId],
					(err, res) => {
						if (err) return reject(err)
						resolve(res.rows[0])
					}
				)
			})
		} else if (param.commentId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'SELECT SUM("commentVoteCount") AS total FROM vote WHERE "commentId"=$1',
					[param.commentId],
					(err, res) => {
						if (err) return reject(err)
						resolve(res.rows[0])
					}
				)
			})
		}
	}

	static checkVote(param) {
		if (!param)
			throw new Error(
				'Must include an object containing either questionId or answerId, or commentId.'
			)
		if (!param.accountId) {
			throw new Error('Account ID required for checking vote.')
		} else if (param.questionId) {
			return new Promise((resolve, reject) => {
				pool.query(
					`SELECT "questionVoteCount" AS votes FROM vote
          WHERE "accountId"=$1 AND "questionId"=$2`,
					[param.accountId, param.questionId],
					(err, res) => {
						if (err) return reject(err)
						resolve(res.rows[0])
					}
				)
			})
		} else if (param.answerId) {
			return new Promise((resolve, reject) => {
				pool.query(
					`SELECT "answerVoteCount" AS votes FROM vote
          WHERE "accountId"=$1 AND "answerId"=$2`,
					[param.accountId, param.answerId],
					(err, res) => {
						if (err) return reject(err)
						resolve(res.rows[0])
					}
				)
			})
		} else if (param.commentId) {
			return new Promise((resolve, reject) => {
				pool.query(
					`SELECT "commentVoteCount" AS votes FROM vote
          WHERE "accountId"=$1 AND "commentId"=$2`,
					[param.accountId, param.commentId],
					(err, res) => {
						if (err) return reject(err)
						resolve(res.rows[0])
					}
				)
			})
		}
	}
}

/***************************************************************
                         DEBUGGER CODES
***************************************************************/

// Vote.populateVote()
// 	.then(() => console.log('success'))
// 	.catch(err => console.error(err))

// Vote.upVote({ commentId: 2, accountId: 1 })
// 	.then(() => console.log('success'))
// 	.catch(err => console.error(err))

// Vote.downVoteQuestion({ questionId: 1, accountId: 3 })
// 	.then(() => console.log('success'))
// 	.catch(err => console.error(err))

// Vote.countVotes().then(({ total }) => console.log(total))

// Vote.checkVote({
// 	accountId: 2,
// 	answerId: 3
// })
// 	.then(({ votes }) => console.log(votes))
// 	.catch(err => console.error(err))
