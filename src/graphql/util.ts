import moment from 'moment';
import { groupBy } from "graphql/jsutils/groupBy";

// Helper function to calculate percentage delta
const calculateDelta = (current: number, previous: number) => {
    if (previous === 0) return 100; // Avoid division by zero
    return ((current - previous) / previous) * 100;
};

// Helper function to group data based on the period and compute aggregates
const groupDataByPeriod = (data: any[], period: string) => {
    const groupedData = groupBy(data, (entry) => {
        if (period === '5yrs') {
            return `${moment(entry.date).format('YYYY')} - ${moment(entry.date).add(5, 'years').format('YYYY')}`;
        }
        if (period === 'year') {
            return moment(entry.date).format('YYYY');
        }
        if (period === 'week') {
            return `Week ${moment(entry.date).week()} of ${moment(entry.date).format('YYYY')}`;
        }
        if (period === 'month') {
            return moment(entry.date).format('MMMM YYYY');
        }
        return moment(entry.date).format('YYYY-MM-DD'); // Default to individual dates
    });

    const labels = Array.from(groupedData.keys());
    const dataToReturn = labels.map(label => {
        const entries = groupedData.get(label) || [];
        const sum = entries.reduce((acc, entry) => acc + entry.value, 0);
        return sum; // Sum of each grouped period as data points
    });

    // Calculate overall aggregates
    // handle cases where there is no data (dataToReturn.length = 0)
    const totalSum = dataToReturn.reduce((acc, curr) => acc + curr, 0);
    const avg = dataToReturn.length > 0 ? totalSum / dataToReturn.length : 0;
    const min = dataToReturn.length > 0 ? Math.min(...dataToReturn) : 0;
    const max = dataToReturn.length > 0 ? Math.max(...dataToReturn) : 0;
    const count = dataToReturn.length;

    // Delta calculation (comparing last sum with second-to-last)
    const delta = dataToReturn.length < 1 ? 0 :
        calculateDelta(dataToReturn[dataToReturn.length - 1], dataToReturn[dataToReturn.length - 2]);

    const agg = {
        sum: totalSum,
        avg,
        min,
        max,
        count,
        delta: isNaN(delta) ? 0 : delta
    };

    console.log({labels, agg});

    return {
        labels,
        data: dataToReturn,
        aggregate: agg
    };
};

export default groupDataByPeriod;
