
var Comment = require("../models/comment");

var CommentController={

    

    Search: async(req,res)=>{
        let result = await Comment.find({
            "$or":[
    
                {article: {$regex: req.params.key}
    
    
                }
            ]
        });



    },

findCommentsbyarticle: async(req,res)=>{
    const foundcomment = await Comment.find({id : req.params.article});
    res.json(foundcomment);





},


Like: async (req,res)=>{
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            console.log(err);
            return res.status(500).send('Something went wrong!'); // You should notify user about any error    
        } else {
            comment.like += 1;
            comment.liked=true;
           
            comment.save(function(err){
            if(err) return res.status(500).send('Something went wrong!');
            return res.send({likes_count: comment.like});
            });
  
        }
    });
},


Dislike: async(req,res)=>{
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            console.log(err);
            return res.status(500).send('Something went wrong!'); // You should notify user about any error    
        } else {
           comment.like -= 1;
           comment.liked=false;
            
           
            comment.save(function(err){
            if(err) return res.status(500).send('Something went wrong!');
            return res.send({likes_count: comment.like});
            });
  
        }
    });

    


},

}

module.exports= CommentController;