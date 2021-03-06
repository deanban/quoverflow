const express = require('express')
const Account = require('../../../models/api/v2/account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const secretKey = require('../../../config/mlab_keys').jwtKey

const router = express.Router()

const validateRegistration = require('../../../validations/register')
const validateLogin = require('../../../validations/login')

router.post('/register', (req, res, next) => {
	const { errors, isValid } = validateRegistration(req.body)
	const { email, firstName, lastName } = req.body

	//if validations fail
	if (!isValid) return res.status(400).json(errors)

	Account.getAccountByEmail({ email })
		.then(({ account }) => {
			if (account) {
				errors.email = 'User with that email address already exits!'
				return res.status(400).json(errors)
			} else {
				Account.storeAccount(req.body)
					.then(() => {
						res.json({
							type: 'SUCCESS',
							message: `Successfully Created User- ${firstName} ${lastName}`
						})
					})
					.catch(err => next(err))
			}
		})
		.catch(err => next(err))
})

router.post('/login', (req, res, next) => {
	const { errors, isValid } = validateLogin(req.body)
	const { email, password } = req.body

	//if validations fail
	if (!isValid) return res.status(400).json(errors)

	Account.getAccountByEmail({ email })
		.then(({ account }) => {
			if (account) {
				if (bcrypt.compareSync(password, account.password.trim())) {
					const jwtPayload = {
						id: account.id,
						firstName: account.firstName,
						email: account.email
					}
					jwt.sign(
						jwtPayload,
						secretKey,
						{ expiresIn: '24h' },
						(err, token) => {
							if (err) throw err
							return res.json({
								success: true,
								token: 'Bearer ' + token
							})
						}
					)
				} else {
					errors.password = 'Incorrect Password'
					return res.status(409).json(errors)
				}
			} else {
				// console.log('no here')
				errors.email = 'User with that email address does not exist!'
				res.status(400).json(errors)
			}
		})
		.catch(err => {
			// console.log('here too')
			next(err)
		})
})

router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		// console.log(req)
		res.json({
			id: req.user.id,
			firstName: req.user.firstName.trim(),
			lastName: req.user.lastName.trim(),
			email: req.user.email.trim()
		})
	}
)

module.exports = router
