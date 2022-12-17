const express = require('express')
const hbs = require('hbs')
const path = require('path')

// any new lib import goes above this app initialization
const app = express()
const port = process.env.PORT || 3000

const publicpath = path.join(__dirname, './public');
app.use(express.static(publicpath));

const templatePath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')
app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialsPath)

app.get('/', (req,res)=>{
    res.render('login')
})

app.get('/register', (req,res)=>{
    res.render('registration')
})

app.listen(port)