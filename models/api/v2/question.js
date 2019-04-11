const pool = require('../../../pgPool')

const QUESTION_DEFAULTS = {}

Object.defineProperties(QUESTION_DEFAULTS, {
	questionId: { get: () => undefined },
	body: { get: () => undefined },
	accountId: { get: () => undefined },
	categoryId: { get: () => undefined }
})

class Question {
	constructor({ questionId, body, accountId, categoryId } = {}) {
		this.questionId = questionId || QUESTION_DEFAULTS.questionId
		this.body = body || QUESTION_DEFAULTS.body
		this.accountId = accountId || QUESTION_DEFAULTS.accountId
		this.categoryId = categoryId || QUESTION_DEFAULTS.categoryId
	}

	static storeQuestion({ body, accountId, categoryId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO question(body, "accountId", "categoryId")
        VALUES($1,$2,$3)`,
				[body, accountId, categoryId],
				(err, res) => {
					if (err) return reject(err)
					console.log(res.rows)
					resolve()
				}
			)
		})
	}

	static getQuestionsByCategory({ categoryId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				'SELECT id, body, "accountId" FROM question WHERE "categoryId"=$1',
				[categoryId],
				(err, res) => {
					if (err) return reject(err)
					resolve({ questions: res.rows[0] })
				}
			)
		})
	}

	static getQuestionsByAccount({ accountId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				'SELECT id, body, "categoryId" FROM question WHERE "accountId"=$1',
				[accountId],
				(err, res) => {
					if (err) return reject(err)
					resolve({ questions: res.rows[0] })
				}
			)
		})
	}

	static getAllQuestions() {
		return new Promise((resolve, reject) => {
			pool.query('SELECT * FROM question', (err, res) => {
				if (err) return reject(err)
				resolve({ questions: res.rows })
			})
		})
	}
}

// Question.storeQuestion({
// 	body: 'How did you like the new pictures of event horizon telescope?',
// 	accountId: 10,
// 	categoryId: 1
// })
// 	.then(() => console.log('success'))
// 	.catch(err => console.log(err))

// Question.getQuestionsByAccount({
// 	accountId: 10
// })
// 	.then(({ questions }) => console.log(questions))
// 	.catch(err => console.log(err))

Question.getAllQuestions()
	.then(({ questions }) => console.log(questions))
	.catch(err => console.log(err))
