const mongoose = require('mongoose')

const Schema = mongoose.Schema

const QuestionSchema = new Schema({
	//belongs to an user
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	//belongs to many tags
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tags'
		}
	],
	//has many answers
	answers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'answer'
		}
	],
	text: {
		type: String,
		required: true
	},
	//has comments
	comments: [
		{
			//comment to a question belongs to an user
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			text: {
				type: String,
				required: true
			},
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

module.exports = mongoose.model('question', QuestionSchema)
