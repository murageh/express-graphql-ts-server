import {gql} from "apollo-server";
import {Incident} from "../data/entity/Incident";
import {myDataSource} from "../data/app-data-source";
import {StaffMember} from "../data/entity/StaffMember";
import {Revenue} from "../data/entity/Revenue";
import {PatientSatisfaction} from "../data/entity/PatientSatisfaction";
import {FootFall} from "../data/entity/FootFall";
import {Between, LessThanOrEqual, MoreThanOrEqual} from "typeorm";
import {INCIDENT_TYPES, IncidentType} from "../data/entity/utils";
import groupDataByPeriod from "./util";

// type ValidIncidentType = typeof INCIDENT_TYPES[number];

export type Period = 'day' | 'week' | 'month' | 'year' | '5yrs'; // Define a type for the period

type FilterArgs = {
    startDate: string | null,
    endDate: string | null,
    period: Period | null
}

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

    type FootFall {
        id: ID!
        date: String!
        value: Float!
    }

    type PatientSatisfaction {
        id: ID!
        date: String!
        value: Float!
    }

    type Revenue {
        id: ID!
        date: String!
        value: Float!
    }
    
    # KeyMetrics basically extends the ValidIncidentTypes
    type KeyMetrics {
        Wrong_Prescription_Count: Int!
        Opened_Late_Count: Int!
        Wrong_Diagnosis_Count: Int!
        Wrong_Treatment_Count: Int!
        Wrong_Surgery_Count: Int!
        Late_CheckIn_Count: Int!
        Careless_Notes_Count: Int!
        Bad_Reception_Count: Int!
    }

    type Mutation {
        createIncident(patientName: String!, incidentType: String!, date: String!): Incident!
        createStaffMember(name: String!, efficiency: Float!, nps: Float!, efficiencyDelta: Float!, reportedIssues: Int!): StaffMember!
    }


    type Query {
        keyMetrics: KeyMetrics!

        footFallData(startDate: String, endDate: String, period: String): FilteredData!
        patientSatisfactionData(startDate: String, endDate: String, period: String): FilteredData!
        revenueData(startDate: String, endDate: String, period: String): FilteredData!
        
        incidents(incidentType: String, startDate: String, endDate: String): [Incident!]!
        staffMembers(sortBy: String, sortOrder: String): [StaffMember!]!
    }

    type FilteredData {
        labels: [String!]!
        data: [Float!]!
    }
`;

const resolvers = () => {
    const incidentRepository = myDataSource.getRepository(Incident);
    const staffMemberRepository = myDataSource.getRepository(StaffMember);
    const footFallRepository = myDataSource.getRepository(FootFall);
    const patientSatisfactionRepository = myDataSource.getRepository(PatientSatisfaction);
    const revenueRepository = myDataSource.getRepository(Revenue);

    const getWhereClause = (startDate: string|null, endDate: string|null) => {
        const whereClause: any = {};
        if (startDate) {
            whereClause.date = MoreThanOrEqual(startDate);
        }
        if (endDate) {
            whereClause.date = LessThanOrEqual(endDate);
        }
        if (startDate && endDate) {
            whereClause.date = Between(startDate, endDate);
        }

        return whereClause;
    }

    return ({
        Mutation: {
            createIncident: async (_: any, args: { patientName: string, incidentType: IncidentType, date: string }) => {
                if (!INCIDENT_TYPES.includes(args.incidentType)) {
                    throw new Error('Invalid incident type');
                }
                const newIncident = incidentRepository.create(args);

                return await incidentRepository.save(newIncident);
            },
            createStaffMember: async (_: any, args: {
                name: string,
                efficiency: number,
                nps: number,
                efficiencyDelta: number,
                reportedIssues: number
            }) => {
                const newStaffMember = staffMemberRepository.create(args);

                return await staffMemberRepository.save(newStaffMember);
            },
        },
        Query: {
            keyMetrics: async () => {
                console.log('keyMetrics');

                const keyMetrics: any = {};
                for (const type of INCIDENT_TYPES) {
                    const count = await incidentRepository.count({ where: { incidentType: type } });
                    console.log('type:', type, 'count:', count);
                    keyMetrics[`${type.replace(' ', '_')}_Count`] = count;
                }

                console.log('keyMetrics:', keyMetrics);
                return await keyMetrics;
            },

            incidents: async (_: any, args: any) => {
                const { incidentType, startDate, endDate } = args;

                // Build the where clause for filtering
                const whereClause: any = {};
                if (incidentType) {
                    whereClause.incidentType = incidentType;
                }
                if (startDate) {
                    whereClause.date = MoreThanOrEqual(startDate);
                }
                if (endDate) {
                    whereClause.date = LessThanOrEqual(endDate);
                }
                if (startDate && endDate) {
                    whereClause.date = Between(startDate, endDate);
                }

                return await incidentRepository.find({ where: whereClause });
            },

            staffMembers: async (_: any, args: any) => {
                const { sortBy, sortOrder } = args;

                // Build the order clause for sorting
                const orderClause: any = {};
                if (sortBy) {
                    orderClause[sortBy] = sortOrder || 'ASC';
                }

                return await staffMemberRepository.find({ order: orderClause });
            },

            footFallData: async (_: any, args: FilterArgs) => {
                const { startDate='', endDate='', period='month' } = args;

                const whereClause = getWhereClause(startDate, endDate);

                const footFallData = await footFallRepository.find({
                    where: whereClause,
                    order: { date: 'ASC' } // Order by date to ensure the correct label order
                });

                return groupDataByPeriod(footFallData, period!);
            },

            patientSatisfactionData: async (_: any, args: FilterArgs) => {
                const { startDate='', endDate='', period='month' } = args;
                const whereClause = getWhereClause(startDate, endDate);

                const patientSatisfactionData = await patientSatisfactionRepository.find({
                    where: whereClause,
                    order: { date: 'ASC' }
                });

                return groupDataByPeriod(patientSatisfactionData, period!);
            },

            revenueData: async (_: any, args: FilterArgs) => {
                const {startDate = '', endDate = '', period = 'month'} = args;
                const whereClause = getWhereClause(startDate, endDate);

                const revenueData = await revenueRepository.find({
                    where: whereClause,
                    order: {date: 'ASC'}
                });

                return groupDataByPeriod(revenueData, period!);
            }
        },
    });
};

export {typeDefs, resolvers};