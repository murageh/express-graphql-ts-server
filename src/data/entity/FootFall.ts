import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class FootFall {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date; // Or string, depending on how you store the time period

    @Column("double precision")
    value!: number;
}