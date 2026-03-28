import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const gridSize = 4;
const startPosition = 0;
const treasurePosition = 15;
const traps = [5, 10];

function PharaohEscape() {
  const { language } = useLanguage();
  const [playerPosition, setPlayerPosition] = useState(startPosition);
  const [movesLeft, setMovesLeft] = useState(8);
  const [message, setMessage] = useState(
    language === "ar" ? "وصلي إلى الكنز قبل انتهاء الحركات" : "Reach the treasure before moves run out"
  );
  const [gameOver, setGameOver] = useState(false);

  const movePlayer = (direction) => {
    if (gameOver || movesLeft <= 0) return;

    let newPosition = playerPosition;
    const row = Math.floor(playerPosition / gridSize);
    const col = playerPosition % gridSize;

    if (direction === "up" && row > 0) newPosition -= gridSize;
    if (direction === "down" && row < gridSize - 1) newPosition += gridSize;
    if (direction === "left" && col > 0) newPosition -= 1;
    if (direction === "right" && col < gridSize - 1) newPosition += 1;

    if (newPosition === playerPosition) return;

    const updatedMoves = movesLeft - 1;
    setPlayerPosition(newPosition);
    setMovesLeft(updatedMoves);

    if (traps.includes(newPosition)) {
      setMessage(language === "ar" ? "وقعتِ في فخ!" : "You fell into a trap!");
      setGameOver(true);
      return;
    }

    if (newPosition === treasurePosition) {
      setMessage(language === "ar" ? "مبروك! وصلتي إلى الكنز" : "You found the treasure!");
      setGameOver(true);
      return;
    }

    if (updatedMoves === 0) {
      setMessage(language === "ar" ? "انتهت الحركات!" : "No moves left!");
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setPlayerPosition(startPosition);
    setMovesLeft(8);
    setGameOver(false);
    setMessage(
      language === "ar"
        ? "وصلي إلى الكنز قبل انتهاء الحركات"
        : "Reach the treasure before moves run out"
    );
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
      <h2 className="mb-3 text-center text-2xl font-bold text-[#1f2937] dark:text-white">
        {language === "ar" ? "هروب الفرعون" : "Pharaoh Escape"}
      </h2>

      <p className="mb-2 text-center text-sm text-gray-600 dark:text-gray-300">
        {language === "ar" ? `الحركات المتبقية: ${movesLeft}` : `Moves Left: ${movesLeft}`}
      </p>

      <p className="mb-5 text-center font-semibold text-[#c89b3c] dark:text-[#35c6c6]">
        {message}
      </p>

      <div className="mb-6 grid grid-cols-4 gap-2">
        {Array.from({ length: 16 }).map((_, index) => {
          const isPlayer = index === playerPosition;
          const isTreasure = index === treasurePosition;
          const isTrap = traps.includes(index) && gameOver;

          return (
            <div
              key={index}
              className={`flex h-16 items-center justify-center rounded-2xl text-2xl shadow ${
                isPlayer
                  ? "bg-[#1e3a5f] text-white dark:bg-[#35c6c6] dark:text-[#0f172a]"
                  : isTreasure && gameOver
                  ? "bg-[#c89b3c] text-white"
                  : isTrap
                  ? "bg-red-500 text-white"
                  : "bg-[#f7f1e7] text-[#1e3a5f] dark:bg-[#102038] dark:text-[#35c6c6]"
              }`}
            >
              {isPlayer ? "𓀀" : isTreasure && gameOver ? "👑" : isTrap ? "☠" : ""}
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <div className="flex justify-center">
          <button
            onClick={() => movePlayer("up")}
            className="rounded-2xl bg-[#1e3a5f] px-5 py-2 text-white dark:bg-[#35c6c6] dark:text-[#0f172a]"
          >
            ↑
          </button>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => movePlayer("left")}
            className="rounded-2xl bg-[#1e3a5f] px-5 py-2 text-white dark:bg-[#35c6c6] dark:text-[#0f172a]"
          >
            ←
          </button>
          <button
            onClick={() => movePlayer("down")}
            className="rounded-2xl bg-[#1e3a5f] px-5 py-2 text-white dark:bg-[#35c6c6] dark:text-[#0f172a]"
          >
            ↓
          </button>
          <button
            onClick={() => movePlayer("right")}
            className="rounded-2xl bg-[#1e3a5f] px-5 py-2 text-white dark:bg-[#35c6c6] dark:text-[#0f172a]"
          >
            →
          </button>
        </div>
      </div>

      <button
        onClick={resetGame}
        className="mt-5 w-full rounded-2xl border border-[#1e3a5f] px-5 py-3 text-sm font-semibold text-[#1e3a5f] transition hover:bg-[#1e3a5f] hover:text-white dark:border-[#35c6c6] dark:text-[#35c6c6] dark:hover:bg-[#35c6c6] dark:hover:text-[#0f172a]"
      >
        {language === "ar" ? "إعادة اللعب" : "Reset Game"}
      </button>
    </div>
  );
}

export default PharaohEscape;