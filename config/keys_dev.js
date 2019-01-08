const mlab = require('./mlab_keys')

module.exports = {
	mongoURI: `mongodb://${mlab.name}:${
		mlab.pass
	}@ds117773.mlab.com:17773/devcon`,
	secretKey: 'secret'
}
