const express = require('express')
const hbs = require('hbs')
const path = require('path')
const bcrypt = require('bcryptjs');
require('./db/conn')
const User =  require('./models/user')

// any new lib import goes above this app initialization
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const publicpath = path.join(__dirname, './public');
app.use(express.static(publicpath));

const templatePath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')
app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialsPath)

//get login page
app.get('/login', (req,res)=>{
    res.render('login')
})


//login into your account
app.post('/login', async(req,res)=>{
    try{
        const email = req.body.email;
        const pass = req.body.password;
        const userEmail = await User.findOne({email:email});
        const isMatch = await bcrypt.compare(pass, userEmail.password);
        if(isMatch){
            console.log(userEmail.fname)
            res.status(200).render('index',{name : userEmail.fname});
        }else{
            res.send("Invalid Credentials");
        }
    }
    catch(e){
        res.send(e)
    }
})

//get index page post login

app.get('/register', (req,res)=>{
    res.render('registration')
})

app.post('/register', async(req,res)=>{
    try{
        password1 = req.body.pass;
        password2 = req.body.cnfpass;
        if(password1 === password2){
            const userData = new User({
                email: req.body.email,
                fname: req.body.fname,
                lname: req.body.lname,
                business: req.body.business,
                password: password1
            });
            const user = await userData.save();
            res.status(200).render('login')
        }
    }
    catch(e){
        res.send(e)
    }
})

app.listen(port)