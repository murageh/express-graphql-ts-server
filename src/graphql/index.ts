import {gql} from "apollo-server";
import {Incident} from "../data/entity/Incident";
import {myDataSource} from "../data/app-data-source";
import {StaffMember} from "../data/entity/StaffMember";

const typeDefs = gql`
    type Incident {
        id: ID!
        patientName: String!
        incidentType: String!
        date: String!
    }

    type StaffMember {
        id: ID!
        name: String!
        efficiency: Float!
        nps: Float!
        efficiencyDelta: Float!
        reportedIssues: Int!
    }

    type Mutation {
        createIncident(patientName: String!, incidentType: String!, date: String!): Incident!
        createStaffMember(name: String!, efficiency: Float!, nps: Float!, efficiencyDelta: Float!, reportedIssues: Int!): StaffMember!
    }


    type Query {
        keyMetrics: [Int!]!
        incidents: [Incident!]!
        footFallData: [Float!]!
        patientSatisfactionData: [Float!]!
        revenueData: [Float!]!
        staffMembers: [StaffMember!]!
    }
`;

const resolvers = () => {
    const incidentRepository = myDataSource.getRepository(Incident);
    const staffMemberRepository = myDataSource.getRepository(StaffMember);

    return ({
        Mutation: {
            createIncident: async (_: any, args: { patientName: string, incidentType: string, date: string }) => {
                const newIncident = incidentRepository.create(args);

                return await incidentRepository.save(newIncident);
            },
            createStaffMember: async (_: any, args: { name: string, efficiency: number, nps: number, efficiencyDelta: number, reportedIssues: number }) => {
                const newStaffMember = staffMemberRepository.create(args);

                return await staffMemberRepository.save(newStaffMember);
            },
        },
        Query: {
            keyMetrics: async () => {
                // Example: Fetch counts of different incident types
                const wrongPrescriptionCount = await incidentRepository.count({ where: { incidentType: 'Wrong Prescription' } });
                const openedLateCount = await incidentRepository.count({ where: { incidentType: 'Opened Late' } });
                const wrongDiagnosisCount = await incidentRepository.count({ where: { incidentType: 'Wrong Diagnosis' } });
                const wrongTreatmentCount = await incidentRepository.count({ where: { incidentType: 'Wrong Treatment' } });
                const wrongSurgeryCount = await incidentRepository.count({ where: { incidentType: 'Wrong Surgery' } });

                return [wrongPrescriptionCount, openedLateCount, wrongDiagnosisCount, wrongTreatmentCount, wrongSurgeryCount];
            },
            incidents: async () => {
                // Fetch incidents from your backend
                return await incidentRepository.find();
            },
            staffMembers: async () => {
                // Fetch staff members from your backend
                return await staffMemberRepository.find();
            },
        },
    });
};

export {typeDefs, resolvers};