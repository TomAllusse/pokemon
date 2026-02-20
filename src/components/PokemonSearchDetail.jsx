import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { PokemonContext } from "../contexts/PokemonContextProvider";


const PokemonSearchDetail = ({ searchName }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addPokemon } = useContext(PokemonContext);   

  const { id: pokeId } = useParams();

  useEffect(() => {
    const target = pokeId || searchName;

    if (!target) {
      setPokemon(null);
      setError(null);
      return;
    }

    const getPoke = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${target.toLowerCase()}`
        );

        if (!response.ok) {
          throw new Error("Pokémon non trouvé");
        }

        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setPokemon(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPoke();
    
  }, [pokeId, searchName]);
  
  return (
    <div className="result">
      <h3>Résultat de la recherche :</h3>

      {loading && <p>Chargement...</p>}
      
      {error && <p>❌ {error}</p>}

      {pokemon && !loading && (
        <div>
          <p>{pokemon.name}</p>
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name} 
          />
          <div>
            {pokemon.types.map((t) => (
              <span key={t.type.name}>
                {t.type.name}
              </span>
            ))}
          </div>
          <button onClick={() => addPokemon(pokemon.id, pokemon.name)}>Ajouter à l'équipe</button>
        </div>
      )}

      {!pokemon && !loading && !error && (
        <p>Entrez un nom pour voir les détails.</p>
      )}
    </div>
  );
};

export default PokemonSearchDetail;