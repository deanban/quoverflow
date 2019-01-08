const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegistration(data) {
	let errors = {}

	//run all the data through custom isEmpty function first
	data.name = !isEmpty(data.name) ? data.name : ''
	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''
	data.password2 = !isEmpty(data.password2) ? data.password2 : ''

	//validate:
	//name: length, not empty,
	//email: isemail, not empty
	//pass: length, not empty
	//pass2: length, not empty
	//pass1 === pass2
	if (!validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = 'Name must be between 2 and 30 characters'
	}

	if (validator.isEmpty(data.name)) {
		errors.name = 'You can not leave your name empty.'
	}

	if (validator.isEmpty(data.email)) {
		errors.email = 'Email is required.'
	}

	if (!validator.isEmail(data.email)) {
		errors.email = 'Invalid Email'
	}

	if (validator.isEmpty(data.password)) {
		errors.password = 'Password is required'
	}

	if (!validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters'
	}

	if (validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirm Password field is required'
	}

	if (!validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords must match'
	}

	return {
		errors,
		//only if errors object is empty then return isValid = true
		isValid: isEmpty(errors)
	}
}
