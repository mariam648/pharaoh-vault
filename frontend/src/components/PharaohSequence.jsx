import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const symbols = ["𓁹", "𓃭", "𓆣", "𓋹"];

function PharaohSequence() {
  const { language } = useLanguage();
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [activeSymbol, setActiveSymbol] = useState(null);
  const [level, setLevel] = useState(1);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState(
    language === "ar" ? "ابدئي اللعبة" : "Start the game"
  );

  useEffect(() => {
    setMessage(language === "ar" ? "ابدئي اللعبة" : "Start the game");
  }, [language]);

  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const playSequence = async (currentSequence) => {
    setStatus("showing");
    setPlayerSequence([]);
    setMessage(language === "ar" ? "احفظي الترتيب..." : "Memorize the sequence...");

    for (let i = 0; i < currentSequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setActiveSymbol(currentSequence[i]);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setActiveSymbol(null);
    }

    setStatus("playing");
    setMessage(language === "ar" ? "دورك الآن" : "Your turn");
  };

  const startGame = () => {
    const firstSequence = [getRandomSymbol()];
    setSequence(firstSequence);
    setLevel(1);
    playSequence(firstSequence);
  };

  const handleSymbolClick = (symbol) => {
    if (status !== "playing") return;

    const updatedPlayerSequence = [...playerSequence, symbol];
    setPlayerSequence(updatedPlayerSequence);

    const currentIndex = updatedPlayerSequence.length - 1;

    if (updatedPlayerSequence[currentIndex] !== sequence[currentIndex]) {
      setStatus("idle");
      setMessage(language === "ar" ? "خسرتِ، حاولي مرة أخرى" : "You lost, try again");
      return;
    }

    if (updatedPlayerSequence.length === sequence.length) {
      const nextSequence = [...sequence, getRandomSymbol()];
      setLevel((prev) => prev + 1);
      setSequence(nextSequence);
      setTimeout(() => {
        playSequence(nextSequence);
      }, 800);
    }
  };

  const resetGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setActiveSymbol(null);
    setLevel(1);
    setStatus("idle");
    setMessage(language === "ar" ? "ابدئي اللعبة" : "Start the game");
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
      <h2 className="mb-4 text-center text-2xl font-bold text-[#1f2937] dark:text-white">
        {language === "ar" ? "تسلسل الفراعنة" : "Pharaoh Sequence"}
      </h2>

      <p className="mb-2 text-center text-sm text-gray-600 dark:text-gray-300">
        {language === "ar" ? `المستوى: ${level}` : `Level: ${level}`}
      </p>

      <p className="mb-5 text-center font-semibold text-[#c89b3c] dark:text-[#35c6c6]">
        {message}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {symbols.map((symbol) => (
          <button
            key={symbol}
            onClick={() => handleSymbolClick(symbol)}
            className={`flex h-24 items-center justify-center rounded-3xl text-3xl font-extrabold shadow transition ${
              activeSymbol === symbol
                ? "scale-105 bg-[#c89b3c] text-white dark:bg-[#35c6c6] dark:text-[#0f172a]"
                : "bg-[#e9e0cd] text-[#1e3a5f] hover:scale-105 dark:bg-[#102038] dark:text-[#35c6c6]"
            }`}
          >
            {symbol}
          </button>
        ))}
      </div>

      <button
        onClick={startGame}
        className="mt-5 w-full rounded-2xl bg-[#1e3a5f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
      >
        {language === "ar" ? "ابدأ اللعبة" : "Start Game"}
      </button>

      <button
        onClick={resetGame}
        className="mt-4 w-full rounded-2xl border border-[#1e3a5f] px-5 py-3 text-sm font-semibold text-[#1e3a5f] transition hover:bg-[#1e3a5f] hover:text-white dark:border-[#35c6c6] dark:text-[#35c6c6] dark:hover:bg-[#35c6c6] dark:hover:text-[#0f172a]"
      >
        {language === "ar" ? "إعادة اللعب" : "Reset Game"}
      </button>
    </div>
  );
}

export default PharaohSequence;