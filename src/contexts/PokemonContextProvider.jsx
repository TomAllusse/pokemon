import { createContext, useState } from "react";

export const PokemonContext = createContext(); 

const PokemonContextProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);

  const addPokemon = (id, name) => {
    if (!id || !name) return;

    if (pokemons.length >= 6) {
      alert("Équipe complète !");
      return;
    }

    setPokemons((prev) => [...prev, { id, name }]);
  };

  return (
    <PokemonContext value={{ pokemons, addPokemon}}>
      {children}
    </PokemonContext>
  );
};

export default PokemonContextProvider;