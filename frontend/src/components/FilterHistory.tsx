import React from 'react';

interface Filter {
    city: string;
    country?: string;
}

interface FilterHistoryProps {
    history: Filter[];
}

const FilterHistory: React.FC<FilterHistoryProps> = ({ history }) => {
    return (
        <div className="filter-history">
            <h2>Filter History</h2>
            <ul>
                {history.map((filter, index) => (
                <li key={index}>
                    {filter.city}{filter.country ? `, ${filter.country}` : ''}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterHistory;