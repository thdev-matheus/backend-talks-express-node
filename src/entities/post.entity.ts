import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Comment } from "./comment.entity";
import { Like } from "./like.entity";
import { User } from "./user.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Post {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => User, { eager: true, nullable: false })
  @JoinColumn()
  user: User;

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany((type) => Like, (like) => like.post)
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column("varchar", { nullable: false })
  text: string;

  @Column({ nullable: true })
  image: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
