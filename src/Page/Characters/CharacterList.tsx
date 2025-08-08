import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // 1. O import que estava faltando
import type { IApiResponse, ICharacter, IInfo } from '../../Types/api';
import { CharacterCard } from '../../Components/CharactersCard'; // Corrigi o caminho para o padrão
import { Pagination } from '../../Components/Pagination';
import { SkeletonCard } from '../../Components/SkeletonCard'; // 2. Importando nosso SkeletonCard

const API_URL = 'https://rickandmortyapi.com/api/character';

// As variantes da animação continuam as mesmas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Ajustei o tempo para ficar mais rápido e fluido
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const CharacterList = () => {
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const [info, setInfo] = useState<IInfo | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchData = (url: string) => {
        setLoading(true);
        axios.get<IApiResponse<ICharacter>>(url).then(response => {
            setCharacters(response.data.results);
            setInfo(response.data.info);
            const pageNumber = new URL(url).searchParams.get("page");
            setCurrentPage(pageNumber ? parseInt(pageNumber) : 1);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData(API_URL);
    }, []);

    return (
        <div>
            <h1>Personagens de Rick and Morty</h1>
            <Pagination info={info} currentPage={currentPage} onPageChange={fetchData} />
            
            {/* 3. Unificamos a renderização aqui. Este é o único container da lista agora. */}
            <motion.div
              className="item-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
                {loading ? (
                    // 4. Usando o Skeleton Loading para uma melhor UX
                    Array.from({ length: 20 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
                ) : (
                    characters.map(char => (
                        <motion.div key={char.id} variants={itemVariants}>
                            <CharacterCard character={char} />
                        </motion.div>
                    ))
                )}
            </motion.div>

            {/* Só mostra a paginação inferior se não estiver carregando */}
            {!loading && <Pagination info={info} currentPage={currentPage} onPageChange={fetchData} />}
        </div>
    );
};