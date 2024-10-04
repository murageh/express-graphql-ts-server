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
            {id: 102, patientName: 'Alice Johnson', incidentType: 'Bad Reception', date: new Date('2023-09-10')},
            {id: 103, patientName: 'Bob Brown', incidentType: 'Late CheckIn', date: new Date('2023-09-05')},
            {id: 104, patientName: 'Eve White', incidentType: 'Careless Notes', date: new Date('2023-09-01')},
            {id: 105, patientName: 'Charlie Black', incidentType: 'Wrong Prescription', date: new Date('2023-08-20')},
            {id: 106, patientName: 'David Green', incidentType: 'Opened Late', date: new Date('2023-08-15')},
            {id: 107, patientName: 'Frank Blue', incidentType: 'Bad Reception', date: new Date('2023-08-10')},
            {id: 108, patientName: 'Grace Red', incidentType: 'Late CheckIn', date: new Date('2023-08-05')},
            {id: 109, patientName: 'Heather Yellow', incidentType: 'Careless Notes', date: new Date('2023-08-01')},
            {id: 110, patientName: 'Ivy Orange', incidentType: 'Wrong Prescription', date: new Date('2023-07-20')},
            {id: 111, patientName: 'Jack Purple', incidentType: 'Opened Late', date: new Date('2023-07-15')},
            {id: 112, patientName: 'Kelly Pink', incidentType: 'Bad Reception', date: new Date('2023-07-10')},
        ];
        await incidentRepository.save(incidents);

        // Seed Staff Members
        const staffMembers: StaffMember[] = [
            {id: 100, name: 'Alice', efficiency: 0.8, nps: 0.9, efficiencyDelta: 0.1, reportedIssues: 0},
            {id: 101, name: 'Bob', efficiency: 0.6, nps: 0.5, efficiencyDelta: -0.2, reportedIssues: 2},
            {id: 102, name: 'Charlie', efficiency: 0.7, nps: 0.8, efficiencyDelta: 0.1, reportedIssues: 1},
            {id: 103, name: 'David', efficiency: 0.9, nps: 0.7, efficiencyDelta: -0.2, reportedIssues: 2},
            {id: 104, name: 'Eve', efficiency: 0.5, nps: 0.6, efficiencyDelta: 0.1, reportedIssues: 1},
        ];
        await staffMemberRepository.save(staffMembers);

        // Seed Foot Fall Data
        const footFallData: FootFall[] = [
            {id: 100, date: new Date('2023-01-01'), value: 13000},
            {id: 101, date: new Date('2023-02-01'), value: 12500},
            {id: 102, date: new Date('2023-03-01'), value: 13500},
            {id: 103, date: new Date('2023-04-01'), value: 12800},
            {id: 104, date: new Date('2023-05-01'), value: 13200},
            {id: 105, date: new Date('2023-06-01'), value: 13000},
        ];
        await footFallRepository.save(footFallData);

        // Seed Patient Satisfaction Data
        const patientSatisfactionData: PatientSatisfaction[] = [
            {id: 100, date: new Date('2023-01-01'), value: 7.5},
            {id: 101, date: new Date('2023-02-01'), value: 7.8},
            {id: 102, date: new Date('2023-03-01'), value: 7.2},
            {id: 103, date: new Date('2023-04-01'), value: 7.6},
            {id: 104, date: new Date('2023-05-01'), value: 7.4},
            {id: 105, date: new Date('2023-06-01'), value: 7.3},
            {id: 106, date: new Date('2023-07-01'), value: 7.7},
            {id: 107, date: new Date('2023-08-01'), value: 7.9},
            {id: 108, date: new Date('2023-09-01'), value: 7.8},
            {id: 109, date: new Date('2023-10-01'), value: 7.6},
            {id: 110, date: new Date('2023-11-01'), value: 7.5},
        ];
        await patientSatisfactionRepository.save(patientSatisfactionData);

        // Seed Revenue Data
        const revenueData: Revenue[] = [
            {id: 100, date: new Date('2023-01-01'), value: 4.2},
            {id: 101, date: new Date('2023-02-01'), value: 4.1},
            {id: 102, date: new Date('2023-03-01'), value: 4.3},
            {id: 103, date: new Date('2023-04-01'), value: 4.0},
            {id: 104, date: new Date('2023-05-01'), value: 4.2},
            {id: 105, date: new Date('2023-06-01'), value: 4.1},
        ];
        await revenueRepository.save(revenueData);

        console.log('Database seeded!');
        await connection.destroy();
    })
    .catch((err: any) => {
        console.error("Error seeding database:", err)
    });
