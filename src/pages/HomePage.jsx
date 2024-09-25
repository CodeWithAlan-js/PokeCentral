import React from "react";
import HomeCards from "../components/common/homeCards.jsx";
import NavBar from "../components/common/navBar.jsx";
import "@styles/HomePage.css";
import { usePokemonPaginationContext } from "../components/context/paginationContext.jsx";
import { MutatingDots } from "react-loader-spinner";
import Pagination from "../components/common/pagination.jsx";

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
