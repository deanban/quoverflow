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
/***********************REGISTRATION****************************/

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
/***************************LOGIN*******************************/

/***********************GET CURRENT USER****************************/
//throws error if not private.
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({ id: req.user.id, name: req.user.id, email: req.user.email })
	}
)
/***********************GET CURRENT USER****************************/

module.exports = router
