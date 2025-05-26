const mongoose=require("mongoose");
const Schema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        requied:true
    },
    price:{
        type:Number,
        required:true
    },
    publishedDate:{
        type:Date,
        required:true
    }
});
const Book=mongoose.model('Book',Schema);
module.exports=Book;