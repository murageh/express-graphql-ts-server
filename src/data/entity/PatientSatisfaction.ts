import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PatientSatisfaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date; // Or string

    @Column()
    value!: number;
}