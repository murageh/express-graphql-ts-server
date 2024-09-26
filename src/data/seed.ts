import 'reflect-metadata';
import {myDataSource} from "./app-data-source";
import {Incident} from "./entity/Incident";
import {StaffMember} from "./entity/StaffMember";
import {FootFall} from "./entity/FootFall";
import {PatientSatisfaction} from "./entity/PatientSatisfaction";
import {Revenue} from "./entity/Revenue";

myDataSource
    .initialize()
    .then(async connection => {
        const incidentRepository = myDataSource.getRepository(Incident);
        const staffMemberRepository = myDataSource.getRepository(StaffMember);
        const footFallRepository = myDataSource.getRepository(FootFall);
        const patientSatisfactionRepository = myDataSource.getRepository(PatientSatisfaction);
        const revenueRepository = myDataSource.getRepository(Revenue);

        // Seed Incidents
        const incidents: Incident[] = [
            {id: 100, patientName: 'John Doe', incidentType: 'Wrong Prescription', date: new Date('2023-09-20')},
            {id: 101, patientName: 'Jane Smith', incidentType: 'Opened Late', date: new Date('2023-09-15')},
            // ... add more incidents
        ];
        await incidentRepository.save(incidents);

        // Seed Staff Members
        const staffMembers: StaffMember[] = [
            {id: 100, name: 'Alice', efficiency: 0.8, nps: 0.9, efficiencyDelta: 0.1, reportedIssues: 0},
            {id: 101, name: 'Bob', efficiency: 0.6, nps: 0.5, efficiencyDelta: -0.2, reportedIssues: 2},
            // ... add more staff members
        ];
        await staffMemberRepository.save(staffMembers);

        // Seed Foot Fall Data
        const footFallData: FootFall[] = [
            {id: 100, date: new Date('2023-01-01'), value: 13000},
            {id: 101, date: new Date('2023-02-01'), value: 12500},
            {id: 102, date: new Date('2023-03-01'), value: 13500},
            {id: 103, date: new Date('2023-04-01'), value: 12800},
            // ... add more foot fall data
        ];
        await footFallRepository.save(footFallData);

        // Seed Patient Satisfaction Data
        const patientSatisfactionData: PatientSatisfaction[] = [
            {id: 100, date: new Date('2023-01-01'), value: 7.5},
            {id: 101, date: new Date('2023-02-01'), value: 7.8},
            {id: 102, date: new Date('2023-03-01'), value: 7.2},
            {id: 103, date: new Date('2023-04-01'), value: 7.6},
            // ... add more patient satisfaction data
        ];
        await patientSatisfactionRepository.save(patientSatisfactionData);

        // Seed Revenue Data
        const revenueData: Revenue[] = [
            {id: 100, date: new Date('2023-01-01'), value: 4.2},
            {id: 101, date: new Date('2023-02-01'), value: 4.1},
            {id: 102, date: new Date('2023-03-01'), value: 4.3},
            {id: 103, date: new Date('2023-04-01'), value: 4.0},
            // ... add more revenue data
        ];
        await revenueRepository.save(revenueData);

        console.log('Database seeded!');
        await connection.destroy();
    })
    .catch((err: any) => {
        console.error("Error seeding database:", err)
    });
