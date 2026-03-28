import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useCoupon } from "../context/CouponContext";

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function TicTacToe() {
  const { language } = useLanguage();
  const { claimCoupon } = useCoupon();

  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [isDraw, setIsDraw] = useState(false);
  const [couponClaimed, setCouponClaimed] = useState(false);

  const checkWinner = (updatedBoard) => {
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];

      if (
        updatedBoard[a] &&
        updatedBoard[a] === updatedBoard[b] &&
        updatedBoard[a] === updatedBoard[c]
      ) {
        return updatedBoard[a];
      }
    }
    return "";
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;

    const gameWinner = checkWinner(updatedBoard);

    setBoard(updatedBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }

    const boardIsFull = updatedBoard.every((cell) => cell !== "");
    if (boardIsFull) {
      setIsDraw(true);
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  useEffect(() => {
    if (winner && !couponClaimed) {
      claimCoupon("XO15", 15);
      setCouponClaimed(true);
    }
  }, [winner, couponClaimed, claimCoupon]);

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("");
    setIsDraw(false);
    setCouponClaimed(false);
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-[#d8c39b] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
      <h2 className="mb-4 text-center text-2xl font-bold text-[#1f2937] dark:text-white">
        {language === "ar" ? "لعبة إكس أو" : "Tic Tac Toe"}
      </h2>

      <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-300">
        {winner
          ? language === "ar"
            ? `الفائز: ${winner}`
            : `Winner: ${winner}`
          : isDraw
          ? language === "ar"
            ? "تعادل"
            : "Draw"
          : language === "ar"
          ? `الدور على: ${currentPlayer}`
          : `Turn: ${currentPlayer}`}
      </p>

      {winner && (
        <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-center">
          <p className="font-bold text-green-700">
            {language === "ar"
              ? "أحسنت! لقد ربحت اللعبة."
              : "Great job! You won the game."}
          </p>
          <p className="mt-2 text-sm text-green-600">
            {language === "ar"
              ? "لقد حصلت على كوبون خصم 15%: XO15"
              : "You unlocked a 15% discount coupon: XO15"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="flex h-24 items-center justify-center rounded-2xl bg-[#f0e2d6] text-3xl font-extrabold text-[#1e3a5f] shadow transition hover:scale-105 dark:bg-[#102038] dark:text-[#35c6c6]"
          >
            {cell}
          </button>
        ))}
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

export default TicTacToe;