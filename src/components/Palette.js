import React from "react";
import Board from "./Board";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";
import Clues from "./Clues";
import CurrentWord from "./CurrentWord";

export default function Palette({ setDisplay }) {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  const isGameOver = gameState.clueMatches.every((i) => i);

  return (
    <div
      className="App"
      id="palette"
      onPointerUp={(e) => {
        e.preventDefault();

        dispatchGameState({
          action: "endWord",
        });
      }}
    >
      <div id="controls">
      <button
          id="newGameButton"
          onClick={() => {
            dispatchGameState({
              action: "newGame",
            });
          }}
        ></button>
        <button id="rules" onClick={() => setDisplay("rules")}></button>
        <button id="heart" onClick={() => setDisplay("heart")}></button>
      </div>
      <Clues
        clueMatches={gameState.clueMatches}
        hints={gameState.hints}
        clueColors={gameState.clueIndexes.map((clue) =>
          clue.map((index) => gameState.colors[index])
        )}
        clueLetters={gameState.clueIndexes.map((clue) =>
          clue.map((index) => gameState.letters[index])
        )}
        dispatchGameState={dispatchGameState}
      ></Clues>
      {isGameOver ? (
        <div id="gameOver">
          Success!
        </div>
      ) : (
        <CurrentWord
          letters={gameState.playedIndexes.map(
            (index) => gameState.letters[index]
          )}
          colors={gameState.playedIndexes.map(
            (index) => gameState.colors[index]
          )}
        ></CurrentWord>
      )}
      <Board
        letters={gameState.letters}
        colors={gameState.colors}
        playedIndexes={gameState.playedIndexes}
        gameOver={gameState.clueMatches.every((i) => i)}
        dispatchGameState={dispatchGameState}
      ></Board>
    </div>
  );
}
