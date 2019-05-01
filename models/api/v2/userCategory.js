const pool = require('../../../pgPool')
const Category = require('./category')

module.exports = class UserCategory {
	static storeUserCategory({ accountId, categoryId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO userCategory("accountId", "categoryId")
        VALUES($1,$2)`,
				[accountId, categoryId],
				(err, res) => {
					if (err) return reject(err)
					resolve()
				}
			)
		})
	}

	static getUserCategories({ accountId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				'SELECT "categoryId" FROM userCategory WHERE "accountId"=$1',
				[accountId],
				(err, res) => {
					if (err) return reject(err)
					resolve({ categories: res.rows })
				}
			)
		})
	}
}

/***************************************************************
                         DEBUGGER CODES
***************************************************************/

// UserCategory.storeUserCategory({
// 	accountId: 10,
// 	categoryId: 3
// })
// 	.then(() => console.log('success'))
// 	.catch(err => console.log(err))

// UserCategory.getUserCategories({
// 	accountId: 3
// })
// 	.then(({ categories }) => {
// 		categories.map(({ categoryId }) => {
// 			Promise.all([
// 				Category.getCategoryById({ id: categoryId }).then(({ category }) =>
// 					console.log(category)
// 				)
// 			])
// 		})
// 	})
// 	.catch(err => console.log(err))

// console.log(
// 	UserCategory.getUserCategories({ accountId: 10 })
// 		.then(({ categories }) => {
// 			categories.map(category => console.log(category.id))
// 		})
// 		.then(category => console.log(category))
