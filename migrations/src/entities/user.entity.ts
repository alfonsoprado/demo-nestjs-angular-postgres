import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from './post.entity';

export enum Role {
	Admin = 'admin',
	User = 'user'
}

@Entity()
export default class User {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ type: 'varchar', unique: true })
	username?: string;

	@Column({ type: 'varchar', unique: true })
	email?: string;

	@Column({
		type: 'enum',
		enum: Role,
		nullable: false,
		default: Role.User,
	})
	role?: Role;

	@Column({
		type: 'varchar',
		nullable: true,
		select: false
	})
	password?: string;

	// Timestamp when the account was activated via email, 
	@Column({ type: 'timestamp', nullable: true })
	validated_email_at?: Date;

	@CreateDateColumn({ type: 'timestamp' })
	created_at?: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at?: Date;

	// Timestamp when the account was deactivated, if it's null it means the account is active
	@Column({ type: 'timestamp', nullable: true })
	disabled_at?: Date;

	@OneToMany(() => Comment, (comment) => comment.user)
	comments?: Comment[];

	@OneToMany(() => Post, (post) => post.user)
	posts?: Post[];
}
