import React, { useEffect, useState } from "react";
import "@styles/EvolutionPokemon.css";
import { capitalizeFirstLetter } from "../layout/Utils";
import { useEvolutionContext } from "../context/EvolutionContext";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MutatingDots } from 'react-loader-spinner'
import { Link } from "react-router-dom";
import { usePokemonPaginationContext } from "../context/PaginationContext";


const EvolutionPokemon = (props) => {
  const { evolutionData,setEvolutionData, setSelectedPokemon, hasEvolutionData, loading } = useEvolutionContext();
  const { selectedPokemon } = props;
  const [prevSelectedPokemon, setPrevSelectedPokemon] = useState(null);

  useEffect(() => {
    if (selectedPokemon !== prevSelectedPokemon) {
      setSelectedPokemon(selectedPokemon);
      setEvolutionData([]);
      setPrevSelectedPokemon(selectedPokemon);
    }
  }, [selectedPokemon, prevSelectedPokemon, setSelectedPokemon, setEvolutionData]);


  const getPokemonImageUrl = (url) => {
    const pokemonId = url.split("/").reverse()[1];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonId}.gif`;
  };


  return (
    <div className="evolution-container">
      <div className="cards-header">
        <div className="close-container">
          <button
            className="close-button"
            type="button"
            onClick={props.onClick}
          >
            <IoCloseCircleOutline size={35} />
          </button>
        </div>
        <h2 className="header-title">Evolutions</h2>
      </div>
      {loading ? (
         <div className="loader-container">
         <MutatingDots
           height="80"
           width="80"
           radius="9"
           color="green"
           ariaLabel="three-dots-loading"
           wrapperStyle={{ textAlign: 'center' }}
         />
       </div>
      ) : (
        hasEvolutionData() ? (
          <ul className="ul-evolution">
            {evolutionData.map((evolution, index) => (
              <li className="li-evolution" key={index}> 
                <img
                  src={getPokemonImageUrl(evolution.url)}
                  alt={evolution.name}
                  className="evolution-image"
                />
                <p className="evolution-name">
                  {capitalizeFirstLetter(evolution.name)}
                </p>
                <div className="evolution-details">
                  <ul className="evolution-details-list">
                    {evolution.details.map((detail, index) => (
                      <li key={index}>
                        {detail.min_level && (
                          <span>
                            <p>Evolve at level:</p>
                            <span className="bold-text">{`${detail.min_level}`}</span>
                          </span>
                        )}
                        {detail.gender && (
                          <span>
                            <p>Gender:</p>
                            <span className="bold-text">{`${detail.gender}`}</span>
                          </span>
                        )}
                        {detail.held_item && (
                          <span>
                            <p>Held Item:</p>
                            <span className="bold-text">{`${capitalizeFirstLetter(
                              detail.held_item.name
                            )}`}</span>
                          </span>
                        )}
                        {detail.item && (
                          <span>
                            <p>Evolve with:</p>
                            <span className="bold-text">{`${capitalizeFirstLetter(
                              detail.item.name
                            )}`}</span>
                          </span>
                        )}
                        {detail.min_affection && (
                          <span>
                            <p>Min Affection:</p>
                            <span className="bold-text">{`${detail.min_affection}`}</span>
                          </span>
                        )}
                        {detail.min_beauty && (
                          <span>
                            <p>Min Beauty:</p>
                            <span className="bold-text">{`${detail.min_beauty}`}</span>
                          </span>
                        )}
                        {detail.min_happiness && (
                          <span>
                            <p>Min Happiness:</p>
                            <span className="bold-text">{`${detail.min_happiness}`}</span>
                          </span>
                        )}
                        {detail.needs_overworld_rain && (
                          <span>
                            <p>Needs Overworld Rain:</p>
                            <span className="bold-text">{`${capitalizeFirstLetter(
                              detail.needs_overworld_rain
                            )}`}</span>
                          </span>
                        )}
                        {detail.party_species && (
                          <span>
                            <p>Party Species:</p>
                            <span className="bold-text">{`${capitalizeFirstLetter(
                              detail.party_species.name
                            )}`}</span>
                          </span>
                        )}
                        {detail.party_type && (
                          <span>
                            <p>Party Type:</p>
                            <span className="bold-text">{`${capitalizeFirstLetter(
                              detail.party_type.name
                            )}`}</span>
                          </span>
                        )}
                        {detail.relative_physical_stats && (
                          <span>
                            <p>Relative Physical Stats:</p>
                            <span className="bold-text">{`${detail.relative_physical_stats}`}</span>
                          </span>
                        )}
                        {detail.time_of_day && (
                          <span>
                            <p>Time of Day:</p>
                            <span className="bold-text">{`${capitalizeFirstLetter(
                              detail.time_of_day
                            )}`}</span>
                          </span>
                        )}
                        {detail.trade_species && (
                          <span>
                            <p>Trade Species:</p>
                            <span className="bold-text">{`${capitalizeFirstLetter(
                              detail.trade_species.name
                            )}`}</span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-evolution-message">This Pokémon does not have any evolutions.</p>
        )
      )}
    </div>
  );
};

export default EvolutionPokemon;
