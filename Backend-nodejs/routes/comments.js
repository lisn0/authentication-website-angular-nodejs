var express = require('express');

var Comment = require('../models/comment');
var router = express.Router();
var multer = require("multer");
var fs = require ('fs');

const storage= multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,"./public/images");
  
  },

  filename: (req,file,cb)=>{
    const filename=(+ new Date())+"-"+file.originalname;
    cb(null,filename);
  }
  });

 

const upload=multer({storage:storage})







var typeA=upload.single('file');




router.get('/', function(req, res) {
    Comment.find((err , data)=>{
        if(err) throw err;
        res.json(data);

    }).populate('author')
  
});

router.post("/add",typeA, (req, res) => {



  

    const article = req.body.article
    const comment = req.body.comment
    const author  = req.body.author
    const created = req.body.created
    const like = req.body.like
    const liked = req.body.liked
    
  
    
    const newComment= new Comment({
      article,
      comment,
      author,
      created,
      like,
      liked,
      
      
    })

    if (req.file){
      newComment.imageC=req.file.filename;
    }




    newComment
      .save()
      .then(() => res.json("New Comment created!"))
      .catch(err => res.status(400).json("Error: invalid article or user"));

  

  }
    
  
      

      
   

  
  
  

  
  
  )




router.delete('/delete/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id).then((comment) => {
        if (!comment) {
            return res.status(404).send();
        }
        res.send(comment);
    }).catch((error) => {
        res.status(500).send(error);
    });
});


router.put('/update/:id', (req, res) => {
    const {id: _id} = req.params 
    const{article}= req.body
    const {comment} = req.body
    const {author} = req.body
    const {created} = req.body
    const {like}= req.body
    const{imageC}=req.body
    

    const newComment = {
     _id, 
     
    article,comment,author,created,like,imageC
    }
  
    Comment.findByIdAndUpdate(
      _id,
      newComment,
      (err, updatedComment) => {
        if (err) {
          res.json({
            newComment,
            success: false,
            msg: 'Failed to update Comment'
          })
        } else {
          res.json({newComment, success: true, msg: 'Comment updated '})
        }
      }
    )
  })


//router.get("/evaluations/delete:id", deleteEvaluationById);





module.exports = router;


