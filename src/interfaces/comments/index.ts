import { IPost } from "../posts";
import { IUser } from "../users";

export interface IComment {
  id: string;
  posts: IPost[];
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentRequest {
  userId: string;
  postId: string;
  text: string;
}

export interface ICommentUpdate {
  userId: string;
  commentId: string;
  text: string;
}
