import React from "react";
import packageJson from "../../package.json";

export default function Heart({setDisplay}) {
  const feedbackLink = `https://github.com/skedwards88/Pallet/issues/new?body=Pallet+version+${packageJson.version}`
  
  return (
    <div className="App info">
      <div className="infoText">
        {"Like this game? Check out "}
        <a href={"https://palettegame.com/"}>
        palettegame.com
        </a>
        {` for a more challenging daily version that you can share with friends.\n\n`}
        {<hr></hr>}
        {`\n`}
        {"Feedback? "}
        <a href={feedbackLink}>
          Open an issue
        </a>
        {" on GitHub."}
        {`\n\n`}
        {<hr></hr>}
        {`\n`}
        {`Thanks to `}
        <a href="https://github.com/wordnik/wordlist">Wordnik</a>
        {` for their open source word list and `}
        <a href="https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists#English">
          Wiktionary
        </a>
        {` and data therein for word frequency data.`}
      </div>
      <button className="close" onClick={() => setDisplay("game")}>
        CLOSE
      </button>
    </div>
  );
}