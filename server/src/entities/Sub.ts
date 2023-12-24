import { Expose } from "class-transformer";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import BaseEntity from "./Entity";
import { User } from "./User";
import Post from "./Post";

@Entity("subs")
export default class Sub extends BaseEntity {
  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Column({ nullable: true })
  bannerUrn: string;

  @Column()
  username: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];

  @Expose()
  get imageUrl(): string {
    return this.imageUrn
      ? `http://localhost:4000/images/${this.imageUrn}`
      : "https://www.gravatar.com/avatar?d=mp&f=y";
  }

  @Expose()
  get bannerUrl(): string {
    return this.bannerUrn
      ? `http://localhost:4000/images/${this.bannerUrn}`
      : undefined;
  }
}
