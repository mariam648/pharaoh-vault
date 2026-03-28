import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useCoupon } from "../context/CouponContext";

const baseCards = ["𓁹", "𓃭", "𓆣", "𓋹", "𓂀", "𓅓"];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function MemoryGame() {
  const { language } = useLanguage();
  const { claimCoupon } = useCoupon();

  const initialCards = useMemo(() => {
    return shuffleArray(
      [...baseCards, ...baseCards].map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }))
    );
  }, []);

  const [cards, setCards] = useState(initialCards);
  const [selectedCards, setSelectedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [couponClaimed, setCouponClaimed] = useState(false);

  const matchedCount = cards.filter((card) => card.isMatched).length;
  const isWin = matchedCount === cards.length && cards.length > 0;

  const handleCardClick = (clickedCard) => {
    if (
      isLocked ||
      clickedCard.isFlipped ||
      clickedCard.isMatched ||
      selectedCards.length === 2
    ) {
      return;
    }

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );

    const updatedSelected = [...selectedCards, clickedCard.id];

    setCards(updatedCards);
    setSelectedCards(updatedSelected);

    if (updatedSelected.length === 2) {
      setMoves((prev) => prev + 1);
      setIsLocked(true);
    }
  };

  useEffect(() => {
    if (selectedCards.length !== 2) return;

    const [firstId, secondId] = selectedCards;
    const firstCard = cards.find((card) => card.id === firstId);
    const secondCard = cards.find((card) => card.id === secondId);

    if (!firstCard || !secondCard) return;

    if (firstCard.symbol === secondCard.symbol) {
      const timer = setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setSelectedCards([]);
        setIsLocked(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setSelectedCards([]);
        setIsLocked(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [selectedCards, cards]);

  useEffect(() => {
    if (isWin && !couponClaimed) {
      claimCoupon("MEMORY10", 10);
      setCouponClaimed(true);
    }
  }, [isWin, couponClaimed, claimCoupon]);

  const resetGame = () => {
    setCards(
      shuffleArray(
        [...baseCards, ...baseCards].map((symbol, index) => ({
          id: index,
          symbol,
          isFlipped: false,
          isMatched: false,
        }))
      )
    );
    setSelectedCards([]);
    setMoves(0);
    setIsLocked(false);
    setCouponClaimed(false);
  };

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
      <h2 className="mb-3 text-center text-2xl font-bold text-[#1f2937] dark:text-white">
        {language === "ar" ? "لعبة الذاكرة" : "Memory Cards"}
      </h2>

      <p className="mb-5 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
        {language === "ar" ? `عدد الحركات: ${moves}` : `Moves: ${moves}`}
      </p>

      {isWin && (
        <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-center">
          <p className="font-bold text-green-700">
            {language === "ar"
              ? "أحسنت! لقد أنهيت اللعبة."
              : "Great job! You completed the game."}
          </p>
          <p className="mt-2 text-sm text-green-600">
            {language === "ar"
              ? "لقد حصلت على كوبون خصم 10%: MEMORY10"
              : "You unlocked a 10% discount coupon: MEMORY10"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`flex h-20 items-center justify-center rounded-2xl text-2xl font-extrabold shadow transition hover:scale-105 sm:h-24 ${
              card.isFlipped || card.isMatched
                ? "bg-[#f7f1e7] text-[#1e3a5f] dark:bg-[#102038] dark:text-[#35c6c6]"
                : "bg-[#1e3a5f] text-white dark:bg-[#35c6c6] dark:text-[#0f172a]"
            }`}
          >
            {card.isFlipped || card.isMatched ? card.symbol : "?"}
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

export default MemoryGame;