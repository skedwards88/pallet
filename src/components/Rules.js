import React from "react";
import packageJson from "../../package.json";

export default function Rules({setDisplay}) {
  
  return (
    <div className="App info">
      <div className="infoText">
        {<h1>Pallet</h1>}
        {`Psst! Are you looking for the daily word game, Palette? If so, find it at `}
        <a href={"https://palettegame.com/"}>
        palettegame.com
        </a>
        {`. Otherwise, enjoy this easier version.\n\n`}
        {<hr></hr>}
        {`Swipe to connect letters into words that match the color patterns.\n\nTap on a pattern to get a hint.\n\n`}
        {<small>version {packageJson.version}</small>}
      </div>
      <button className="close" onClick={() => setDisplay("game")}>
        CLOSE
      </button>
    </div>
  );
}