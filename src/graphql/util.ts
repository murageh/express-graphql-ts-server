import moment from 'moment';
import {groupBy} from "graphql/jsutils/groupBy";

// Helper function to group data based on the period
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
        const entries = groupedData.get(label);
        return entries ? entries.map(entry => entry.value) : [];
    });

    const flattenedData = dataToReturn.flat();

    return { labels, data: flattenedData };
};

export default groupDataByPeriod;
