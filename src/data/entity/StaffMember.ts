import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class StaffMember {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("double precision")
    efficiency!: number;

    @Column("double precision")
    nps!: number;

    @Column("double precision")
    efficiencyDelta!: number;

    @Column()
    reportedIssues!: number;
}