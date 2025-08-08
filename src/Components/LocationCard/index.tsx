import type { ILocation } from '../../Types/api';
import { Link } from 'react-router-dom';

interface LocationCardProps {
  location: ILocation;
}

export const LocationCard = ({ location }: LocationCardProps) => (
    <Link to={`/locations/${location.id}`} className="card">
        <div className="card-content">
            <h2>{location.name}</h2>
            <p>Tipo: {location.type}</p>
            <p>Dimensão: {location.dimension}</p>
        </div>
    </Link>
);