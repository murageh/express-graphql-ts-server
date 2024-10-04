import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Revenue {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date; // Or string

    @Column("double precision")
    value!: number;
}