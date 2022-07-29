import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  userId= "62e23d5fdd8cdd94bdcbd635";
  c='';
  images:any;
  imgFile=''
 
  isEmojiPcikerVisible:any;

  
  
  constructor(private service:PostService,private route:Router) { }

  ngOnInit(): void {


    
     
    
  }


  addpost(f:any){
    f.author= this.userId;
    f.likes=0;
    

    var formdata= new FormData();
    formdata.append('author',f.author);
    formdata.append('likes',f.likes);
    formdata.append('file',this.images);
    formdata.append('title',f.title);
    formdata.append('content', f.content);
    this.service.addPost(formdata).subscribe(

      ()=>{
        
        window.location.reload();
       
        
      }
    )
  }


  addEmoji($event:any){
    this.c= this.c + $event.emoji.native;
    this.isEmojiPcikerVisible=false;

  }

  selectImage(event:any) {
    const reader = new FileReader();
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
  
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imgFile = reader.result as string;
      };
    }
  }
  
  items: number[] = [1];
  copy() {
    this.items.push(this.items.length + 1)
  }

  



}
