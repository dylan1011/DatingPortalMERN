let model_user = require('../models/user.model');
// let model_profile = require('../models/user_profile.model');

var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authenticateUser = require('../authentication/authMiddleware');
const {secretKey} = require('../authentication/config');
var express = require('express');
var router = express.Router();

const matchingUsers = async(minAge,maxAge)=>{
    const users = await model_user.aggregate([
        {
            $addFields:{
                age:{
                    $subtract:[
                        {$year: new Date()},
                        {$year: '$dob'}
                    ]
                }
            }
        },
        {
            $match:{
                age: {$gte: parseInt(minAge),$lte: parseInt(maxAge)}
            }
        }
    ]);
    console.log(users);
    return users;
}

router.get('/',async function(req,res,next){
    let minAge = req.body.minAge;
    let maxAge = req.body.maxAge;
    let matched_dates = (await matchingUsers(minAge,maxAge)).map((dates)=> dates.username);
    console.log({matched_dates});
    res.json({matched_dates});
});

// .filter(dates => dates.user_name !== user_matchingModel.user_name).

module.exports = router;