import { Post } from './post.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import User from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  created_by?: string;

  @Column()
  post_id?: string;

  @Column({ type: 'text' })
  text?: string;

  @CreateDateColumn({
    nullable: false
  })
  created_at?: Date;

  @UpdateDateColumn({
    nullable: false
  })
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  user?: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post?: Post;
}
