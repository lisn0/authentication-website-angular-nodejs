import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from '../models/post';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) {
   }

   getAllPosts(){
    return this.http.get('http://localhost:3000/posts');
  }

   deletePost(id:any): Observable <any> {
    return this.http.delete("http://localhost:3000/posts/delete/"+id);
  }
 
  addPost(p:any): Observable <any>{
    return this.http.post('http://localhost:3000/posts/add',p);
  }

  updatePost(id:any,p:any): Observable <any>{
   return this.http.put("http://localhost:3000/posts/update/"+id,p);
  }

  likePost(id:any): Observable<any>{
    return this.http.get('http://localhost:3000/posts/like/'+id);
  }

  dislikePost(id:any): Observable<any>{
    return this.http.get('http://localhost:3000/posts/dislike/'+id);
  }

  searchPost(key:any): Observable<any>{
    return this.http.get('http://localhost:3000/posts/search/'+key);

  }

  apigoogle(): Observable<any>{
    return this.http.get('http://localhost:3000/api/');
  }

  showoneuser(id:any): Observable<any>{
    return this.http.get('http://localhost:3000/users/show/'+id);

  }

  getallcomments() : Observable<any>{
    return this.http.get('http://localhost:3000/comments/');

  }

  mail(){
    return this.http.get('http://localhost:3000/posts/send/mail');

  }



}
