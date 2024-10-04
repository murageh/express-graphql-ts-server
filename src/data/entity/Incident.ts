import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IncidentType} from "./utils";

@Entity()
export class Incident {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    patientName!: string;

    @Column("varchar")
    incidentType!: IncidentType;

    @Column("date")
    date!: Date;
}