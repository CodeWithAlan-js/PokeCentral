import React from "react";
import BattleSystem from "../components/common/battleSystem";
import "@styles/PokemonBattlePage.css";
import NavBar from "../components/common/navBar";

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
