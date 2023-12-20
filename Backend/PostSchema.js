const mongoose =require('mongoose');
const Schema = require('./Schema');

const PostSchema =new mongoose.Schema({
    title:{type:String},
    summary:{type:String},
    content:{type:String},
    cover:{type:String},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'registered'},
},{
    timestamps:true,
})

module.exports  = mongoose.model('Post',PostSchema)