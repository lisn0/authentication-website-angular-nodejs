var express = require('express');
var Post = require('../models/post');
const { post } = require('./comments');
var router = express.Router();
var multer = require("multer");
var fs = require ('fs');
var nodemailer= require('nodemailer');




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







var type=upload.single('file');
router.get('/', function(req, res) {
    Post.find((err , data)=>{
      
   
        if(err) throw err;
        res.json(data);

    })
    .populate('author')
    .populate('comments')
   
    
  
});

router.post("/add",type, (req, res) => {


 
    
     var newPost= new Post({
      title : req.body.title,
      content :req.body.content,
      created : req.body.created,
      author : req.body.author,
      likes : req.body.likes,
      comments: req.body.comments,
      liked : req.body.liked,
     
      });

     
      if (req.file){
        newPost.image=req.file.filename;
      }
  

    newPost
    
      .save()
      .then(() => res.json("New Post created!"))
      .catch(err => res.status(400).json("Error: " + err))

    

  })




router.delete('/delete/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id).then((post) => {
        if (!post) {
            return res.status(404).send();
        }
     
        res.send(post);
        
    }).catch((error) => {
        res.status(500).send(error);
    });
});


router.put('/update/:id', (req, res) => {
    const {id: _id} = req.params 
    const{title}=req.body
    const {content} = req.body
    const {created} = req.body
    const {author} = req.body
    const {comments}= req.body
    const{image}=req.body
    

    const newPost = {
     _id, 
     
     title,content,created,author,comments,image
    }
  
    Post.findByIdAndUpdate(
      _id,
      newPost,
      (err, updatedPost) => {
        if (err) {
          res.json({
            newPost,
            success: false,
            msg: 'Failed to update Post'
          })
        } else {
          res.json({newPost, success: true, msg: 'Post updated '})
        }
      }
    )
  })

  router.get("/send/mail", (req,res)=>{


    
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodejspidev@gmail.com',
            pass: 'rltxboevprpslhqn' 
    
        }
    });
    
    var mailOptions = {
        from: 'nodejspidev@gmail.com',
        to: 'aziz.ghariani@esprit.tn',
        subject: 'Invitation',
        text: 'Hello! you have a notification!'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

 

  }),


module.exports = router;
