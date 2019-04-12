const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateQuestionAnswerComment(data) {
	let errors = {}

	data.body = !isEmpty(data.body) ? data.body : ''
	if (!validator.isLength(data.body, { min: 10, max: 1000 })) {
		errors.body = 'Question body must be valid with minimum of 10 chars.'
	}
	if (validator.isEmpty(data.body)) {
		errors.body = 'Body can not be left empty'
	}

	// data.accountId = !isEmpty(data.accountId) ? data.accountId : ''
	// data.categoryId = !isEmpty(data.categoryId) ? data.categoryId : ''

	// if (validator.isEmpty(data.accountId)) {
	// 	errors.accountId = 'accountId must be provided.'
	// }
	// if (!validator.isNumeric(data.accountId, { no_symbols: true })) {
	// 	errors.accountId = 'accountId must be a number.'
	// }
	// if (validator.isEmpty(data.categoryId)) {
	// 	errors.categoryId = 'categoryId must be provided.'
	// }
	// if (!validator.isNumeric(data.categoryId, { no_symbols: true })) {
	// 	errors.categoryId = 'categoryId must be a number.'
	// }

	return {
		errors,
		isValid: isEmpty(errors)
	}
}

// console.log(
// 	validateQuestion({
// 		body: '',
// 		accountId: 1,
// 		categoryId: 1
// 	})
// )
