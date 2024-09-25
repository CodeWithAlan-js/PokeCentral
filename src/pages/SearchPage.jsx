import "@styles/SearchPage.css";
import SearchByType from "../components/common/searchByType";
import SearchBar from "../components/common/searchBar";
import NavBar from "../components/common/navBar";

const SearchPage = () => {
  return (
    <>
      <NavBar />
      <div className="search-page-container">
        <h2>Search for a pokemon</h2>
        <SearchBar />
        <SearchByType />
      </div>
    </>
  );
};

export default SearchPage;
