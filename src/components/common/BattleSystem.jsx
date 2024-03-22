import React, { useState, useEffect } from "react";
import { PokemonBattleApi } from "../../services/PokemonBattleApi";
import "@styles/BattleSystem.css";
import SelectPokemonBattle from "./SelectPokemonBattle";
import { useBattleContext } from "../context/BattleContext";
import { capitalizeFirstLetter } from "../layout/Utils";
import { Link } from "react-router-dom";
import { useCallIdContext } from "../context/IdContext";

const BattleSystem = () => {
  const { equallity, winner, } = useBattleContext();
  const [pokemonData, setPokemonData] = useState([]);


  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const data = await PokemonBattleApi();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching pokemon data", error);
      }
    };
    fetchPokemonData();
  }, []);


  return (
    <div className="battle-container">
      <SelectPokemonBattle
        pokemonData={pokemonData}
      />
     
      {winner && (
        <div className="winner-container">
          <h2>The winner is:</h2>
          <img
            loading="lazy"
            src={
              winner.sprites.other["showdown"].front_default ||
              winner.sprites.other["official-artwork"].front_default ||
              winner.sprites.front_default
            }
          />
          <p>{capitalizeFirstLetter(winner.name)}</p>
        </div>
      )}
      {equallity &&(
        <div className="equallity-container">
          
        <h2>The battle is a draw!</h2>
        </div>
        )}
    </div>
  );
};

export default BattleSystem;
