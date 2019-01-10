const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
	//belongs to an user
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true
	},
	//has many questions
	questions: [
		{
			type: Schema.Types.ObjectId,
			ref: 'question'
		}
	],
	//has many answers
	answers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'answer'
		}
	],
	company: {
		type: String
	},
	website: {
		type: String
	},
	location: {
		type: String
	},
	bio: {
		text: {
			type: String
		},
		education: [
			{
				school: {
					type: String
				},
				degree: {
					type: String
				},
				fieldofstudy: {
					type: String
				}
			}
		]
	},
	social: {
		youtube: {
			type: String
		},
		twitter: {
			type: String
		},
		linkedin: {
			type: String
		},
		facebook: {
			type: String
		},
		instagram: {
			type: String
		}
	},
	//has many interests
	interests: [
		{
			type: String
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('profile', ProfileSchema)
