export const INCIDENT_TYPES = [
    'Wrong Prescription',
    'Opened Late',
    'Wrong Diagnosis',
    'Wrong Treatment',
    'Wrong Surgery',
    'Late CheckIn',
    'Careless Notes',
    'Bad Reception',
] as const;

export type IncidentType = typeof INCIDENT_TYPES[number];