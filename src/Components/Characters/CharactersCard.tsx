import type {  ICharacter  } from '../../Types/api';

interface CharacterCardProps{
    character: ICharacter;
}

export const CharacterCard = ({ character }: CharacterCardProps) => (
    <div className="card">
        <img src={character.image} alt={character.name} />
        <h2>{character.name}</h2>
        <p>Status: {character.status}</p>
        <p>Espécie: {character.species}</p>
    </div>
);


