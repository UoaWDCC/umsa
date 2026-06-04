import { useState, useEffect, useRef } from "react"
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

  const [isHidden, setIsHidden] = useState(true);
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px")

  useEffect(() => {
      if (!isHidden && answerRef.current) {
          setHeight(`${answerRef.current.scrollHeight}px`);
      } else {
          setHeight("0px");
      }
  
  }, [isHidden]);

  useEffect(() => {
  const isWordComplete = targetWord.split("").every((letter) => guessedLetters.includes(letter));

  if (isWordComplete) {
    setIsHidden(false);
  }
  }, [guessedLetters, targetWord]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (!/^[a-z]$/i.test(event.key)) return;

      handleGuess(event.key.toUpperCase());
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleGuess]);

  return (
    <>
      <h1>Slang of the Day</h1>
      <p className="text-5xl mt-2">{maskedWordSpaced}</p>
      <p className="mt-2"><span className="text-[#140fff]">Definition:</span> {randomEntry.definition}</p>
      <div ref={answerRef}
            style={{ height }}
            className={`${isHidden ? "opacity-0" : "opacity-100"} overflow-hidden transition-[height,opacity] duration-300 ease-in-out`}>
        <p><span className="text-[#140fff]">Origin: </span>{randomEntry.origin}</p>
        <p><span className="text-[#140fff]">Pronunciation: </span>{randomEntry.pronunciation}</p>
        <p><span className="text-[#140fff]">Example: </span>{randomEntry.example}</p>
      </div>
      <div className="flex flex-wrap m-5 p-4 gap-4 justify-center mx-auto">
        {alphabet.map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          const isCorrect = targetWord.includes(letter);

          const tileColor = !isGuessed ? "bg-white" : isCorrect ? "bg-green-400" : "bg-red-400";
        
        
        return (
          <motion.div 
          key={letter} 
          initial={{scale:0}} 
          animate={{scale:1}} 
          transition={{duration:0.5}}>
            <div className={`w-20 h-20 ${tileColor} rounded-2xl flex justify-center items-center cursor-pointer transition-colors duration-300 ease-in-out`}
            key={letter}
            role="button"
            onClick={() => handleGuess(letter)}
            tabIndex={0}
            >
              <p className="text-2xl text-[#140fff]">
                {letter}
              </p>
            </div>
          </motion.div>
        );
      })}
      </div>
    </>
  );
}