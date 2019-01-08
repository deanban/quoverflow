const validator = require('validator')
const isEmpty = require('../validations/is-empty')

module.exports = function validateLogin(data) {
	const errors = {}

	//run all the data through custom isEmpty function first
	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''

	//validate:
	//email: isEmail, isEmpty
	//password: isEmpty

	if (!validator.isEmail(data.email)) {
		errors.email = 'Invalid Email'
	}
	if (validator.isEmpty(data.email)) {
		errors.email = 'Email is required to login'
	}
	if (validator.isEmpty(data.password)) {
		errors.password = 'Password is required'
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
