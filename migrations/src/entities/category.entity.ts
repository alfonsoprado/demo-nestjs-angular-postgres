import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 100, unique: true })
  name?: string;

  @CreateDateColumn({
    nullable: false
  })
  created_at?: Date;

  @UpdateDateColumn({
    nullable: false
  })
  updated_at?: Date;

  @OneToMany(() => Post, (post) => post.category)
  posts?: Post[];
}
