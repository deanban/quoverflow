const bcrypt = require('bcryptjs')
const pool = require('../../../pgPool')

module.exports = class Account {
	constructor(firstName, lastName, email, password) {
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.password = password
	}

	static storeAccount({ firstName, lastName, email, password }) {
		return new Promise((resolve, reject) => {
			const hash = bcrypt.hashSync(password, 10)
			pool.connect((err, client, release) => {
				client.query(
					`INSERT INTO
           account("firstName", "lastName", email, password)
           VALUES($1,$2,$3,$4)`,
					[firstName, lastName, email, hash],
					(err, res) => {
						if (err) return reject(err)
						console.log(res.rows)
						resolve()
					}
				)
				client.release()
			})
		})
	}

	static getAccount({ email }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT id, "firstName", "lastName", password FROM ACCOUNT
        WHERE email=$1`,
				[email],
				(err, res) => {
					if (err) return reject(err)
					resolve({ account: res.rows[0] })
				}
			)
		})
	}
}

// Account.getAccount({
// 	email: 'd@d.com'
// })
// 	.then(({ account }) => console.log(account))
// 	.catch(err => console.log(err))
