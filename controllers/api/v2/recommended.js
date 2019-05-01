const express = require('express')
const passport = require('passport')

const router = express.Router()

const UserCategory = require('../../../models/api/v2/userCategory')
const Question = require('../../../models/api/v2/question')
const Answer = require('../../../models/api/v2/answer')

//recommended questions based on categories that user liked
router.get(
	'/questions',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { id } = req.user
		let questionsArr = []

		UserCategory.getUserCategories({ accountId: id })
			.then(({ categories }) => {
				// console.log(categories)
				categories.map(({ categoryId }) => {
					// console.log(categoryId)
					Promise.all([Question.getQuestionsByCategory({ categoryId })])
						.then(questions => {
							questionsArr.push(questions)
						})
						.catch(err => next(err))
				})
			})
			.catch(err => next(err))
		console.log(questionsArr)

		setTimeout(() => {
			res.json({
				type: 'FOUND',
				message: `Recommended Questions for accountId: ${id}`,
				questionsArr
			})
		}, 50)

		//working but getting weird response back. Needs to be cleaned
	}
)

module.exports = router
