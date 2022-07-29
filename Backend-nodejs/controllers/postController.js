const { post } = require("../app.js");
var Post = require("../models/post.js");


var PostController = {

getAllComments : async(req,res)=> {
let foundPost = await Post.findOne({id: req.params.id}).populate("comments");
res.json(foundPost);
},

create: async (req,res)=>{
    var newPost= new Post(req.body);
    var savedPost = await newPost.save();
    res.json(savedPost);

},

Like: async (req,res)=>{
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
            return res.status(500).send('Something went wrong!'); // You should notify user about any error    
        } else {
            post.likes += 1;
            post.liked=true;
           
            post.save(function(err){
            if(err) return res.status(500).send('Something went wrong!');
            return res.send({likes_count: post.likes});
            });
  
        }
    });
},

Dislike: async(req,res)=>{
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
            return res.status(500).send('Something went wrong!'); // You should notify user about any error    
        } else {
            post.likes -= 1;
           post.liked=false;
            
           
            post.save(function(err){
            if(err) return res.status(500).send('Something went wrong!');
            return res.send({likes_count: post.likes});
            });
  
        }
    });

    


},

Rate: async(req,res)=>{
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
            return res.status(500).send('Something went wrong!'); // You should notify user about any error    
        } else {
             Post.findOne({_id: req.params._id}).sort({"comments.likes":-1})

              post.save(function(err){
                if(err) return res.status(500).send('Something went wrong!');
            
                return res.send({Comments: post.comments} );
                });
        }


    });
},

Search: async(req,res)=>{
    let result = await Post.find({
        "$or":[

            {title: {$regex: req.params.key}


            }
        ]
    });

    res.send(result);


}
}
module.exports = PostController; 