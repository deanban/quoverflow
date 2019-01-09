const mongoose = require('mongoose')

const User = mongoose.model('users')
const key = require('../config/mlab_keys')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = key.jwtKey

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (JwtPayload, done) => {
			User.findById(JwtPayload.id)
				.then(user => {
					if (user) {
						return done(null, user)
					}
					return done(null, false)
				})
				.catch(err => console.log(err))
		})
	)
}
