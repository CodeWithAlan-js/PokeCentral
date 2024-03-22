import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonCards from "./pages/PokemonCards";
import SearchPage from "./pages/SearchPage";
import { PokemonPaginationProvider } from "./components/context/PaginationContext";
import { EvolutionProvider } from "./components/context/EvolutionContext";
import { IdProvider } from "./components/context/IdContext";
import BerriesPage from "./pages/BerriesPage";
import TypeTablePage from "./pages/TypeTablePage";
import PokemonBattlePage from "./pages/PokemonBattlePage";
import { BattleProvider } from "./components/context/BattleContext";

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
