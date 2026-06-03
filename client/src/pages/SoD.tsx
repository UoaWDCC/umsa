import { useState } from "react"
import slangData from "../data/malaysian-slang.json"

export default function SoD() {
  const [targetWord] = useState(() => {
    const randomEntry = slangData[Math.floor(Math.random() * slangData.length)];
    return randomEntry.word.toUpperCase();
  })
  const alphabet = Array.from(
    { length: 26 }, (_, index) =>
    String.fromCharCode(65 + index)
  );
  //const alphabetDisplay = alphabet.join(" ");

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter))
      return;
    setGuessedLetters((previous) => [...previous, letter]);
  }

  const maskedWordSpaced = targetWord.split("").map((letter) => (guessedLetters.includes(letter) ? letter : "_")).join(" ");
  return (
    <>
      <h1>Slang of the Day</h1>
      <p>{maskedWordSpaced}</p>
      <div>
        {alphabet.map((letter) => (
          <button
          key={letter}
          type="button"
          onClick={() => handleGuess(letter)}
          disabled={guessedLetters.includes(letter)}
          className="pointer"
          >
            {letter}
          </button>
        ))}
      </div>
    </>
  );
}