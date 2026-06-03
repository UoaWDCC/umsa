import { useState } from "react"
import slangData from "../data/malaysian-slang.json"
import { motion } from "motion/react";

export default function SoD() {

  const [randomEntry] = useState(() => {
    return slangData[Math.floor(Math.random() * slangData.length)];
  })

  const targetWord = randomEntry.word.toUpperCase();
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
      <div className="flex flex-wrap m-5 p-4 gap-4 justify-center mx-auto">
        {alphabet.map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          const isCorrect = targetWord.includes(letter);

          const tileColor = !isGuessed ? "bg-gray-300" : isCorrect ? "bg-green-400" : "bg-red-400";
        
        
        return (
          <motion.div key={letter} initial={{scale:0}} animate={{scale:1}} transition={{duration:0.5}}>
            <div className={`w-20 h-20 ${tileColor} rounded-2xl flex justify-center items-center cursor-pointer`}
            key={letter}
            role="button"
            onClick={() => handleGuess(letter)}
            tabIndex={0}
            >
              <p className="text-2xl">
                {letter}
              </p>
            </div>
          </motion.div>
        
        );
      })}
      </div>
      <p>Definition: {randomEntry.definition}</p>
      <p>{guessedLetters}</p>
    </>
  );
}