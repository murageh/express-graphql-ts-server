import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Incident {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    patientName!: string;

    @Column()
    incidentType!: string;

    @Column()
    date!: Date;
}