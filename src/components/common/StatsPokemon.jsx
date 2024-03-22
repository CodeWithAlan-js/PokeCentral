import PokemonStatBar from "../layout/PokemonStatBar";
import "@styles/StatsPokemon.css";
import { IoCloseCircleOutline } from "react-icons/io5";

const StatsPokemon = (props) => {
  const { selectedPokemon } = props;

  const maxValue = 200;

  

  const stats = selectedPokemon.stats.reduce((accumulator, stat) => {
    const statName = stat.stat.name;
    accumulator[statName] = stat.base_stat;
    return accumulator;
  }, {});

  return (
    <div className="stats-container">
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
          <h2>Stats</h2>
        </div>
      </div>
      <div className="stats-text-container">
        <div className="stats">
          <p className="stat-text">Hp</p>
          <div className="test">
          <p className="stat-num">{stats.hp}</p>
          <PokemonStatBar value={stats.hp} />
          </div>
        </div>
        <div className="stats">
          <p className="stat-text">Attack</p>
          <div className="test">
          <p className="stat-num">{stats.attack}</p>
          <PokemonStatBar value={stats.attack} />
          </div>
        </div>
        <div className="stats">
          <p className="stat-text">Defense</p>
          <div className="test">
          <p className="stat-num">{stats.defense}</p>
          <PokemonStatBar value={stats.defense} maxValue={maxValue} />
          </div>
        </div>
        <div className="stats">
          <p className="stat-text">Sp. Atk</p>
          <div className="test">
          <p className="stat-num">{stats["special-attack"]}</p>
          <PokemonStatBar value={stats["special-attack"]} maxValue={maxValue} />
          </div>
        </div>
        <div className="stats">
          <p className="stat-text">Sp. Def</p>
          <div className="test">
          <p className="stat-num">{stats["special-defense"]}</p>
          <PokemonStatBar value={stats["special-defense"]} maxValue={maxValue} />
          </div>
        </div>
        <div className="stats">
          <p className="stat-text">Speed</p>
          <div className="test">
          <p className="stat-num">{stats.speed}</p>
          <PokemonStatBar value={stats.speed} maxValue={maxValue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPokemon;
