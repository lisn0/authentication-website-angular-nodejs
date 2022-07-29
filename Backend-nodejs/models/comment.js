var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
  
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: "Comment should have a valid Article",
    },

    comment:{
        type: String,
        trim: true,
        required: "Comment cannot be empty",
    },

    author: { 
        type: mongoose.Schema.ObjectId,
        ref: "user",
        require: "Comment should have a valid User",
},

created: {
    type: Date,
    default: Date.now,
},

like: {
    type: Number,
    min:0
    
},

liked:{
type:Boolean,

},

imageC:{
    type:String,
}

    
    
    
})

module.exports = mongoose.model("comment", Comment);