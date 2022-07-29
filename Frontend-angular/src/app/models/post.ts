import {UserModel} from "./user";
import { CommentModel } from "./comment";

export class PostModel{
   
  title!: string;
  content!: string;
  created!: Date;
  comments!: CommentModel[];
  author!: UserModel;
  likes!: number;
  image!: string;
  
}