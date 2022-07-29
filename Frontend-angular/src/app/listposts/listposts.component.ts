import { Component,Input,EventEmitter, OnInit, Output, ɵNG_ELEMENT_ID } from '@angular/core';
import { Router } from '@angular/router';
import { id } from 'date-fns/locale';
import { PostModel } from '../models/post';

import { CommentService } from '../services/comments/comment.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-listposts',
  templateUrl: './listposts.component.html',
  styleUrls: ['./listposts.component.css']
})
export class ListpostsComponent implements OnInit {
  list!:any;
  idp:any;
  key!:any;
  userId="62e23d5fdd8cdd94bdcbd635";
  firstname:any;
  lastname:any;
  post:any;
  l:any;
  c:any;
  listA:any;
  listB:any;
  isEmojiPcikerVisible:any;

 

  
  

  articleID="62d8511ef5005d6a4be0a35e";
  


  id='';
  title='';
  content='';
  count=0;

  comment='';

  images:any;
  imgFile='';
  co='';


  

  

 





  constructor(private service:PostService,private route:Router,private serviceA:CommentService) { }

  ngOnInit(): void {

    this.service.getAllPosts().subscribe(
      (d)=>{
        this.list=d;
        
      }
    

      
    );

     this.service.getallcomments().subscribe((b)=>{
      this.listB=b;
      console.log(this.listB)
      
     })


   
  

  

    

   
    
  }


  addEmoji($event:any){
    this.co= this.co + $event.emoji.native;
    this.isEmojiPcikerVisible=false;

  }

  OnselectImage(event:any) {
    const reader = new FileReader();
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
  
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imgFile= reader.result as string;
      };
    }
  }
  
  items: number[] = [1];
  copy() {
    this.items.push(this.items.length + 1)
  }
  

  like(e:any){
   
    e.likes+=1;
   
    
    window.location.reload();
    this.service.likePost(e._id).subscribe(
      res =>{
        
      })
  }

  dislike(e:any){
   
    e.likes-=1;
    
   
    window.location.reload();
    this.service.dislikePost(e._id).subscribe(
      () =>{
      
        
       
       
       
      });
  }

  searchpost(key:any){
    this.service.searchPost(key).subscribe(()=>{
      alert('searching');
      console.log("aaaaaaaaaaaaaaaaaaaaa")
    
    }


    );
  }

  deletePost(e:any){
    
    this.service.deletePost(e._id).subscribe(res =>{

    
    window.location.reload();
  
    });
  }

  getdata(id:any){
    this.id=id;
    console.log(this.id);
    return this.id;

  }

  updatepost(f:any){
    let data=f.value;
   this.service.updatePost(this.id,data).subscribe(res=>{
 this.title=data.title;
 this.content=data.content;

 window.location.reload();


   })
    






  }

  getuser(u:any){
  this.service.showoneuser(u._id).subscribe(res=>{


  })

  }

  

  addc(f:any){
    f.author= this.userId;
    f.like=0;
    f.article=this.id;

    var formdata= new FormData();
    formdata.append('author',f.author);
    formdata.append('article',f.article);
    formdata.append('like',f.like);
    formdata.append('file',this.images);
    formdata.append('comment',f.comment);
  
  
   console.log(formdata);


    this.serviceA.addComment(formdata).subscribe(
      

      ()=>{
        
        window.location.reload();
       
        
      }
    )
  }

      
  
getallcomments(id:any){
  this.serviceA.getcommentsbypostid(this.articleID).subscribe((b)=>{
    this.listB=b;
    console.log(this.listB)
  })

}

deletecomment(e:any){
 this.serviceA.deletecomment(e._id).subscribe(res=>{

  window.location.reload();


 })

}


updateComment(form:any){


  let data=form.value;
  this.serviceA.updatecomment(this.id,data).subscribe(res=>{
  this.comment=data.comment;


window.location.reload();


  })
   

}


likec(e:any){
   
  e.like+=1;
 
  
  window.location.reload();
  this.serviceA.likecomment(e._id).subscribe(
    res =>{
      
    })
}


dislikec(e:any){
   
  e.like-=1;
  
 
  window.location.reload();
  this.serviceA.dislikecomment(e._id).subscribe(
    res =>{
    
      
     
     
     
    });
}


contact(){
  alert("this post author was sent a mail notification");
  this.service.mail().subscribe(res=>{


   
  }
  )
}





}
