import React from "react";
import "@styles/AboutPokemon.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  capitalizeFirstLetter,
  convertHeight,
  convertWeight,
  formatPokemonId,
  typeColors,
  typeIcons,
} from "../../helpers/utils";

const AboutPokemon = (props) => {
  const { selectedPokemon } = props;

  return (
    <div className="about-container">
      <div className="cards-header">
        <div className="close-container">
          <button
            className="close-button"
            type="button"
            onClick={props.onClick}
          >
            <IoCloseCircleOutline size={35} />
          </button>
        </div>
        <div className="header-title">
          <h2>About</h2>
        </div>
      </div>
      <ul className="about-list">
        <li className="li-text">
          Id:{" "}
          <span className="bold">{formatPokemonId(selectedPokemon.id)} </span>
        </li>
        <li className="li-text">
          Species:
          {selectedPokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="type-container"
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              {typeIcons[type.type.name]}
              {capitalizeFirstLetter(type.type.name)}
            </span>
          ))}
        </li>
        <li className="li-text">
          Height:{" "}
          <span className="bold">{convertHeight(selectedPokemon.height)}</span>
        </li>
        <li className="li-text">
          Weight:{" "}
          <span className="bold">{convertWeight(selectedPokemon.weight)}</span>
        </li>
        <li className="li-text">
          Abilities:{" "}
          <span className="bold">
            {selectedPokemon.abilities
              .map((ability) => capitalizeFirstLetter(ability.ability.name))
              .join(", ")}
          </span>{" "}
        </li>
      </ul>
    </div>
  );
};

export default AboutPokemon;
