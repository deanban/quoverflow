const pool = require('../../../pgPool')

const ANSWER_DEFAULTS = {}

Object.defineProperties(ANSWER_DEFAULTS, {
	answerId: { get: () => undefined },
	body: { get: () => undefined },
	questionId: { get: () => undefined },
	accountId: { get: () => undefined }
})

module.exports = class Answer {
	constructor({ answerId, body, questionId, accountId } = {}) {
		this.answerId = answerId || ANSWER_DEFAULTS.answerId
		this.body = body || ANSWER_DEFAULTS.body
		this.questionId = questionId || ANSWER_DEFAULTS.questionId
		this.accountId = accountId || ANSWER_DEFAULTS.accountId
	}

	static storeAnswer({ body, questionId, accountId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO answer(body, "questionId", "accountId")
        VALUES($1,$2,$3)`,
				[body, questionId, accountId],
				(err, res) => {
					if (err) return reject(err)
					resolve()
				}
			)
		})
	}

	static getAllAnswersForQuestion({ questionId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				'SELECT id, body, "accountId" FROM answer WHERE "questionId"=$1 LIMIT 5',
				[questionId],
				(err, res) => {
					if (err) return reject(err)
					resolve({ answers: res.rows })
				}
			)
		})
	}

	static getAnswersByAccount({ accountId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				'SELECT id, body, "questionId" FROM answer WHERE "accountId"=$1',
				[accountId],
				(err, res) => {
					if (err) return reject(err)
					resolve({ answers: res.rows })
				}
			)
		})
	}
}

/***************************************************************
                         DEBUGGER CODES
***************************************************************/

// Answer.storeAnswer({
// 	body: 'Yes! It was the best damn pictures I\'ve ever seen!',
// 	questionId: 2,
// 	accountId: 3
// })
// 	.then(() => console.log('success'))
// 	.catch(err => console.error(err))

// Answer.getAllAnswersForQuestion({
// 	questionId: 2
// })
// 	.then(({ answers }) => console.log(answers))
// 	.catch(err => console.error(err))

// Answer.getAnswersByAccount({
// 	accountId: 2
// })
// 	.then(({ answers }) => console.log(answers))
// 	.catch(err => console.error(err))
