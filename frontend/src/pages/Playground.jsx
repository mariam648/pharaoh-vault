import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import TicTacToe from "../components/TicTacToe";
import MemoryGame from "../components/MemoryGame";
import RockPaperScissors from "../components/RockPaperScissors";
import QuickMath from "../components/QuickMath";
import NumberGuess from "../components/NumberGuess";
import ReactionTap from "../components/ReactionTap";
import WordScramble from "../components/WordScramble";
import PharaohSequence from "../components/PharaohSequence";
import TreasureHunt from "../components/TreasureHunt";
import PharaohEscape from "../components/PharaohEscape";


const games = [
  { id: 1, nameEn: "Tic Tac Toe", nameAr: "إكس أو", statusEn: "Playable", statusAr: "قابلة للعب" },
  { id: 2, nameEn: "Memory Cards", nameAr: "لعبة الذاكرة", statusEn: "Playable", statusAr: "قابلة للعب" },
  { id: 3, nameEn: "Quick Math", nameAr: "الحساب السريع", statusEn: "Coming Soon", statusAr: "قريبًا" },
  { id: 4, nameEn: "Color Match", nameAr: "مطابقة الألوان", statusEn: "Coming Soon", statusAr: "قريبًا" },
  { id: 5, nameEn: "Pattern Match", nameAr: "مطابقة الأنماط", statusEn: "Coming Soon", statusAr: "قريبًا" },
  { id: 6, nameEn: "Word Scramble", nameAr: "ترتيب الكلمات", statusEn: "Coming Soon", statusAr: "قريبًا" },
  { id: 7, nameEn: "Reaction Tap", nameAr: "سرعة النقر", statusEn: "Coming Soon", statusAr: "قريبًا" },
  { id: 8, nameEn: "Number Guess", nameAr: "تخمين الرقم", statusEn: "Coming Soon", statusAr: "قريبًا" },
  { id: 9, nameEn: "Puzzle Slide", nameAr: "البازل المنزلق", statusEn: "Coming Soon", statusAr: "قريبًا" },
  { id: 10, nameEn: "Rock Paper Scissors", nameAr: "حجر ورقة مقص", statusEn: "Coming Soon", statusAr: "قريبًا" },
];

function Playground() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#c89b3c]">
            {language === "ar" ? "منطقة الترفيه" : "Fun Zone"}
          </p>

          <h1 className="text-4xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0] sm:text-5xl">
            {language === "ar" ? "ساحة الألعاب" : "Playground"}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300">
            {language === "ar"
              ? "استمتعي بألعاب سريعة وممتعة، واحصلي على خصومات عند الفوز."
              : "Enjoy fun quick games and unlock discounts when you win."}
          </p>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
            {language === "ar" ? "الألعاب القابلة للعب الآن" : "Playable Games"}
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
  <TicTacToe />
  <MemoryGame />
  <RockPaperScissors />
  <QuickMath />
  <NumberGuess />
  <ReactionTap />
  <WordScramble />
  <PharaohSequence />
  <TreasureHunt />
  <PharaohEscape />
</div>
        </div>

        <div>
          <h2 className="mb-6 text-3xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
            {language === "ar" ? "باقي الألعاب" : "More Games"}
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {games.slice(2).map((game) => (
              <div
                key={game.id}
                className="rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]"
              >
                <h3 className="text-xl font-bold text-[#1f2937] dark:text-white">
                  {language === "ar" ? game.nameAr : game.nameEn}
                </h3>

                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  {language === "ar" ? game.statusAr : game.statusEn}
                </p>

                <button
                  disabled
                  className="mt-5 cursor-not-allowed rounded-2xl bg-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 dark:bg-[#243447] dark:text-gray-300"
                >
                  {language === "ar" ? "قريبًا" : "Coming Soon"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Playground;