import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const choices = [
  { en: "Rock", ar: "حجر", value: "rock" },
  { en: "Paper", ar: "ورقة", value: "paper" },
  { en: "Scissors", ar: "مقص", value: "scissors" },
];

function RockPaperScissors() {
  const { language } = useLanguage();
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex].value;
  };

  const getChoiceLabel = (value) => {
    const found = choices.find((choice) => choice.value === value);
    if (!found) return "";
    return language === "ar" ? found.ar : found.en;
  };

  const playGame = (choice) => {
    const computer = getRandomChoice();

    setPlayerChoice(choice);
    setComputerChoice(computer);

    if (choice === computer) {
      setResult(language === "ar" ? "تعادل" : "Draw");
    } else if (
      (choice === "rock" && computer === "scissors") ||
      (choice === "paper" && computer === "rock") ||
      (choice === "scissors" && computer === "paper")
    ) {
      setResult(language === "ar" ? "لقد فزت!" : "You Win!");
    } else {
      setResult(language === "ar" ? "لقد خسرت!" : "You Lose!");
    }
  };

  const resetGame = () => {
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
      <h2 className="mb-4 text-center text-2xl font-bold text-[#1f2937] dark:text-white">
        {language === "ar" ? "حجر ورقة مقص" : "Rock Paper Scissors"}
      </h2>

      <div className="mb-5 flex flex-wrap justify-center gap-3">
        {choices.map((choice) => (
          <button
            key={choice.value}
            onClick={() => playGame(choice.value)}
            className="rounded-2xl bg-[#1e3a5f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
          >
            {language === "ar" ? choice.ar : choice.en}
          </button>
        ))}
      </div>

      {playerChoice && (
        <div className="space-y-2 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>
            {language === "ar" ? "اختيارك:" : "Your Choice:"}{" "}
            <span className="font-bold text-[#1f2937] dark:text-white">
              {getChoiceLabel(playerChoice)}
            </span>
          </p>

          <p>
            {language === "ar" ? "اختيار الكمبيوتر:" : "Computer Choice:"}{" "}
            <span className="font-bold text-[#1f2937] dark:text-white">
              {getChoiceLabel(computerChoice)}
            </span>
          </p>

          <p className="text-lg font-bold text-[#c89b3c] dark:text-[#35c6c6]">
            {result}
          </p>
        </div>
      )}

      <button
        onClick={resetGame}
        className="mt-5 w-full rounded-2xl border border-[#1e3a5f] px-5 py-3 text-sm font-semibold text-[#1e3a5f] transition hover:bg-[#1e3a5f] hover:text-white dark:border-[#35c6c6] dark:text-[#35c6c6] dark:hover:bg-[#35c6c6] dark:hover:text-[#0f172a]"
      >
        {language === "ar" ? "إعادة اللعب" : "Reset Game"}
      </button>
    </div>
  );
}

export default RockPaperScissors;