import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity()
export class Like {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => Post, (post) => post.likes, {
    nullable: true,
  })
  @Exclude()
  post: Post;

  @ManyToOne((type) => User, { cascade: true, nullable: false })
  @JoinColumn()
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
