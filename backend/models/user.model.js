let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userCollection = new Schema (
    {
        username : {
            type : String,
            required : true
        },

        password : {
            type : String,
            required : true
        },

        emailId : {
            type : String,
            required : true
        },

        firstName : {
            type : String,
            required : true
        },

        lastName : {
            type : String,
            required : true
        },

        profile : {
            type : Schema.Types.ObjectId,
            ref: "PROFILE",
            default: null
        },

        phoneNo : {
            type : Number,
            required : true
        },

        country : {
            type : String,
            required : false
        },

        state : {
            type : String,
            required : false
        },

        city : {
            type : String,
            required : true
        },

        dob : {
            type : Date,
            required : true
        },

        chats : {
            type: [{
                messageUser: {
                    type: String,
                    default: "sender"
                },
                chatId: {
                    type: String, //reference to chats
                    default: "xyz"
                }
            }],
            default : []
        }
        // checkout:{
        //     type: Schema.Types.ObjectId,
        //     ref: 'CHECKOUT',
        //     default: null
        // }
    },
    {timestamps : true}
);

module.exports = mongoose.model("USER", userCollection);