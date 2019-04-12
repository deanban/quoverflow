const pool = require('../../../pgPool')

const COMMENT_DEFAULTS = {}

Object.defineProperties(COMMENT_DEFAULTS, {
	commentId: { get: () => undefined },
	body: { get: () => undefined },
	questionId: { get: () => null },
	accountId: { get: () => undefined },
	answerId: { get: () => null }
})

module.exports = class Comment {
	constructor({ commentId, body, accountId, questionId, answerId } = {}) {
		this.commentId = commentId || COMMENT_DEFAULTS.commentId
		this.body = body || COMMENT_DEFAULTS.body
		this.questionId = questionId || COMMENT_DEFAULTS.questionId
		this.accountId = accountId || COMMENT_DEFAULTS.accountId
		this.answerId = answerId || COMMENT_DEFAULTS.answerId
	}

	static storeCommentToQuestion({ accountId, questionId, body }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO comment(body, "questionId", "accountId")
        VALUES($1,$2,$3)`,
				[body, questionId, accountId],
				(err, res) => {
					if (err) return reject(err)
					resolve()
				}
			)
		})
	}

	static storeCommentToAnswer({ accountId, answerId, body }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO comment(body, "answerId", "accountId")
        VALUES($1,$2,$3)`,
				[body, answerId, accountId],
				(err, res) => {
					if (err) return reject(err)
					resolve()
				}
			)
		})
	}

	static getQuestionComments({ questionId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				'SELECT id, body, "questionId" FROM comment WHERE "questionId"=$1',
				[questionId],
				(err, res) => {
					if (err) return reject(err)
					resolve({ comments: res.rows })
				}
			)
		})
	}

	static getAnswerComments({ answerId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				'SELECT id, body, "answerId" FROM comment WHERE "answerId"=$1',
				[answerId],
				(err, res) => {
					if (err) return reject(err)
					resolve({ comments: res.rows })
				}
			)
		})
	}

	/*****************************************************************
            NOPE!!  below is vulnerable to sql injection
  *****************************************************************/
	// static getComments({ id }) {
	// 	return new Promise((resolve, reject) => {
	// 		pool.query(
	// 			`SELECT id, body, ${'id'} FROM comment WHERE ${'id'}=$1`,
	// 			[id],
	// 			(err, res) => {
	// 				if (err) return reject(err)
	// 				resolve({ comments: res.rows })
	// 			}
	// 		)
	// 	})
	// }
}

/***************************************************************
                         DEBUGGER CODES
***************************************************************/

// Comment.storeCommentToQuestion({
// 	accountId: 2,
// 	questionId: 2,
// 	body: 'I did. What about you?'
// })
// 	.then(() => console.log('success'))
// 	.catch(err => console.error(err))

// Comment.storeCommentToAnswer({
// 	accountId: 1,
// 	answerId: 1,
// 	body: 'Beautiful poem!'
// })
// 	.then(() => console.log('success'))
// 	.catch(err => console.error(err))

// Comment.getQuestionComments({
// 	questionId: 2
// })
// 	.then(({ comments }) => console.log(comments))
// 	.catch(err => console.error(err))
