import { useState, useEffect } from "react";
import axios from 'axios';
import type { IApiResponse, ICharacter, IInfo } from "../../Types/api";
import { Link } from "react-router-dom";
import { CharacterCard } from "../../Components/Characters/CharactersCard";





export default function CharacterList(){
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const [info, setInfo] = useState<IInfo | null>(null);

    useEffect(() => {
      axios.get<IApiResponse<ICharacter>>('https://rickandmortyapi.com/api/character')
        .then(response => {
            setCharacters(response.data.results);
            setInfo(response.data.info);
        });
    }, [])
    
    return(
        <div>
            <h1>Lista de Personagens</h1>
            {characters.map( (char) => (
                <Link to={`/character/${char.id}`} key={char.id}>
                <a>
                    <CharacterCard character={char}/>
                </a>
                </Link>
            ))}
        </div>
    )
}