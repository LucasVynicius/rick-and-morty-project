import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import type { ICharacter, ILocation } from '../../Types/api';

export const LocationDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [location, setLocation] = useState<ILocation | null>(null);
    const [residents, setResidents] = useState<ICharacter[]>([]);

    useEffect(() => {
        axios.get<ILocation>(`https://rickandmortyapi.com/api/location/${id}`)
            .then(async response => {
                const locationData = response.data;
                setLocation(locationData);

                if (locationData.residents.length > 0) {
                    const residentPromises = locationData.residents.map(url => axios.get<ICharacter>(url));
                    const residentResponses = await Promise.all(residentPromises);
                    setResidents(residentResponses.map(res => res.data));
                }
            });
    }, [id]);

    if (!location) return <div>Carregando...</div>;

    return (
        <div className="detail-container">
            <div className='detail-card'>
                <h1>{location.name}</h1>
                <p><strong>Tipo:</strong> {location.type}</p>
                <p><strong>Dimensão:</strong> {location.dimension}</p>

                <h2>Residentes desta localização:</h2>
                {residents.length > 0 ? (
                    <div className='item-grid'>
                        {residents.map(char => (
                            <Link to={`/characters/${char.id}`} className="card" key={char.id}>
                                <img src={char.image} alt={char.name} />
                                <div className="card-content">
                                    <h2>{char.name}</h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum residente conhecido nesta localização.</p>
                )}
            </div>
        </div>
    );
};