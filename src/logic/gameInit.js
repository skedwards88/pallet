import { letterPool } from "../common/letterPool";
import { shuffleArray } from "../common/shuffleArray";
import { findAllWordIndexes } from "../common/findAllWords";
import { arraysMatchQ } from "../common/arraysMatchQ";

function getLetters(gridSize) {
  // Given the distribution of letters in the word list
  // Choose n letters without substitution
  const shuffledLetters = shuffleArray(letterPool);
  const chosenLetters = shuffledLetters.slice(0, gridSize * gridSize);

  return chosenLetters;
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function tallyColors(colors = []) {
  let tally = {};
  colors.forEach(
    (color) => (tally[color] = tally[color] ? tally[color] + 1 : 1)
  );
  return tally;
}

function getPlayableBoard({
  gridSize,
  minWordLength,
  maxWordLength,
  easyMode,
  numClues,
}) {
  const colorDistribution = ["red", "green", "yellow"];
  let foundPlayableBoard = false;
  let letters = [];
  let colors = [];
  let clueIndexes = [];

  while (!foundPlayableBoard) {
    // Pick a random assortment of letters and colors
    letters = getLetters(gridSize);
    // make sure that we have at least 4 of each color
    let colorTally = {};
    while (
      Object.values(colorTally).length < colorDistribution.length ||
      Object.values(colorTally).some((i) => i < 4)
    ) {
      colors = letters.map(() => pickRandom(colorDistribution));
      colorTally = tallyColors(colors);
    }
    clueIndexes = [];

    const wordIndexes = findAllWordIndexes({
      grid: letters,
      minWordLength: minWordLength,
      maxWordLength: maxWordLength,
      easyMode: easyMode,
    });

    const shuffledWordIndexes = shuffleArray(wordIndexes);

    for (let index = 0; index < shuffledWordIndexes.length; index++) {
      const currentClue = shuffledWordIndexes[index];

      // If the color pattern of the clue is already used, skip
      const currentClueColors = currentClue.map((index) => colors[index]);
      const foundCluesColors = clueIndexes.map((clue) =>
        clue.map((index) => colors[index])
      );
      const duplicateClue = foundCluesColors.some((array) =>
        arraysMatchQ(array, currentClueColors)
      );
      if (duplicateClue) {
        continue;
      }

      // If the same word (including plurals) is already used, skip
      const currentWord = currentClue.map((index) => letters[index]).join("");
      const foundCluesWords = clueIndexes.map((clue) =>
        clue.map((index) => letters[index]).join("")
      );
      let duplicateWord = false;
      for (
        let comparisonIndex = 0;
        comparisonIndex < foundCluesWords.length;
        comparisonIndex++
      ) {
        if (
          foundCluesWords[comparisonIndex] === currentWord ||
          foundCluesWords[comparisonIndex] + "S" === currentWord ||
          foundCluesWords[comparisonIndex] === currentWord + "S"
        ) {
          duplicateWord = true;
          break;
        }
      }
      if (duplicateWord) {
        continue;
      }

      clueIndexes.push(currentClue);

      // If found numClues, exit
      if (clueIndexes.length >= numClues) {
        foundPlayableBoard = true;
        break;
      }
    }
  }

  // Sort by clue length so longer clues are last
  clueIndexes.sort(function (a, b) {
    return a.length - b.length;
  });
  return [letters, colors, clueIndexes];
}

export function gameInit() {

  const [letters, colors, clueIndexes] = getPlayableBoard({
    gridSize: 4,
    minWordLength: 4,
    maxWordLength: 4,
    easyMode: true,
    numClues: 5,
  });

  const clueMatches = clueIndexes.map(() => false);
  const hints = clueIndexes.map((clue) => clue.map(() => false));

  return {
    letters: letters,
    colors: colors,
    clueIndexes: clueIndexes,
    clueMatches: clueMatches,
    playedIndexes: [],
    hints: hints,
  };
}
