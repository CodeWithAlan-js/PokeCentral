import React, { useContext, useState } from "react";
import { playSound } from "../../helpers/utils";

const BattleContext = React.createContext();

export const useBattleContext = () => useContext(BattleContext);

export const BattleProvider = ({ children }) => {
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [isBattleInProgress, setIsBattleInProgress] = useState(false);
  const [winner, setWinner] = useState(null);
  const [pokemonAnimations, setPokemonAnimations] = useState([]);
  const [equallity, setEquallity] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  if (selectedPokemons.length > 2) {
    setSelectedPokemons(selectedPokemons.slice(0, 2));
  }

  const handleSelectedPokemons = (pokemon) => {
    setIsSelected(true);
    setSelectedPokemons([...selectedPokemons, pokemon]);
    setPokemonAnimations([...pokemonAnimations, false]);
    playSound(pokemon.cries.latest);
  };

  const calculateWinner = () => {
    if (selectedPokemons.length === 2) {
      const totalStatsPokemonOne = selectedPokemons[0]?.stats.reduce(
        (acc, stat) => acc + stat.base_stat,
        0
      );
      const totalStatsPokemonTwo = selectedPokemons[1]?.stats.reduce(
        (acc, stat) => acc + stat.base_stat,
        0
      );
      if (totalStatsPokemonOne > totalStatsPokemonTwo) {
        return selectedPokemons[0];
      } else if (totalStatsPokemonOne < totalStatsPokemonTwo) {
        return selectedPokemons[1];
      } else {
        setEquallity(true);
        return null;
      }
    }
    return null;
  };

  const handleBattle = () => {
    setIsBattleInProgress(true);
    setPokemonAnimations([true, true]);
    setTimeout(() => {
      setIsBattleInProgress(false);
      setWinner(calculateWinner());
    }, 1500);
  };

  const handleReset = () => {
    setEquallity(false);
    setSelectedPokemons([]);
    setWinner(null);
    setPokemonAnimations([]);
  };

  return (
    <BattleContext.Provider
      value={{
        selectedPokemons,
        handleSelectedPokemons,
        setSelectedPokemons,
        calculateWinner,
        handleBattle,
        handleReset,
        winner,
        isBattleInProgress,
        pokemonAnimations,
        equallity,
        isSelected,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};
