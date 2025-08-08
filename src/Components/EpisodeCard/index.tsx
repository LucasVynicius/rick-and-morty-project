import type { IEpisode } from '../../Types/api';
import { Link } from 'react-router-dom';

interface EpisodeCardProps {
  episode: IEpisode;
}

export const EpisodeCard = ({ episode }: EpisodeCardProps) => (
    <Link to={`/episodes/${episode.id}`} className="card">
        <div className="card-content">
            <h2>{episode.name}</h2>
            <p>Data de Lançamento: {episode.air_date}</p>
            <p>Episódio: {episode.episode}</p>;
        </div>;
    </Link>
);