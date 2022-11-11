import { IPost } from "../posts";

export interface IUser {
  id: string;
  posts: IPost[];
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthdate: Date;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  profileImage: string;
  isActive: boolean;
  isAdm: boolean;
  isVerified: boolean;
}

export interface IUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthdate: string;
  bio: string;
}

export interface IUserTokenRequest {
  token: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  firstName?: string;
  lastName?: string;
  password?: string;
  birthdate?: string;
  profileImage?: string;
  bio?: string;
  oldPassword: string;
}
