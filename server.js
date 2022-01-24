if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

//importing modules
const express = require('express')
const app = express()
const path = require('path')
const request = require('request')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const { v4:uuid } = require('uuid');
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
	passport, 
	username => users.find(user => user.username === username),
	id => users.find(user => user.id === id)
	)

const users = [];

app.set('view engine', 'ejs')
app.set('views', './views');
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', (req,res) => {
	res.render('index.ejs', {name: 'req.user.username'})
})

app.get('/login', (req, res) => {
	res.render('login')
})

app.post('/login', passport.authenticate('local', {
	successRedirect: '/game',
	failureRedirect: '/login',
	failureFlash: true
}));

app.get('/register', (req, res) => {
	res.render('register')
})

app.post('/register', async (req, res) => {
	try {
		const hashedPass = await bcrypt.hash(req.body.password, 10)
		users.push({
			id: uuid(),
			username: req.body.username,
			email: req.body.email,
			password: hashedPass
		})
		res.redirect('/login')
	} catch {
		res.redirect('/')
	}
	console.log(users)
})
	  

app.get('/game', (req, res) => {
	res.render('suit')
})


const PORT = 3000;

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})

