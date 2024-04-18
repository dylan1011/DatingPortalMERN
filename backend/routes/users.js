var express = require('express');
var router = express.Router();
let model_user = require('../models/user.model');
const authenticateUser = require('../authentication/authMiddleware');
const {secretKey} = require('../authentication/config')
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.render('Users', { title: 'Express' });
});

router.post('/signup', async function(req, res, next) {
    // res.render('index', { title: 'Express' });
    let username = req.body.username;
    let password = req.body.password;
    let emailId = req.body.emailId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phoneNo = req.body.phoneNo;
    let country = req.body.country;
    let state = req.body.state;
    let city = req.body.city;
    let chats = req.body.chats;
    let dob = req.body.dob;
    console.log({username, password, emailId, firstName, lastName, phoneNo, country, state, city, chats, dob});
    let userDetails = await model_user.create({username, password, emailId, firstName, lastName, phoneNo, country, state, city, chats, dob});
    console.log({userDetails});
    res.json({userDetails});
  });

// router.get('/signup', function(req, res, next) {
//     // res.render('index', { title: 'Express' });

// });

router.post('/login', async function(req, res, next) {
    // res.render('index', { title: 'Express' });
    // const {username, password} = req.body;
  let username = req.body.username;
  let password = req.body.password;

  // Validating user Credentials
  if (!username || !password){
    return res.status(400).json({message: 'Please provide both credentials.'});
  }

  // Finding the user in the signup database
  // const user = await model_user.find(u => u.username === username && u.password === password);
  let user = await model_user.findOne({username: username, password: password});
  if (!user){
    return res.status(401).json({message: 'Invalid Credentials.'});
  }

  // Creating a JWT token
  const token = jwt.sign({user: {username: user.username, useremail: user.emailId}}, secretKey);
  console.log(token,secretKey);
  res.json({token});
});


router.get('/login', authenticateUser,async function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.json({user: req.user, message: "Acess granted to this protected route"}); 
});

router.put('/signup', async function(req,res,next){
  let username = req.body.username;
  let password = req.body.password;
  let updated_user = await model_user.findOneAndUpdate({username:username},{password: password},{new:true});
  console.log("updated password ", updated_user);
  res.json({updated_user});
})

module.exports = router;