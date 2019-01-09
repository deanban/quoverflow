const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AnswerSchema = new Schema({
	//belongs to an user
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	//belongs to a question
	question: {
		type: Schema.Types.ObjectId,
		ref: 'question'
	},
	text: {
		type: String,
		required: true
	},
	//has many likes
	likes: [
		//like belongs to an user
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	//has many comments
	comments: [
		{
			//comment to an answer belongs to an user
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			text: {
				type: String,
				required: true
			},
			//comment has many likes
			likes: [
				//likes on comment to an answer belong to an user
				{
					user: {
						type: Schema.Types.ObjectId,
						ref: 'users'
					}
				}
			],
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('answer', AnswerSchema)
