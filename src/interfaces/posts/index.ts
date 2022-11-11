import { IComment } from "../comments";
import { ILike } from "../likes";
import { IUser } from "../users";

export interface IPost {
  id: string;
  likes: ILike[];
  comments: IComment[];
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  image: string | null;
}

export interface IPostRequest {
  text: string;
  image?: string;
}
