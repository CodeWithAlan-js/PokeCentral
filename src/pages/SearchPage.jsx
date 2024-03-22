import React, { useState, useEffect } from "react";
import "@styles/SearchPage.css";
import SearchByType from "../components/common/SearchByType";
import { Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/common/NavBar";

const SearchPage = () => {
  

  return (
    <>
    <NavBar/>
      <div className="search-page-container">
        <h2>Search for a pokemon</h2>
        <SearchBar/>
      <SearchByType/>
      </div>
    </>
  );
};

export default SearchPage;
