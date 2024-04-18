let model_user = require('../models/user.model');
// let model_cart = require('../models/cart.model');
let model_chat = require('../models/chats.model');
var mongoose = require('mongoose');
var express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authenticateUser = require('../authentication/authMiddleware');
const {secretKey} = require('../authentication/config');
var router = express.Router();


// When the user A coonects with user B call post request
router.post('/', authenticateUser,async function(req,res,next){
    let user = req.user;
    let username = user.username;
    let message_user = req.body.message_user;
    let chats = req.body.chats;
    console.log({username,message_user,chats});
    let user_chat = await model_chat.create({chats,username,message_user});
    console.log({user_chat});
    let chat_details = {
        messageUser: message_user,
        chatId : user_chat._id
    }
    let user_convo1 = await model_user.findOneAndUpdate({username: user.username},{$push:{chats:chat_details}});
    console.log({user_convo1});
    let chat_details1 = {
        messageUser: user.username,
        chatId : user_chat._id
    }
    let user_convo2 = await model_user.findOneAndUpdate({username: message_user},{$push:{chats:chat_details1}});
    console.log({user_convo2});
    res.json({user_chat});
});

// Connected users list
router.get('/chatting', authenticateUser, async function(req,res,next){
    // let messageUser = req.body.messageUser;
    let user = req.user;
    let connected_users = await model_user.findOne({username: user.username}).select('chats');
    console.log({connected_users});
    res.json({connected_users});
});

// users messages
router.get('/user_message',authenticateUser,async function(req,res,next){
    let chatId= req.body.chatId;
    console.log("chat id ",chatId);
    let user_messages = await model_chat.findById(chatId);
    console.log({user_messages});
    res.json({user_messages});
})

// The put request will be called in the input field of the chatting page
router.put('/',authenticateUser,async function(req,res,next){
    let user = req.user;
    let chat_id = req.body.chat_id;
    let username = user.username;
    let message = req.body.message;
    let chats = {
        username: username,
        message: message
    } 
    let user_convo = await model_chat.findByIdAndUpdate(chat_id,{$push:{chats: chats}},{new:true});
    console.log({user_convo});
    res.json({user_convo})
})

module.exports = router;