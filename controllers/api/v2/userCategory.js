const express = require('express')
const passport = require('passport')

const router = express.Router()

const UserCategory = require('../../../models/api/v2/userCategory')
const Category = require('../../../models/api/v2/category')

router.post(
	'/user-category',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { id, firstName } = req.user
		const { categoryId } = req.body

		UserCategory.storeUserCategory({
			accountId: id,
			categoryId: categoryId
		})
			.then(() => {
				res.json({
					type: 'SUCCESS',
					message: `Category ID- ${categoryId} Saved for ${firstName}`
				})
			})
			.catch(err => next(err))
	}
)

router.get(
	'/user-categories',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { id, firstName } = req.user
		const categoryArr = []

		UserCategory.getUserCategories({
			accountId: id
		})
			.then(({ categories }) => {
				categories.map(({ categoryId }) => {
					Promise.all([
						Category.getCategoryById({ id: categoryId })
							.then(({ category }) => {
								categoryArr.push(category)
							})
							.catch(err => next(err))
					])
				})
			})
			.catch(err => next(err))

		//need to allocate some time before categories are pushed into the array.
		//20ms seems to be enough for localhost, but keeping 100ms to account for
		//any client delay that might occure in production.
		setTimeout(() => {
			res.json({
				type: 'FOUND',
				message: `Found Some Saved Categories for ${firstName}`,
				categories: categoryArr
			})
		}, 100)
	}
)

module.exports = router
