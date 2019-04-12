const pool = require('../../../pgPool')

class Category {
	constructor(id, name) {
		this.id = id
		this.name = name
	}

	static storeCategory({ name }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`INSERT INTO category(name)
        VALUES($1)`,
				[name],
				(err, res) => {
					if (err) return reject(err)
					// console.log(res.rows)
					resolve()
				}
			)
		})
	}

	static getCategoryByName({ name }) {
		return new Promise((resolve, reject) => {
			pool.query(
				'SELECT id, name FROM category WHERE name=$1',
				[name],
				(err, res) => {
					if (err) return reject(err)
					resolve({ category: res.rows[0] })
				}
			)
		})
	}

	static getCategoryById({ id }) {
		return new Promise((resolve, reject) => {
			pool.query(
				'SELECT id, name FROM category WHERE id=$1',
				[id],
				(err, res) => {
					if (err) return reject(err)
					resolve({ category: res.rows[0] })
				}
			)
		})
	}

	static getAllCategories() {
		return new Promise((resolve, reject) => {
			pool.query('SELECT * FROM category', (err, res) => {
				if (err) return reject(err)
				resolve({ categories: res.rows })
			})
		})
	}
}

/***************************************************************
                         DEBUGGER CODES
***************************************************************/

Category.storeCategory({ name: 'Technology' })
	.then(() => console.log('success'))
	.catch(err => console.error(err))

// Category.getCategoryById({ id: 2 })
// 	.then(({ category }) => console.log(category))
// 	.catch(err => console.log(err))

// Category.getAllCategories()
//  .then(({ categories }) => console.log(categories))
// 	.catch(err => console.log(err))
