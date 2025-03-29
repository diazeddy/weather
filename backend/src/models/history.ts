interface Filter {
    city: string;
    country?: string;
}

const filterHistory: Filter[] = [];

export const addToHistory = (filter: Filter) => {
    filterHistory.push(filter);
};

export const getFilterHistory = () => {
    return filterHistory;
};