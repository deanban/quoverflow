const Account = require('../models/api/v2/account')
const Category = require('../models/api/v2/category')
const Question = require('../models/api/v2/question')
const Answer = require('../models/api/v2/answer')
const Comment = require('../models/api/v2/comment')

Promise.all([
	Account.storeAccount({
		firstName: 'Dean',
		lastName: 'Banik',
		email: 'd@d.com',
		password: '123456'
	})
		.then(() => console.log('Account Dean Created'))
		.catch(err => console.log(err)),
	Account.storeAccount({
		firstName: 'Mou',
		lastName: 'Roy',
		email: 'm@r.com',
		password: '123456'
	})
		.then(() => console.log('Account Mou Created'))
		.catch(err => console.log(err)),
	Account.storeAccount({
		firstName: 'Consuela',
		lastName: 'Banana-hamock',
		email: 'c@b.com',
		password: '123456'
	})
		.then(() => console.log('Account Consuela Banana-hamock Created'))
		.catch(err => console.log(err)),
	Category.storeCategory({ name: 'Science' })
		.then(() => console.log('Category Science Created'))
		.catch(err => console.error(err)),
	Category.storeCategory({ name: 'Technology' })
		.then(() => console.log('Category Technology Created'))
		.catch(err => console.error(err)),
	Category.storeCategory({ name: 'Computer' })
		.then(() => console.log('Category Computer Created'))
		.catch(err => console.error(err)),
	Question.storeQuestion({
		body: 'What is the future like for NodeJS?',
		accountId: 2,
		categoryId: 2
	})
		.then(() => console.log('Question Created'))
		.catch(err => console.log(err)),
	Question.storeQuestion({
		body:
			'What did you think about the new pictures from Event Horizon Telescope?',
		accountId: 1,
		categoryId: 1
	})
		.then(() => console.log('Question Created'))
		.catch(err => console.log(err)),
	Question.storeQuestion({
		body: 'Is the hayday of Mac over?',
		accountId: 3,
		categoryId: 3
	})
		.then(() => console.log('Question Created'))
		.catch(err => console.log(err))
])
