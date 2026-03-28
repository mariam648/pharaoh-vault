import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function NumberGuess() {
  const { language } = useLanguage();
  const [targetNumber, setTargetNumber] = useState(
    Math.floor(Math.random() * 10) + 1
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const checkGuess = () => {
    const numericGuess = Number(guess);
    if (!numericGuess) return;

    setAttempts((prev) => prev + 1);

    if (numericGuess === targetNumber) {
      setMessage(language === "ar" ? "أحسنت! الرقم صحيح" : "Correct! You guessed it");
    } else if (numericGuess < targetNumber) {
      setMessage(language === "ar" ? "أكبر" : "Higher");
    } else {
      setMessage(language === "ar" ? "أصغر" : "Lower");
    }
  };

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 10) + 1);
    setGuess("");
    setMessage("");
    setAttempts(0);
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
      <h2 className="mb-4 text-center text-2xl font-bold text-[#1f2937] dark:text-white">
        {language === "ar" ? "تخمين الرقم" : "Number Guess"}
      </h2>

      <p className="mb-2 text-center text-sm text-gray-600 dark:text-gray-300">
        {language === "ar"
          ? "خمني رقمًا من 1 إلى 10"
          : "Guess a number from 1 to 10"}
      </p>

      <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-300">
        {language === "ar" ? `المحاولات: ${attempts}` : `Attempts: ${attempts}`}
      </p>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-center text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
        placeholder={language === "ar" ? "اكتبي الرقم" : "Enter number"}
      />

      <button
        onClick={checkGuess}
        className="mt-4 w-full rounded-2xl bg-[#1e3a5f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
      >
        {language === "ar" ? "تحقق" : "Check"}
      </button>

      {message && (
        <p className="mt-4 text-center font-bold text-[#c89b3c] dark:text-[#35c6c6]">
          {message}
        </p>
      )}

      <button
        onClick={resetGame}
        className="mt-4 w-full rounded-2xl border border-[#1e3a5f] px-5 py-3 text-sm font-semibold text-[#1e3a5f] transition hover:bg-[#1e3a5f] hover:text-white dark:border-[#35c6c6] dark:text-[#35c6c6] dark:hover:bg-[#35c6c6] dark:hover:text-[#0f172a]"
      >
        {language === "ar" ? "إعادة اللعب" : "Reset Game"}
      </button>
    </div>
  );
}

export default NumberGuess;