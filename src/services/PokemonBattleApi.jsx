import axios from "axios";

export const PokemonBattleApi = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100"
    );
    const pokemonList = response.data.results;
    const pokemonPromises = pokemonList.map(async (pokemon) => {
      const response = await axios.get(pokemon.url);
      return response.data;
    });
    const pokemonData = await Promise.all(pokemonPromises);
    return pokemonData;
  } catch (error) {
    console.error("Error fetching pokemon data", error);
    throw error;
  }
};
