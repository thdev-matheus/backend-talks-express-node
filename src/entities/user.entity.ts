import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comment } from "./comment.entity";
import { Post } from "./post.entity";
import { v4 as uuid } from "uuid";
import { Like } from "./like.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "varchar", length: 15, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 15, nullable: false })
  lastName: string;

  @Column({ type: "varchar", length: 45, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  @Exclude()
  password: string;

  @Column({ type: "varchar", length: 1000, nullable: false })
  bio: string;

  @Column({ type: "date", nullable: false })
  birthdate: Date;

  @Column()
  profileImage: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false }) // ficará true quando o user verificar o email.
  isVerified: boolean;

  @Column({ type: "boolean", default: false })
  isAdm: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
