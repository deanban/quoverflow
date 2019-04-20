const Comment = require('../models/api/v2/comment')
const Follow = require('../models/api/v2/follow')

const taskArr3 = [
	Comment.storeCommentToQuestion({
		body: 'Look! another apple fanboy..',
		questionId: 3,
		accountId: 1
	}),
	Comment.storeCommentToAnswer({
		body: 'Look! another apple fanboy..',
		answerId: 3,
		accountId: 1
	}),
	Follow.followUser({
		accountId: 1,
		accountIdToFollow: 2
	}),
	Follow.followUser({
		accountId: 1,
		accountIdToFollow: 3
	}),
	Follow.followUser({
		accountId: 2,
		accountIdToFollow: 1
	}),
	Follow.followUser({
		accountId: 2,
		accountIdToFollow: 3
	}),
	Follow.followUser({
		accountId: 3,
		accountIdToFollow: 2
	}),
	Follow.followUser({
		accountId: 3,
		accountIdToFollow: 1
	})
]

return taskArr3
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
