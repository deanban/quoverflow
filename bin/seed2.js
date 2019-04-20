const Answer = require('../models/api/v2/answer')

const taskArr2 = [
	Answer.storeAnswer({
		body: 'Future for node looks fine so far for 2019',
		questionId: 1,
		accountId: 1
	}),
	Answer.storeAnswer({
		body: 'Future for node looks pretty solid so far.',
		questionId: 1,
		accountId: 3
	}),
	Answer.storeAnswer({
		body: 'Not for the fans.',
		questionId: 2,
		accountId: 2
	})
]

return taskArr2
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
