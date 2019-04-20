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

	static upVote(obj) {
		if (obj.questionId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'INSERT INTO vote("accountId", "questionId", "questionVoteCount") VALUES($1,$2,$3)',
					[obj.accountId, obj.questionId, 1],
					(err, res) => {
						if (err) return reject(err)
						resolve()
					}
				)
			})
		} else if (obj.answerId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'INSERT INTO vote("accountId", "answerId", "answerVoteCount") VALUES($1,$2,$3)',
					[obj.accountId, obj.answerId, 1],
					(err, res) => {
						if (err) return reject(err)
						resolve()
					}
				)
			})
		} else if (obj.commentId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'INSERT INTO vote("accountId", "commentId", "commentVoteCount") VALUES($1,$2,$3)',
					[obj.accountId, obj.commentId, 1],
					(err, res) => {
						if (err) return reject(err)
						resolve()
					}
				)
			})
		}
	}
	static downVote(obj) {
		if (obj.questionId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'INSERT INTO vote("accountId", "questionId", "questionVoteCount") VALUES($1,$2,$3)',
					[obj.accountId, obj.questionId, -1],
					(err, res) => {
						if (err) return reject(err)
						resolve()
					}
				)
			})
		} else if (obj.answerId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'INSERT INTO vote("accountId", "answerId", "answerVoteCount") VALUES($1,$2,$3)',
					[obj.accountId, obj.answerId, -1],
					(err, res) => {
						if (err) return reject(err)
						resolve()
					}
				)
			})
		} else if (obj.commentId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'INSERT INTO vote("accountId", "commentId", "commentVoteCount") VALUES($1,$2,$3)',
					[obj.accountId, obj.commentId, -1],
					(err, res) => {
						if (err) return reject(err)
						resolve()
					}
				)
			})
		}
	}

	static countVotes(obj) {
		if (obj.questionId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'SELECT SUM("questionVoteCount") AS total FROM vote WHERE "questionId"=$1',
					[obj.questionId],
					(err, res) => {
						if (err) return reject(err)
						resolve(res.rows[0])
					}
				)
			})
		} else if (obj.answerId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'SELECT SUM("answerVoteCount") AS total FROM vote WHERE "answerId"=$1',
					[obj.answerId],
					(err, res) => {
						if (err) return reject(err)
						resolve(res.rows[0])
					}
				)
			})
		} else if (obj.commentId) {
			return new Promise((resolve, reject) => {
				pool.query(
					'SELECT SUM("answerVoteCount") AS total FROM vote WHERE "commentId"=$1',
					[obj.commentId],
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

// Vote.countVotes({ commentId: 2 }).then(({ total }) => console.log(total))
