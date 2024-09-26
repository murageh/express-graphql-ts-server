import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FootFall {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date; // Or string, depending on how you store the time period

    @Column()
    value!: number;
}