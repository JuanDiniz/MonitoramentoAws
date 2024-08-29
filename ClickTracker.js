import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClickTracker = () => {
    const [clicks, setClicks] = useState([]);

    useEffect(() => {
        // Simular a obtenção de dados de cliques
        const getClicks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/clicks');
                setClicks(response.data);
            } catch (error) {
                console.error('Error fetching clicks:', error);
            }
        };

        getClicks();
    }, []);

    return (
        <div>
            <h1>Cliques Registrados</h1>
            <ul>
                {clicks.map((click, index) => (
                    <li key={index}>{click.link} - {new Date(click.timestamp).toLocaleString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default ClickTracker;