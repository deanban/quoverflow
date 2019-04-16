/*********************REQUIRES*************************/
const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const passport = require('passport')
// const path = require('path')

const users = require('./controllers/api/v1/users')
const questions = require('./controllers/api/v1/questions')
const answers = require('./controllers/api/v1/answers')

const accounts = require('./controllers/api/v2/account')
const qs = require('./controllers/api/v2/question')
const ans = require('./controllers/api/v2/answer')
const comments = require('./controllers/api/v2/comment')

//passport config
require('./config/passport')(passport)
/*********************REQUIRES*************************/

/*********************SET UPS*************************/
const app = express()

//express recognizes the use of the following four params as
//an error handling function.
//use 'next' in the router files to have those send the errors
//to this middleware.
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500
	res.status(statusCode).json({
		type: 'error',
		message: err.message
	})
})

//cors
app.use(
	cors({
		origin: process.env.CORS_DEV_ORIGIN,
		credentials: true
	})
)

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
//passport middleware
app.use(passport.initialize())

//old routes with mongo
app.use('/api/users', users)
app.use('/api/questions', questions)
app.use('/api/answers', answers)

//new routes with postgres
app.use('/api/accounts', accounts)
app.use('/api/question', qs)
app.use('/api/answer', ans)
app.use('/api/comment', comments)
/*********************SET UPS*************************/

/********************DB config*********************/
const db = require('./config/keys').mongoURI
//connect to mongo
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('***********DB Connected to mLab***********'))
	.catch(err => console.log(err))
/********************DB config*********************/

//server static assets if in production
if (process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

/*********************PORT*************************/
const port = process.env.PORT || 3001

app.listen(port, () =>
	console.log(`***********Server Running on Port ${port}***********`)
)
/*********************PORT*************************/
