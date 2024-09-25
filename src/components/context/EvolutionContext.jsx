import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const EvolutionContext = createContext();

export const useEvolutionContext = () => useContext(EvolutionContext);

export const EvolutionProvider = ({ children }) => {
  const [evolutionData, setEvolutionData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        if (!selectedPokemon) return;

        setLoading(true);

        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.name}`
        );
        const speciesData = speciesResponse.data;

        const evolutionResponse = await axios.get(
          speciesData.evolution_chain.url
        );
        const evolutionChain = evolutionResponse.data.chain;

        if (!evolutionChain) {
          setEvolutionData([]);
          setLoading(false);
          return;
        }

        const getAllEvolutions = (chain) => {
          const evolutions = [];
          const processChain = (link) => {
            const evolution = {
              name: link.species.name,
              url: link.species.url,
              details: link.evolution_details,
            };
            evolutions.push(evolution);
            if (link.evolves_to.length > 0) {
              link.evolves_to.forEach((evolvesTo) => processChain(evolvesTo));
            }
          };
          processChain(chain);
          return evolutions;
        };

        const allEvolutions = getAllEvolutions(evolutionChain);

        setEvolutionData(allEvolutions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching evolution data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEvolutionData();
  }, [selectedPokemon]);

  const hasEvolutionData = () => {
    return evolutionData && evolutionData.length > 0;
  };

  return (
    <EvolutionContext.Provider
      value={{
        evolutionData,
        setEvolutionData,
        selectedPokemon,
        setSelectedPokemon,
        loading,
        hasEvolutionData,
      }}
    >
      {children}
    </EvolutionContext.Provider>
  );
};
