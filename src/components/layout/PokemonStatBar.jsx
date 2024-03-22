import React from "react";
import "@styles/StatBar.css";

const PokemonStatBar = ({ value }) => {
    const maxValue = 155;
    const fillPercent = value / maxValue;
    let fillColor;

    if (value >= 70) {
        fillColor = "#009920";
    } else if (value >= 40) {
        fillColor = "#ffcc00"; 
    } else {
        fillColor = "#ff0000"; 
    }

    return (
        <div className="stat-bar">
            <div className="stat-bar-fill" style={{ '--fill-percent': fillPercent, backgroundColor: fillColor }}></div>
        </div>
    );
};

export default PokemonStatBar;
