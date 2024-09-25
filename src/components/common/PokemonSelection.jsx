import { usePokemonPaginationContext } from "../context/paginationContext";
import Pagination from "./pagination";
import "@styles/PokemonSelection.css";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { MutatingDots } from "react-loader-spinner";
import { useBattleContext } from "../context/battleContext";
import { FaCheckCircle } from "react-icons/fa";
import SearchBarSelectPokemon from "./searchBarSelectPokemon";

const PokemonSelection = () => {
  const { handleSelectedPokemons, selectedPokemons } = useBattleContext();
  const { loading, pokemonData, currentPage, totalPages, setCurrentPage } =
    usePokemonPaginationContext();

  return (
    <div className="selection-container">
      <h2>Select 2 Pokemon</h2>
      <div>
        {loading ? (
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
        ) : (
          <div>
            <SearchBarSelectPokemon />
            <ul>
              {pokemonData.map((pokemon) => (
                <li
                  key={pokemon.id}
                  onClick={() => handleSelectedPokemons(pokemon)}
                >
                  <img
                    loading="lazy"
                    src={
                      pokemon.sprites.other["showdown"].front_default ||
                      pokemon.sprites.other["official-artwork"].front_default ||
                      pokemon.sprites.front_default
                    }
                  />
                  {capitalizeFirstLetter(pokemon.name)}
                  {selectedPokemons.find(
                    (selectedPokemon) => selectedPokemon.id === pokemon.id
                  ) && (
                    <div className="selected-pokemon">
                      <FaCheckCircle className="check-icon" size={35} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonSelection;
