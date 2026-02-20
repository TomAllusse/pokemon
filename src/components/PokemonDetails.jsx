import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../contexts/PokemonContextProvider";

const PokemonDetails = () => {
  const [teamDetails, setTeamDetails] = useState([]);
  const { pokemons } = useContext(PokemonContext);

  useEffect(() => {
    if (!pokemons || pokemons.length === 0) {
      setTeamDetails([]);
      return;
    }

    const getTeamData = async () => {
      try {
        const promises = pokemons.map(async (p) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${p.name.toLowerCase()}`
          );
          if (response.ok) {
            return await response.json();
          }
          return null;
        });

        const results = await Promise.all(promises);
        setTeamDetails(results.filter(item => item !== null));
        
      } catch (error) {
        console.error("Erreur lors du fetch", error);
      }
    };

    getTeamData();
  }, [pokemons]);

return (
    <div className="result">
      <h2>Détails de l'équipe :</h2>
      {teamDetails.length > 0 ? (
        <div className="team">
          {teamDetails.map((p) => (
            <div key={p.id} className="pokemon" style={{ marginBottom: "20px" }}>
              <p>{p.name}</p>
              <img src={p.sprites.front_default} alt={p.name} />
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun Pokémon sélectionné dans l'équipe.</p>
      )}
    </div>
  );
};

export default PokemonDetails;
