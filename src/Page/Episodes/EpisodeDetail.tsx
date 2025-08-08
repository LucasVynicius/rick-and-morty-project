import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import type { ICharacter, IEpisode } from '../../Types/api';

export const EpisodeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [episode, setEpisode] = useState<IEpisode | null>(null);
    const [characters, setCharacters] = useState<ICharacter[]>([]);

    useEffect(() => {
        axios.get<IEpisode>(`https://rickandmortyapi.com/api/episode/${id}`)
            .then(async response => {
                const episodeData = response.data;
                setEpisode(episodeData);

                const characterPromises = episodeData.characters.map(url => axios.get<ICharacter>(url));
                const characterResponses = await Promise.all(characterPromises);
                setCharacters(characterResponses.map(res => res.data));
            });
    }, [id]);

    if (!episode) return <div>Carregando...</div>;

    return (
        <div className="detail-container">
             <div className='detail-card'>
                <h1>{episode.name}</h1>
                <p><strong>Data de Lançamento:</strong> {episode.air_date}</p>
                <p><strong>Episódio:</strong> {episode.episode}</p>

                <h2>Personagens neste episódio:</h2>
                <div className='item-grid'>
                    {characters.map(char => (
                         <Link to={`/characters/${char.id}`} className="card" key={char.id}>
                            <img src={char.image} alt={char.name} />
                            <div className="card-content">
                                <h2>{char.name}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};