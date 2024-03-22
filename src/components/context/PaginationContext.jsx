import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PokemonPaginationContext = createContext();

export const usePokemonPaginationContext = () => {
  return useContext(PokemonPaginationContext);
};

const ITEMS_PER_PAGE = 10;

export const PokemonPaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${(currentPage - 1) * ITEMS_PER_PAGE}`
        );
        const pokemonDetailsPromises = response.data.results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return {
            ...pokemonResponse.data,
          };
        });
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemonData(pokemonDetails);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la requête API", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchTotalPokemonCount = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        setTotalPokemonCount(response.data.count);
      } catch (error) {
        console.error("Erreur lors de la requête API pour obtenir le nombre total de Pokémon", error);
      }
    };

    fetchTotalPokemonCount();
  }, []);

  const totalPages = Math.ceil(totalPokemonCount / ITEMS_PER_PAGE);

  

  return (
    <PokemonPaginationContext.Provider
      value={{
        pokemonData,
        loading,
        currentPage,
        totalPages,
        setCurrentPage,
      }}
    >
      {children}
    </PokemonPaginationContext.Provider>
  );
};
