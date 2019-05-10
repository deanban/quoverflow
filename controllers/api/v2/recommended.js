const express = require('express')
const passport = require('passport')

const router = express.Router()

const UserCategory = require('../../../models/api/v2/userCategory')
const Question = require('../../../models/api/v2/question')
const Answer = require('../../../models/api/v2/answer')
const Follow = require('../../../models/api/v2/follow')

//recommended questions based on categories that user liked
router.get(
	'/questions',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { id } = req.user
		let aggregateRecommendedQs = []
		let dupsRemoved = []
		Question.getRecommendedQsByCates({ accountId: id })
			.then(({ questions }) => {
				if (questions && questions.length > 0) {
					questions.map(question => aggregateRecommendedQs.push(question))
				} else {
					//todo: recommended questions by upvotes/answered/commented
					//questions categories
					//further todo: recommended questions by upvotes/answered/commented by users followed/followers --done

					// for now all questions
					Question.getAllQuestions().then(({ questions }) => {
						if (questions && questions.length > 0) {
							res.json({
								type: 'FOUND',
								message: 'All questions',
								questions: questions
							})
						} else {
							res.json({
								type: 'NO_QUESTIONS',
								message:
									'No question has been asked yet. Be the first to ask a meaningful question.'
							})
						}
					}).catch(err => next(err))
				}
			})
			.then(() => {
				//find users that this account follows
				//find the categories liked by all the followed users
				//find questions from those categories
				//add all the questions together
				//remove any duplicates
				//return one final array

				Follow.findFollowed({ accountId: id }).then(resp => {
					resp.map(({ followed }) => {
						Promise.all([
							UserCategory.getUserCategories({ accountId: followed })
						]).then(resp => {
							resp.map(({ categories }) => {
								// console.log(categories)
								categories.map(({ categoryId }) => {
									Promise.all([Question.getQuestionsByCategory({ categoryId })])
										.then(resp => {
											resp.map(({ questions }) => {
												aggregateRecommendedQs.push(questions[0])
											})
										})
										.then(() => {
											//remove duplicates
											dupsRemoved = Object.values(
												aggregateRecommendedQs.reduce(
													(acc, curr) => ((acc[`${curr.body}`] = curr), acc),
													{}
												)
											)
										})
								})
							})
						})
					})
				})
			})
			.catch(err => next(err))
		setTimeout(() => {
			res.json({
				type: 'FOUND',
				message:
					'Here are some questions based on the users and his/hers followed users categories',
				questions: dupsRemoved
			})
		}, 100)
	}
)

module.exports = router
