import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id_user: string;

    @Column('int', {
        unique: true,
    })
    id: number;

    @Column('character varying')
    login: string;

    @Column({
        type: 'text',
        nullable: true
    })
    avatar_url: string;

}
