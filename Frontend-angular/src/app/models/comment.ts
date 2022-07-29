import {UserModel} from "./user";
import { PostModel } from "./post";

export class CommentModel{
  article!: PostModel;
  comment!: string;
  author!: UserModel;
  created!: Date;
  like!: number;
  imageC!:string;
 
}