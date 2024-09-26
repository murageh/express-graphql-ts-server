import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Revenue {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date; // Or string

    @Column()
    value!: number;
}