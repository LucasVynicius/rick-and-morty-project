import type { ICharacter } from '../../Types/api';
import {Link} from 'react-router-dom';

interface CharacterCardProps {
    character: ICharacter;
}

export const CharacterCard = ({ character }: CharacterCardProps) => (
    <Link to={`/characters/${character.id}`} className="card">
        <img src={character.image} alt={character.name} />
        <div className="card-content">
            <h2>{character.name}</h2>
            <p>Status: {character.status}</p>
            <p>Espécie: {character.species}</p>
        </div>
    </Link>
);


