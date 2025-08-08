import {  NavLink  } from "react-router-dom";

export const Header = () => {
    return (
        <header className="header" >
            <NavLink to="/characters">Personagens</NavLink>
            <NavLink to="/episodes">Episódios</NavLink>
            <NavLink to="/locations">Localizações</NavLink>
        </header>
    )
}