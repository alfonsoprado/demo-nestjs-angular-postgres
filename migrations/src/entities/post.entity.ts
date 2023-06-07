import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './category.entity';
import User from './user.entity';
import { Comment } from './comment.entity';

@Unique(['title', 'category'])
@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  created_by?: string;

  @Column()
  category_id?: string;

  @Column({ length: 255 })
  title?: string;

  @Column({ type: 'text' })
  body?: string;

  @CreateDateColumn({ type: 'timestamp' })
	created_at?: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at?: Date;

  @ManyToOne(() => User, (user) => user.posts, {  eager: true  })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  user?: User;

  @ManyToOne(() => Category, (category) => category.posts, { nullable: true, eager: true })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: Category;

	@OneToMany(() => Comment, (comment) => comment.post)
	comments?: Comment[];
}