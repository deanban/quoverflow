const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	photo: {
		data: Buffer,
		type: String
	},
	//has many followings
	following: [
		{
			type: Schema.Types.ObjectId,
			ref: 'users'
		}
	],
	//has many followers
	followers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'users'
		}
	],
	questions: [
		{
			type: Schema.Types.ObjectId,
			ref: 'questions'
		}
	],
	answers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'answers'
		}
	],
	//can like many tags
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tags'
		}
	],
	date: {
		type: Date,
		default: Date.now()
	}
})

module.exports = mongoose.model('users', UserSchema)
