const Account = require('../models/api/v2/account')
const Category = require('../models/api/v2/category')
const Question = require('../models/api/v2/question')

const taskArr = [
	Account.storeAccount({
		firstName: 'Dean',
		lastName: 'Banik',
		email: 'd@d.com',
		password: '123456'
	}),
	Account.storeAccount({
		firstName: 'Mou',
		lastName: 'Roy',
		email: 'm@r.com',
		password: '123456'
	}),
	Account.storeAccount({
		firstName: 'Consuela',
		lastName: 'Banana-hamock',
		email: 'c@b.com',
		password: '123456'
	}),
	Account.storeAccount({
		firstName: 'Dick',
		lastName: 'Van Dyke',
		email: 'd@v.com',
		password: '123456'
	}),
	Category.storeCategory({ name: 'Science' }),
	Category.storeCategory({ name: 'Technology' }),
	Category.storeCategory({ name: 'Computer' }),
	Question.storeQuestion({
		body: 'What is the future like for NodeJS?',
		accountId: 2,
		categoryId: 2
	}),
	Question.storeQuestion({
		body:
			'What did you think about the new pictures from Event Horizon Telescope?',
		accountId: 1,
		categoryId: 1
	}),
	Question.storeQuestion({
		body: 'Is the hayday of Mac over?',
		accountId: 3,
		categoryId: 3
	})
]

return taskArr
	.reduce((promiseChain, currentTask) => {
		return promiseChain
			.then(chainResults =>
				currentTask
					.then(currentResult => [...chainResults, currentResult])
					.catch(err => console.error(err))
			)
			.catch(err => console.error(err))
	}, Promise.resolve([]))
	.then(arrayOfResults => {
		console.log(arrayOfResults)
	})
	.catch(err => console.error(err))
