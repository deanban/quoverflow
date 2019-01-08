const mlab = require('./mlab_keys')

module.exports = {
	mongoURI: `mongodb://${mlab.name}:${
		mlab.pass
	}@ds151354.mlab.com:51354/quoverflow`,
	secretKey: `${mlab.secret}`
}
