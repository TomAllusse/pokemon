import Header from "../components/Header"
import { useState } from "react"; 
import PokemonSearchDetail from "../components/PokemonSearchDetail";
import '../css/searchPokemon.css'

const PokemonSearch = () => {
    const [inputValue, setInputValue] = useState(""); 

    return (
    <>
        <Header/>
        <div className="form">
            <label htmlFor="name">Nom du pokémon :</label>
            <input type="text" name="name" id="name" value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
        </div>
        <PokemonSearchDetail searchName={inputValue}/>    
    </>
    );
};
export default PokemonSearch;