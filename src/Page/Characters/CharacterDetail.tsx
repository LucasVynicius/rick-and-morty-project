import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import type {  ICharacter, IEpisode } from '../../Types/api';

export const CharacterDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<ICharacter | null>(null);
    const [episodes, setEpisodes] = useState<IEpisode[]>([]);

    useEffect(() => {
        axios.get<ICharacter>(`https://rickandmortyapi.com/api/character/${id}`)
            .then(async response => {
                const charData = response.data;
                setCharacter(charData);

                const episodePromises = charData.episode.map(url => axios.get<IEpisode>(url));
                const episodeResponses = await Promise.all(episodePromises);
                setEpisodes(episodeResponses.map(res => res.data));
            });
    }, [id]);

    if (!character) return <div>Carregando...</div>;

    return (
        <div className="detail-container">
            <div className='detail-card'>
                <h1>{character.name}</h1>
                <img src={character.image} alt={character.name} />
                <p><strong>Status:</strong> {character.status}</p>
                <p><strong>Espécie:</strong> {character.species}</p>
                <p><strong>Gênero:</strong> {character.gender}</p>
                <p><strong>Origem:</strong> {character.origin.name}</p>
                <p><strong>Localização Atual:</strong> {character.location.name}</p>

                <h2>Episódios em que aparece:</h2>
                <ul className='detail-list'>
                    {episodes.map(ep => (
                        <li key={ep.id}>
                            <Link to={`/episodes/${ep.id}`}>{ep.episode}: {ep.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};