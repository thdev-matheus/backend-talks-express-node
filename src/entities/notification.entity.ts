import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity()
export class Notification {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => User, { nullable: false, eager: true })
  @JoinColumn()
  @Exclude()
  ownerUser: User;

  @ManyToOne((type) => User, { nullable: false, eager: true })
  @JoinColumn()
  launcherUser: User;

  @ManyToOne((type) => Post, { nullable: false, eager: true })
  @JoinColumn()
  post: Post;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
