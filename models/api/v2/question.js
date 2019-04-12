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

	//store questions to the database
	static storeQuestion({ body, accountId, categoryId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO question(body, "accountId", "categoryId")
        VALUES($1,$2,$3)`,
				[body, accountId, categoryId],
				(err, res) => {
					if (err) return reject(err)
					// console.log(res.rows)
					resolve()
				}
			)
		})
	}

	//get top 5 similar questions
	static getSimilarQuestions({ body, accountId, categoryId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT id, body
        FROM (SELECT id, body, token
        FROM question, plainto_tsquery($1) AS q
        WHERE (token @@ q)) AS t1
        ORDER BY ts_rank_cd(t1.token, plainto_tsquery($1))
        DESC LIMIT 5`,
				[body],
				(err, res) => {
					if (err) return reject(err)
					resolve({ q: res.rows })
				}
			)
		})
	}

	//get all questions by category
	static getQuestionsByCategory({ categoryId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				'SELECT id, body, "accountId" FROM question WHERE "categoryId"=$1',
				[categoryId],
				(err, res) => {
					if (err) return reject(err)
					resolve({ questions: res.rows })
				}
			)
		})
	}

	//get all questions by user
	static getQuestionsByAccount({ accountId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				'SELECT id, body, "categoryId" FROM question WHERE "accountId"=$1',
				[accountId],
				(err, res) => {
					if (err) return reject(err)
					resolve({ questions: res.rows })
				}
			)
		})
	}

	//get all questions
	static getAllQuestions() {
		return new Promise((resolve, reject) => {
			pool.query('SELECT * FROM question', (err, res) => {
				if (err) return reject(err)
				resolve({ questions: res.rows })
			})
		})
	}
}

/***************************************************************
                         DEBUGGER CODES
***************************************************************/

Question.getSimilarQuestions({
	body:
		'What did you think about the new pictures from Event Horizon Telescope?',
	accountId: 1,
	categoryId: 1
})
	.then(({ q }) => console.log(q))
	.catch(err => console.log(err))

// Question.getQuestionsByAccount({
// 	accountId: 10
// })
// 	.then(({ questions }) => console.log(questions))
// 	.catch(err => console.log(err))

// Question.getAllQuestions()
// 	.then(({ questions }) => console.log(questions))
// 	.catch(err => console.log(err))
