/*********************REQUIRES*************************/
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const passport = require('passport')
// const path = require('path')

const users = require('./controllers/api/v1/users')
const questions = require('./controllers/api/v1/questions')
const answers = require('./controllers/api/v1/answers')

//passport config
require('./config/passport')(passport)
/*********************REQUIRES*************************/

/*********************SET UPS*************************/
const app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
//passport middleware
app.use(passport.initialize())

app.use('/api/users', users)
app.use('/api/questions', questions)
app.use('/api/answers', answers)
/*********************SET UPS*************************/

/********************DB config*********************/
const db = require('./config/keys').mongoURI
//connect to mongo
mongoose
	.connect(
		db,
		{ useNewUrlParser: true }
	)
	.then(() => console.log('***********DB Connected to mLab***********'))
	.catch(err => console.log(err))
/********************DB config*********************/

/*********************PORT*************************/
const port = process.env.PORT || 3001

app.listen(port, () =>
	console.log(`***********Server Running on Port ${port}***********`)
)
/*********************PORT*************************/
