import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity()
export class Comment {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne((type) => Post, (post) => post.comments, {
    nullable: false,
    cascade: true,
  })
  @JoinColumn()
  @Exclude()
  post: Post;

  @ManyToOne((type) => User, { nullable: false, eager: true })
  @JoinColumn()
  user: User;

  @Column({ type: "varchar", nullable: false })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
