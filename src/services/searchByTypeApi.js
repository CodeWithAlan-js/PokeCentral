import axios from "axios";

export const searchByTypeApi = async (type) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
  const pokemonUrls = response.data.pokemon.map(
    (pokemon) => pokemon.pokemon.url
  );

  const pokemonDataPromises = pokemonUrls.map(async (pokemonUrl) => {
    const pokemonResponse = await axios.get(pokemonUrl);
    return pokemonResponse.data;
  });

  return Promise.all(pokemonDataPromises);
};
