const express = require('express')
const User = require('../../../models/api/v1/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const router = express.Router()

const validateRegistration = require('../../../validations/register')
const validateLogin = require('../../../validations/login')

const secretKey = require('../../../config/mlab_keys').jwtKey

router.get('/test', (_, res) => {
	res.json({ msg: 'user test' })
})

/***********************REGISTRATION****************************/
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegistration(req.body)
	const { name, email, password } = req.body

	//check validation
	if (!isValid) {
		return res.status(400).json(errors)
	}

	User.findOne({ email }).then(user => {
		if (user) {
			errors.email = 'User with that email address already exits!'
			return res.status(400).json(errors)
		} else {
			const newUser = new User({
				name: name,
				email: email,
				password: password
			})
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err
					newUser.password = hash
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err))
				})
			})
		}
	})
})
/***********************END OF REGISTRATION****************************/

/***************************LOGIN*******************************/
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLogin(req.body)
	const { email, password } = req.body

	//check validation
	if (!isValid) {
		return res.status(400).json(errors)
	}
	User.findOne({ email }).then(user => {
		if (!user) {
			errors.email = 'User with that email address does not exist!'
			return res.status(400).json(errors)
		} else {
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					const jwtPayload = {
						id: user.id,
						name: user.name
					}
					jwt.sign(jwtPayload, secretKey, { expiresIn: '1h' }, (err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token
						})
					})
				} else {
					errors.password = 'Incorrect Password!'
					res.status(400).json(errors)
				}
			})
		}
	})
})
/***************************END OF LOGIN*******************************/

/***************************ADD FOLLOWING*******************************/
//PROTECTED
router.put(
	'/follow',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {}
		const { userId, followId } = req.body
		User.findByIdAndUpdate(userId, { $push: { following: followId } })
			.populate('following', '_id name')
			.populate('followers', '_id name')
			.exec()
			.then(user => {
				if (!user) {
					errors.nouser = 'There is no user by that id'
				} else {
					res.json(user)
				}
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}
)
/***************************END OF ADD FOLLOWING*******************************/

/***************************ADD FOLLOWER*******************************/
//PROTECTED
router.put(
	'/followers',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {}
		const { followId, userId } = req.body
		User.findByIdAndUpdate(
			followId,
			{ $push: { followers: userId } },
			{ new: true }
		)
			.populate('following', '_id name')
			.populate('followers', '_id name')
			.exec()
			.then(user => {
				if (!user) {
					errors.nouser = 'There is no user by that id'
				} else {
					user.password = undefined
					res.json(user)
				}
			})
			.catch(err => res.status(400).json(err))
	}
)
/***************************END OF ADD FOLLOWER*******************************/

/***************************UNFOLLOW*******************************/
//PROTECTED
router.put(
	'/unfollow',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { userId, unfollowId } = req.body
		User.findByIdAndUpdate(userId, { $pull: { following: unfollowId } })
			.exec()
			.populate('following', '_id name')
			.populate('followers', '_id name')
			.then(result => {
				result.password = undefined
				res.json(result)
			})
			.catch(err => res.status(400).json(err))
	}
)
/***************************END OF UNFOLLOW*******************************/

/***************************REMOVE A FOLLOWER*******************************/
//PROTECTED
router.put(
	'/removefollower',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { userId, followerId } = req.body
		User.findByIdAndUpdate(
			followerId,
			{ $pull: { followers: userId } },
			{ new: true }
		)
			.populate('following', '_id name')
			.populate('followers', '_id name')
			.exec((err, result) => {
				if (err) {
					return res.status(400).json(err)
				}
				result.password = undefined
				res.json(result)
			})
	}
)
/***************************END OF REMOVE A FOLLOWER*******************************/

/***********************GET CURRENT USER****************************/
//PROTECTED
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// console.log(req.user)
		res.json(req.user)
	}
)
/***********************END OF GET CURRENT USER****************************/

module.exports = router
