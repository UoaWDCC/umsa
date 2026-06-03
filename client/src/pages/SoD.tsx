import { useState } from "react"

export default function SoD() {
  const targetWord = "HAIYA";
  const maskedWordSpaced = Array(targetWord.length).fill("_").join(" ");

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
      <p>{guessedLetters}</p>
    </>
  );
}