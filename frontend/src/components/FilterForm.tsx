import React, { useState } from 'react';

interface FilterFormProps {
    onSubmit: (filter: { city: string; country?: string }) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onSubmit }) => {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ city, country: country || undefined });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (required)"
                required
            />
            <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country (optional)"
            />
            <button type="submit">Get Weather</button>
        </form>
    );
};

export default FilterForm;