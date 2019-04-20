const Vote = require('../models/api/v2/vote')

const taskArr4 = [
	Vote.upVote({
		questionId: 3,
		accountId: 1
	}),
	Vote.upVote({
		questionId: 3,
		accountId: 2
	}),
	Vote.downVote({
		questionId: 3,
		accountId: 3
	}),
	Vote.upVote({
		answerId: 1,
		accountId: 1
	}),
	Vote.upVote({
		answerId: 3,
		accountId: 3
	}),
	Vote.downVote({
		answerId: 3,
		accountId: 1
	})
]

return taskArr4
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
