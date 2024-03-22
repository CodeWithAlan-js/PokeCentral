import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCallIdContext } from "../components/context/IdContext.jsx";
import "@styles/PokemonCards.css";
import AboutPokemon from "../components/common/AboutPokemon.jsx";
import StatsPokemon from "../components/common/StatsPokemon.jsx";
import EvolutionPokemon from "../components/common/EvolutionPokemon.jsx";
import {
  typeColors,
  capitalizeFirstLetter,
  formatPokemonId,
  typeIcons,
  playSound,
} from "/src/components/layout/Utils.jsx";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlineSound } from "react-icons/ai";
import { MutatingDots } from "react-loader-spinner";



const PokemonCards = () => {
  const { id } = useParams();
  const { getPokemonDetailsById } = useCallIdContext();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [visibleComponent, setVisibleComponent] = useState("details");
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const pokemonDetails = await getPokemonDetailsById(id);
        setSelectedPokemon(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokemon details", error);
      }
    };

    fetchPokemonDetails();
  }, [id, getPokemonDetailsById]);


  if (!selectedPokemon) {
    return (
      <div className="loader-container">
        <MutatingDots
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ textAlign: 'center' }}
        />
      </div>
    );
  }

  const pokemonImages = [
    selectedPokemon.sprites.other["official-artwork"].front_default,
    selectedPokemon.sprites.other["official-artwork"].front_shiny,
  ].filter(image => image !== null);

  const pokemonTypes = selectedPokemon.types.map((type) => ({
    name: capitalizeFirstLetter(type.type.name),
    color: typeColors[type.type.name],
  }));
  const colors = pokemonTypes[0].color;

  const detailsBackgroundStyle = {
    backgroundColor: colors,
  };

  const idColorStyle = {
    color: colors,
    opacity: 0.6,
  };

  const handleNextImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === pokemonImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? pokemonImages.length - 1 : prevIndex - 1
    );
  };

  const toggleVisibility = (component) => {
    setVisibleComponent(component);
  };

  const handlePlaySound = () => {
    playSound(selectedPokemon.cries.latest);
  }

  const showNavButtons = pokemonImages.length > 1;


  return (
    <div className="card-container" style={detailsBackgroundStyle}>
      <div className="close-container">
        <Link to={"/"}>
          <IoCloseCircleOutline
            className="close-button-cards"
            color="white"
            size={45}
          />
        </Link>
      </div>
      <div className="pokemon-title-img">
        <h2 className="pokemon-name">
          {capitalizeFirstLetter(selectedPokemon.name)}
        </h2>
        <div className="image-container">
          {typeIcons[selectedPokemon.types[0].type.name] && (
            <div className="type-icon-background">
              {typeIcons[selectedPokemon.types[0].type.name]}
            </div>
          )}
         {showNavButtons && (
            <>
              <button className="nav-button prev-button" onClick={handlePrevImage}>
                <MdNavigateBefore size={60} color="white" />
              </button>
              <img src={pokemonImages[imageIndex]} alt={selectedPokemon.name} />
              <button className="nav-button next-button" onClick={handleNextImage}>
                <MdNavigateNext size={60} color="white" />
              </button>
            </>
          )}
          {!showNavButtons && (
            <img src={pokemonImages[imageIndex]} alt={selectedPokemon.name} />
          )}
        </div>
          <button onClick={handlePlaySound} className="sound-button">
          <AiOutlineSound color="white" size={60}/>

          </button>
      </div>
      {visibleComponent === "about" && (
        <AboutPokemon
          selectedPokemon={selectedPokemon}
          onClick={() => toggleVisibility("details")}
        />
      )}
      {visibleComponent === "stats" && (
        <StatsPokemon
          selectedPokemon={selectedPokemon}
          onClick={() => toggleVisibility("details")}
        />
      )}
      {visibleComponent === "evolution" && (
        <EvolutionPokemon
          selectedPokemon={selectedPokemon}
          onClick={() => toggleVisibility("details")}
        />
      )}
      {visibleComponent === "details" && (
        <div className="pokemon-details-container">
          <div className="content-left" style={idColorStyle}>
            <p className="id">{formatPokemonId(selectedPokemon.id)}</p>
          </div>
          <div className="content-right">
            <button
              className="button-card button-about"
              type="button"
              onClick={() => toggleVisibility("about")}
            >
              About
            </button>
            <button
              className="button-card button-stats"
              type="button"
              onClick={() => toggleVisibility("stats")}
            >
              Stats
            </button>
            <button
              className="button-card button-evolution"
              type="button"
              onClick={() => toggleVisibility("evolution")}
            >
              Evolution
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonCards;
