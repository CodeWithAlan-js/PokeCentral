import { useState, useEffect } from "react";
import "@styles/SearchBar.css";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { Link } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { searchPokemonApi } from "../../services/searchPokemonApi";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchPokemonApi(searchTerm);
        setSearchResults([response]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const delaySearch = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by name or ID"
        value={searchTerm}
        onChange={handleInputChange}
      />
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
      {searchResults.length === 0 && (
        <p className="no-pokemon-found">No pokemon found</p>
      )}
      {error && (
        <p className="error-message">An error occurred: {error.message}</p>
      )}

      <div>
        {searchResults.map((pokemon) => (
          <div key={pokemon.id}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
