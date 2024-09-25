import React from "react";
import HomePage from "./pages/homePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonCards from "./pages/pokemonCards";
import SearchPage from "./pages/searchPage";
import { PokemonPaginationProvider } from "./components/context/paginationContext";
import { EvolutionProvider } from "./components/context/evolutionContext";
import { IdProvider } from "./components/context/idContext";
import BerriesPage from "./pages/berriesPage";
import TypeTablePage from "./pages/typeTablePage";
import PokemonBattlePage from "./pages/pokemonBattlePage";
import { BattleProvider } from "./components/context/battleContext";

function App() {
  return (
    <>
      <PokemonPaginationProvider>
        <IdProvider>
          <EvolutionProvider>
            <BattleProvider>
              <Router>
                <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route path="/pokemon/:id" element={<PokemonCards />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/berries" element={<BerriesPage />} />
                  <Route path="/types" element={<TypeTablePage />} />
                  <Route path="/battle" element={<PokemonBattlePage />} />
                </Routes>
              </Router>
            </BattleProvider>
          </EvolutionProvider>
        </IdProvider>
      </PokemonPaginationProvider>
    </>
  );
}

export default App;
