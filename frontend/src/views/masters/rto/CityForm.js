
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CityForm = ({ onSelectCity }) => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/cities')
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the cities!', error);
            });
    }, []);

    return (
        <select onChange={e => onSelectCity(e.target.value)}>
            <option value="">Select a city</option>
            {cities.map(city => (
                <option key={city.id} value={city.city_code}>
                    {city.city_name}
                </option>
            ))}
        </select>
    );
};

export default CityForm;
