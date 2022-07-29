import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from 'src/app/models/comment';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { 

   
  }

  getAllComments(){
    return this.http.get('http://localhost:3000/comments');
  }
  addComment(c:any): Observable<any>{

    return this.http.post('http://localhost:3000/comments/add',c);
  }

  getcommentsbypostid(id:any){
    return this.http.get('http://localhost:3000/comments/sarticle/'+id);
  }

  deletecomment(id:any): Observable<any>{
    return this.http.delete('http://localhost:3000/comments/delete/'+id);

  }

  updatecomment(id:any,c:any): Observable<any>{

    return this.http.put('http://localhost:3000/comments/update/'+id,c);
  }

  likecomment(id:any): Observable<any>{
    return this.http.get('http://localhost:3000/comments/like/'+id)
  }

  dislikecomment(id:any): Observable<any>{
    return this.http.get('http://localhost:3000/comments/dislike/'+id)
  }




}
