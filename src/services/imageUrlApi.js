export const getPokemonImageUrl = (url) => {
  const pokemonId = url.split("/").reverse()[1];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonId}.gif`;
};
