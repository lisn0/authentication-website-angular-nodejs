var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
  
   title:{
    type: String,
    trim: true,
    required:'please enter a Title for the Question post!',
   },

   content:{
    type: String,
    trim: true,
    required: "Enter a question content",
   },

   created: {
    type: Date,
    default: Date.now,

   },
    
   comments:[{

    type:mongoose.Schema.Types.ObjectId,
    ref: "comment"
}],


   author:{
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: "Comment should have a valid User",
   },
  
   
likes:{

   type : Number,
  },

  liked:{
   type: Boolean,
  },

  image:{

   type: String,
  }



    



    


    
    
    
})

module.exports = mongoose.model("post", Post);