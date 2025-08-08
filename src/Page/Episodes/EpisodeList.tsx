import { useState, useEffect } from 'react';
import axios from 'axios';
import type { IApiResponse, IEpisode, IInfo } from '../../Types/api';
import { EpisodeCard } from '../../Components/EpisodeCard';
import { Pagination } from '../../Components/Pagination';

const API_URL = 'https://rickandmortyapi.com/api/episode';

export const EpisodeList = () => {
    const [episodes, setEpisodes] = useState<IEpisode[]>([]);
    const [info, setInfo] = useState<IInfo | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = (url: string) => {
        axios.get<IApiResponse<IEpisode>>(url).then(response => {
            setEpisodes(response.data.results);
            setInfo(response.data.info);
            const pageNumber = new URL(url).searchParams.get("page");
            setCurrentPage(pageNumber ? parseInt(pageNumber) : 1);
        });
    };

    useEffect(() => {
        fetchData(API_URL);
    }, []);

    return (
        <div>
            <h1>Episódios</h1>
            <Pagination info={info} currentPage={currentPage} onPageChange={fetchData} />
            <div className="item-grid">
                {episodes.map(ep => (
                    <EpisodeCard key={ep.id} episode={ep} />
                ))}
            </div>
            <Pagination info={info} currentPage={currentPage} onPageChange={fetchData} />
        </div>
    );
};