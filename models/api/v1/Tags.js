const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TagSchema = new Schema({
	//has many questions
	questions: [
		{
			type: Schema.Types.ObjectId,
			ref: 'questions'
		}
	],
	text: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('tags', TagSchema)
