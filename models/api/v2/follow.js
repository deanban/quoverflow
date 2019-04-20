const pool = require('../../../pgPool')
// const Account = require('./account')

module.exports = class Follow {
	static followUser({ accountId, accountIdToFollow }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO follow("followingUserId", "followedUserId")
        VALUES($1,$2)`,
				[accountId, accountIdToFollow],
				(err, res) => {
					if (err) return reject(err)
					resolve()
				}
			)
		})
	}

	static findFollowed({ accountId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT "followedUserId" AS followed FROM follow
        WHERE "followingUserId"=$1`,
				[accountId],
				(err, res) => {
					if (err) return reject(err)
					resolve(res.rows)
				}
			)
		})
	}
	static findFollowing({ accountId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`SELECT "followingUserId" AS following FROM follow
        WHERE "followedUserId"=$1`,
				[accountId],
				(err, res) => {
					if (err) return reject(err)
					resolve(res.rows)
				}
			)
		})
	}
}

/***************************************************************
                         DEBUGGER CODES
***************************************************************/

// Follow.followUser({
// 	accountId: 1,
// 	accountIdToFollow: 3
// })

// Follow.findFollowed({ accountId: 1 })
// 	.then(res =>
// 		res.map(({ followed }) =>
// 			Promise.all([Account.getAccountById({ id: followed })])
// 				.then(accounts => accounts.map(({ account }) => console.log(account)))
// 				.catch(err => console.error(err))
// 		)
// 	)
//   .catch(err => console.error(err))

// Follow.findFollowing({ accountId: 2 })
// 	.then(res =>
// 		res.map(({ following }) =>
// 			Promise.all([Account.getAccountById({ id: following })])
// 				.then(accounts => accounts.map(({ account }) => console.log(account)))
// 				.catch(err => console.error(err))
// 		)
// 	)
// 	.catch(err => console.error(err))
