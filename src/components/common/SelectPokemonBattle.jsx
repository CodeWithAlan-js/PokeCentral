import React, { useState, useEffect } from "react";
import "@styles/SelectPokemonBattle.css";
import PokemonSelection from "./PokemonSelection";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TbPokeball } from "react-icons/tb";
import { useBattleContext } from "../context/BattleContext";
import { GrPowerReset } from "react-icons/gr";
import { typeColors} from "../layout/Utils";

const SelectPokemonBattle = () => {
  const { selectedPokemons, handleReset, handleBattle, pokemonAnimations, winner, equallity } = useBattleContext();
  const [pokemonVisibility, setPokemonVisibility] = useState(false);

  const handleVisibility = () => {
    setPokemonVisibility(!pokemonVisibility);
  };

  useEffect(() => {
    if (selectedPokemons.length === 2) {
      setTimeout(() => setPokemonVisibility(false), 500);
    }
  }, [selectedPokemons]);



  return (
    <div className="select-container">
      <div className="buttons-container">
        {selectedPokemons.length < 2 ? (
          <button className="button-select" onClick={handleVisibility}>
            Select Pokemon
          </button>
        ) : (
          <button className={`button-start ${winner ? "disabled-button" : '' } ${equallity ? "disabled-button" : '' }`} onClick={handleBattle} >
            Start Battle
          </button>
        )}
        <button className="button-reset" onClick={handleReset}>
          <GrPowerReset  size={50} />
        </button>
      </div>
      <ul className="pokemons-container">
        {selectedPokemons.map((pokemon, index) => (
          <li className={`pokemon${index + 1} ${pokemonAnimations[index] ? `pokemon-animation-${index + 1}` : ''}`} key={index}>
          <img
              loading="lazy"
              src={
                pokemon.sprites.other["showdown"].front_default ||
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
            />
            <TbPokeball size={150} style={{ color: typeColors[pokemon.types[0].type.name] }} className={selectedPokemons.length > 1 ? 'icon-poke' : ''}  />
          </li>
        ))}
        {selectedPokemons.length < 2 && (
          <>
            <li className="pokemon-question-mark">
              <span className="question-mark">?</span>
              <TbPokeball size={70} className={selectedPokemons.length > 1 ? 'icon-poke' : ''}/>
            </li>
          </>
        )}
        {selectedPokemons.length < 1 && (
          <>
            <li className="pokemon-question-mark">
              <span className="question-mark">?</span>
              <TbPokeball size={70} className={selectedPokemons.length > 1 ? 'icon-poke' : ''} />
            </li>
          </>
        )}
      </ul>
      {pokemonVisibility && (
        <div className={`choice-container ${pokemonVisibility ? 'visible' : 'hidden'}`}>
          <PokemonSelection />
        </div>
      )}
    
    </div>
  );
};

export default SelectPokemonBattle;
