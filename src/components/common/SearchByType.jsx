import { useState, useEffect } from "react";
import "@styles/SearchByType.css";
import { types, capitalizeFirstLetter } from "../../helpers/utils";
import { Link } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { searchByTypeApi } from "../../services/searchByTypeApi";

const SearchByType = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pokemons, setPokemons] = useState([]);

  const handleTypeClick = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(
        selectedTypes.filter((selectedType) => selectedType !== type)
      );
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (selectedTypes.length === 0) {
        setPokemons([]);
        setLoading(false);
        return;
      }

      try {
        const allPokemonData = await Promise.all(
          selectedTypes.map((type) => searchByTypeApi(type))
        );

        const mergedPokemonData = allPokemonData
          .flat()
          .filter((pokemon) =>
            selectedTypes.every((type) =>
              pokemon.types.some(
                (pokemonType) => pokemonType.type.name === type
              )
            )
          );

        const uniqueMergedPokemonData = [];
        const encounteredIds = new Set();
        mergedPokemonData.forEach((pokemon) => {
          if (!encounteredIds.has(pokemon.id)) {
            uniqueMergedPokemonData.push(pokemon);
            encounteredIds.add(pokemon.id);
          }
        });

        setPokemons(uniqueMergedPokemonData);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTypes]);

  return (
    <div className="search-by-type-container">
      <h3>Search by type:</h3>
      <div>
        <ul className="type-list">
          {types.map((type) => (
            <li
              key={type.name}
              onClick={() => handleTypeClick(type.name)}
              className={selectedTypes.includes(type.name) ? "active" : ""}
            >
              <img src={type.icon} alt={type.name} />
            </li>
          ))}
        </ul>
      </div>
      {error && <p>{error}</p>}
      <div className="result-container">
        <h4>Resulting Pokémon:</h4>
        {loading && (
          <div className="loader-container">
            <MutatingDots
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ textAlign: "center" }}
            />
          </div>
        )}
        {pokemons.length === 0 && !loading && (
          <p className="no-pokemon-found">No Pokémon found</p>
        )}
        <ul className="ul-pokemon-list">
          {pokemons.map((pokemon) => (
            <li className="li-pokemon-list" key={pokemon.id}>
              <Link to={`/pokemon/${pokemon.id}`}>
                <img
                  src={
                    pokemon.sprites.other["showdown"].front_default ||
                    pokemon.sprites.other["official-artwork"].front_default ||
                    pokemon.sprites.front_default
                  }
                  alt="Sprite not available"
                />
                <p>{capitalizeFirstLetter(pokemon.name)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchByType;
