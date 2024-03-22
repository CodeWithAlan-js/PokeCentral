import React from "react";
import BattleSystem from "../components/common/BattleSystem";
import "@styles/PokemonBattlePage.css";
import NavBar from "../components/common/NavBar";

const PokemonBattlePage = () => {
  return (
    <>
      <NavBar />
      <div className="battle-page-container">
        <h2 className="">Pokemon Battle Page</h2>
        <BattleSystem />
      </div>
    </>
  );
};

export default PokemonBattlePage;
