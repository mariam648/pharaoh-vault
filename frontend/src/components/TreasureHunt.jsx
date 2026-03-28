import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function TreasureHunt() {
  const { language } = useLanguage();
  const [treasureIndex, setTreasureIndex] = useState(
    Math.floor(Math.random() * 9)
  );
  const [openedBoxes, setOpenedBoxes] = useState([]);
  const [message, setMessage] = useState(
    language === "ar" ? "اختاري صندوقًا" : "Choose a box"
  );
  const [foundTreasure, setFoundTreasure] = useState(false);

  useEffect(() => {
    if (!foundTreasure && openedBoxes.length === 0) {
      setMessage(language === "ar" ? "اختاري صندوقًا" : "Choose a box");
    }
  }, [language, foundTreasure, openedBoxes.length]);

  const handleBoxClick = (index) => {
    if (openedBoxes.includes(index) || foundTreasure) return;

    const updatedBoxes = [...openedBoxes, index];
    setOpenedBoxes(updatedBoxes);

    if (index === treasureIndex) {
      setFoundTreasure(true);
      setMessage(
        language === "ar"
          ? "مبروك! لقد وجدتِ الكنز"
          : "Congratulations! You found the treasure"
      );
    } else {
      setMessage(
        language === "ar"
          ? "ليس هنا... حاولي مرة أخرى"
          : "Not here... try again"
      );
    }
  };

  const resetGame = () => {
    setTreasureIndex(Math.floor(Math.random() * 9));
    setOpenedBoxes([]);
    setFoundTreasure(false);
    setMessage(language === "ar" ? "اختاري صندوقًا" : "Choose a box");
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
      <h2 className="mb-4 text-center text-2xl font-bold text-[#1f2937] dark:text-white">
        {language === "ar" ? "البحث عن الكنز" : "Treasure Hunt"}
      </h2>

      <p className="mb-5 text-center font-semibold text-[#c89b3c] dark:text-[#35c6c6]">
        {message}
      </p>

      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index) => {
          const isOpened = openedBoxes.includes(index);
          const isTreasure = index === treasureIndex && foundTreasure;

          return (
            <button
              key={index}
              onClick={() => handleBoxClick(index)}
              className={`flex h-24 items-center justify-center rounded-3xl text-3xl shadow transition hover:scale-105 ${
                isTreasure
                  ? "bg-[#c89b3c] text-white dark:bg-[#35c6c6] dark:text-[#0f172a]"
                  : isOpened
                  ? "bg-[#e5dccb] text-[#1e3a5f] dark:bg-[#243447] dark:text-white"
                  : "bg-[#1e3a5f] text-white dark:bg-[#102038] dark:text-[#35c6c6]"
              }`}
            >
              {isTreasure ? "👑" : isOpened ? "✖" : "📦"}
            </button>
          );
        })}
      </div>

      <button
        onClick={resetGame}
        className="mt-5 w-full rounded-2xl bg-[#1e3a5f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
      >
        {language === "ar" ? "إعادة اللعب" : "Reset Game"}
      </button>
    </div>
  );
}

export default TreasureHunt;