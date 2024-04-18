let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let chatCollection = new Schema({
    chats:{
        type: [{
            username:{
                type: String,
                // required: true
            },
            message:{
                type:String,
                required:false
            }
        }],
        default:[]
    },
    username:{
        type:String,
        required:true
    },
    message_user:{
        type: String,
        required:true
    }
},
    {
        timestamps:true
    }
);

module.exports = mongoose.model('CHATS',chatCollection);