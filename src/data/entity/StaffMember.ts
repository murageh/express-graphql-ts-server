import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class StaffMember {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    efficiency!: number;

    @Column()
    nps!: number;

    @Column()
    efficiencyDelta!: number;

    @Column()
    reportedIssues!: number;
}