const express = require('express')
const Account = require('../../../models/api/v2/account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const router = express.Router()

const validateRegistration = require('../../../validations/register')
const validateLogin = require('../../../validations/login')

router.post('/register', (req, res, next) => {
	const { errors, isValid } = validateRegistration(req.body)
	const { email } = req.body

	//if validations fail
	if (!isValid) return res.status(400).json(errors)

	Account.getAccount({ email })
		.then(({ account }) => {
			if (account) {
				errors.email = 'User with that email address already exits!'
				return res.status(400).json(errors)
			} else {
				return Account.storeAccount(req.body)
			}
		})
		.catch(err => next(err))
})

module.exports = router
