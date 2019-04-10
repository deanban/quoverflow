const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegistration(data) {
	let errors = {}

	//run all the data through custom isEmpty function first
	data.firstName = !isEmpty(data.firstName) ? data.firstName : ''
	data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''
	data.password2 = !isEmpty(data.password2) ? data.password2 : ''

	//validate:
	//name: length, not empty,
	//email: isemail, not empty
	//pass: length, not empty
	//pass2: length, not empty
	//pass1 === pass2
	if (!validator.isLength(data.firstName, { min: 2, max: 30 })) {
		errors.firstName = 'Name must be between 2 and 30 characters'
	}

	if (validator.isEmpty(data.firstName)) {
		errors.firstName = 'You can not leave your firstName empty.'
	}

	if (!validator.isLength(data.lastName, { min: 2, max: 30 })) {
		errors.lastName = 'Name must be between 2 and 30 characters'
	}

	if (validator.isEmpty(data.lastName)) {
		errors.lastName = 'You can not leave your lastName empty.'
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

// const data = {
// 	firstName: 'd',
// 	lastName: '',
// 	email: 'd@d.com',
// 	password: '123456',
// 	password2: '123456'
// }

// console.log(validateRegistration(data))
