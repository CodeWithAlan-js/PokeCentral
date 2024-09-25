import axios from "axios";

export const searchPokemonApi = async (pokemonName) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon data", error);
    throw error;
  }
};
