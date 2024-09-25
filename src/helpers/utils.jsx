import {
  FaLeaf,
  FaFire,
  FaBolt,
  FaSnowflake,
  FaFistRaised,
  FaSkullCrossbones,
  FaHeart,
  FaBug,
  FaMountain,
  FaGhost,
  FaDragon,
  FaMask,
  FaShieldAlt,
  FaMagic,
} from "react-icons/fa";
import { GiLibertyWing, GiGroundbreaker, GiFairyWand } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";

const playSound = (sound) => {
  const audio = new Audio(sound);
  audio.volume = 0.2;
  audio.play();
};

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const typeIcons = {
  grass: <FaLeaf color="white" />,
  fire: <FaFire color="white" />,
  water: <IoIosWater color="white" />,
  electric: <FaBolt color="white" />,
  ice: <FaSnowflake color="white" />,
  fighting: <FaFistRaised color="white" />,
  poison: <FaSkullCrossbones color="white" />,
  normal: <FaHeart color="white" />,
  ground: <GiGroundbreaker color="white" />,
  bug: <FaBug color="white" />,
  rock: <FaMountain color="white" />,
  ghost: <FaGhost color="white" />,
  dragon: <FaDragon color="white" />,
  dark: <FaMask color="white" />,
  steel: <FaShieldAlt color="white" />,
  psychic: <FaMagic color="white" />,
  flying: <GiLibertyWing color="white" />,
  fairy: <GiFairyWand color="white" />,
};

const types = [
  { name: "normal", icon: "src/assets/Pokemon_Type_Icon_Normal.png" },
  { name: "fire", icon: "src/assets/Pokemon_Type_Icon_Fire.png" },
  { name: "water", icon: "src/assets/Pokemon_Type_Icon_Water.png" },
  { name: "grass", icon: "src/assets/Pokemon_Type_Icon_Grass.png" },
  { name: "electric", icon: "src/assets/Pokemon_Type_Icon_Electric.png" },
  { name: "ice", icon: "src/assets/Pokemon_Type_Icon_Ice.png" },
  { name: "fighting", icon: "src/assets/Pokemon_Type_Icon_Fighting.png" },
  { name: "poison", icon: "src/assets/Pokemon_Type_Icon_Poison.png" },
  { name: "ground", icon: "src/assets/Pokemon_Type_Icon_Ground.png" },
  { name: "bug", icon: "src/assets/Pokemon_Type_Icon_Bug.png" },
  { name: "rock", icon: "src/assets/Pokemon_Type_Icon_Rock.png" },
  { name: "ghost", icon: "src/assets/Pokemon_Type_Icon_Ghost.png" },
  { name: "dragon", icon: "src/assets/Pokemon_Type_Icon_Dragon.png" },
  { name: "dark", icon: "src/assets/Pokemon_Type_Icon_Dark.png" },
  { name: "steel", icon: "src/assets/Pokemon_Type_Icon_Steel.png" },
  { name: "psychic", icon: "src/assets/Pokemon_Type_Icon_Psychic.png" },
  { name: "flying", icon: "src/assets/Pokemon_Type_Icon_Flying.png" },
  { name: "fairy", icon: "src/assets/Pokemon_Type_Icon_Fairy.png" },
];

const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const convertHeight = (height) => height / 10 + "m";

const convertWeight = (weight) => weight / 10 + "kg";

const formatPokemonId = (id) => `#${id.toString().padStart(3, "0")}`;

export {
  typeColors,
  types,
  typeIcons,
  capitalizeFirstLetter,
  convertHeight,
  convertWeight,
  formatPokemonId,
  playSound,
};
