import React, { createContext, useContext } from "react";
import axios from "axios";

const IdContext = createContext();

export const useCallIdContext = () => {
  return useContext(IdContext);
};

export const IdProvider = ({ children }) => {
  const getPokemonDetailsById = async (id) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Pokemon details", error);
      throw error;
    }
  };

  return (
    <IdContext.Provider
      value={{
        getPokemonDetailsById,
      }}
    >
      {children}
    </IdContext.Provider>
  );
};
