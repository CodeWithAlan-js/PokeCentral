import React from "react";
import HomeCards from "../components/common/HomeCards.jsx";
import NavBar from "../components/common/NavBar";
import "@styles/HomePage.css";
import { usePokemonPaginationContext } from "../components/context/PaginationContext";
import { MutatingDots } from "react-loader-spinner";
import Pagination from "../components/common/Pagination";

const HomePage = () => {
  const { pokemonData, loading } = usePokemonPaginationContext();

  return (
    <>
      <NavBar />
      <main className="home-page">
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
            <>
            <HomeCards pokemonData={pokemonData} />
            <div className="pagination-container">
              <Pagination />

            </div>
            </>
        )}
      </main>
    </>
  );
};

export default HomePage;
