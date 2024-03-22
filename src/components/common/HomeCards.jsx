import React, { useState } from "react";
import { usePokemonPaginationContext } from "../context/PaginationContext";
import { formatPokemonId, capitalizeFirstLetter, typeColors } from "../layout/Utils";
import "@styles/HomeCards.css";
import "react-loading-skeleton/dist/skeleton.css";
import { TbPokeball } from "react-icons/tb";
import { Link } from "react-router-dom";

const HomeCards = () => {
  const { pokemonData } = usePokemonPaginationContext();
  const [isHovered, setIsHovered] = useState(false);

  const formatedTypes = (types) => {
    return types
      .map((type) => capitalizeFirstLetter(type.type.name))
      .join(", ");
  };

  const getBackgroundColor = (pokemon) => {
    if (pokemon.types.length > 0) {
      const firstType = pokemon.types[0].type.name;
      return typeColors[firstType] || "black";
    }
  };

  const pokemonId = (id) => {
    return formatPokemonId(id);
  }

  return (
    <ul className="ul-home-cards">
      {pokemonData.map((pokemon, index) => (
        <Link key={index} to={`/pokemon/${pokemon.id}`}>
          <li className="li-home-cards">
            <div
              className="details-container"
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setIsHovered(false)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="text-cards-container">
                <p className="bold-text">{capitalizeFirstLetter(pokemon.name)}</p>
                <p className="">{formatedTypes(pokemon.types)}</p>
                <p className="">{pokemonId(pokemon.id)}</p>
              </div>
              <div className="background-container">
                <TbPokeball
                  className="-icon-cards"
                  style={{ color: getBackgroundColor(pokemon) }}
                  size={150}
                />
              </div>
              <div className="img-container">
                <img
                  src={
                    pokemon.sprites.other["showdown"].front_default ||
                    pokemon.sprites.other["official-artwork"].front_default ||
                    pokemon.sprites.front_default
                  }
                  alt="Sprite not available"
                />
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default HomeCards;
