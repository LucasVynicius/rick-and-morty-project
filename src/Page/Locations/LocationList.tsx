import { useState, useEffect } from 'react';
import axios from 'axios';
import type { IApiResponse, ILocation, IInfo } from '../../Types/api';
import { LocationCard } from '../../Components/LocationCard';
import { Pagination } from '../../Components/Pagination';

const API_URL = 'https://rickandmortyapi.com/api/location';

export const LocationList = () => {
    const [locations, setLocations] = useState<ILocation[]>([]);
    const [info, setInfo] = useState<IInfo | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = (url: string) => {
        axios.get<IApiResponse<ILocation>>(url).then(response => {
            setLocations(response.data.results);
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
            <h1>Localizações</h1>
            <Pagination info={info} currentPage={currentPage} onPageChange={fetchData} />
            <div className="item-grid">
                {locations.map(loc => (
                    <LocationCard key={loc.id} location={loc} />
                ))}
            </div>
            <Pagination info={info} currentPage={currentPage} onPageChange={fetchData} />
        </div>
    );
};