const express = require('express')
const passport = require('passport')

const router = express.Router()

const Follow = require('../../../models/api/v2/follow')
const Account = require('../../../models/api/v2/account')

router.post(
	'/follow',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { id, firstName } = req.user
		const { accountIdToFollow } = req.body

		const followedArr = []

		Follow.findFollowed({ accountId: id }).then(res => {
			res.map(({ followed }) => followedArr.push(followed))
		})

		setTimeout(() => {
			if (followedArr.includes(parseInt(accountIdToFollow)) === false) {
				Follow.followUser({
					accountId: id,
					accountIdToFollow: accountIdToFollow
				})
					.then(() => {
						res.json({
							type: 'SUCCESS',
							message: `${firstName} Succesfully Followed Account ID- ${accountIdToFollow}`
						})
					})
					.catch(err => next(err))
			} else {
				res.json({
					type: 'FAILED',
					message: `You Have Already Followed User ID- ${accountIdToFollow}.`
				})
			}
		}, 100)
	}
)

router.get(
	'/all-followed',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { id, firstName } = req.user

		const followedArr = []

		Follow.findFollowed({ accountId: id })
			.then(res => {
				res.map(({ followed }) => {
					Promise.all([
						Account.getAccountById({ id: followed })
							.then(({ account }) => followedArr.push(account))
							.catch(err => next(err))
					])
				})
			})
			.catch(err => next(err))

		setTimeout(() => {
			res.json({
				type: 'FOUND',
				message: `Found Users Whom ${firstName} Followed.`,
				followed: followedArr
			})
		}, 100)
	}
)

router.delete(
	'/un-follow',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { id, firstName } = req.user
		const { accountIdToUnfollow } = req.body

		Follow.unFollow({
			accountId: id,
			accountIdToUnfollow: accountIdToUnfollow
		})
			.then(() => {
				res.json({
					type: 'SUCCESS',
					message: `${firstName} Successfully Unfollowed User ID- ${accountIdToUnfollow}`
				})
			})
			.catch(err => next(err))
	}
)

module.exports = router
