import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Unique,
} from 'typeorm';

@Entity()
export default class EmailTemplate {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({
		type: 'varchar',
		nullable: false,
		unique: true
	})
	name?: string;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	subject?: string;

	@Column({
		type: 'text',
		nullable: false,
	})
	html?: string;

	@Column({
		type: 'text',
		nullable: false,
	})
	txt?: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt?: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt?: Date;
}
