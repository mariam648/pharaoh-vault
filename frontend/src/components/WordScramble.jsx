import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const words = [
  { en: "pharaoh", ar: "فرعون" },
  { en: "pyramid", ar: "هرم" },
  { en: "gold", ar: "ذهب" },
  { en: "temple", ar: "معبد" },
  { en: "scarab", ar: "جعران" },
];

function shuffleWord(word) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

function WordScramble() {
  const { language } = useLanguage();
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [scrambled, setScrambled] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  const nextWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setScrambled(shuffleWord(randomWord.en));
    setAnswer("");
  };

  useEffect(() => {
    nextWord();
  }, []);

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === currentWord.en.toLowerCase()) {
      setScore((prev) => prev + 1);
      setMessage(language === "ar" ? "إجابة صحيحة!" : "Correct!");
    } else {
      setMessage(language === "ar" ? "حاولي مرة أخرى" : "Try again");
    }

    setTimeout(() => {
      setMessage("");
      nextWord();
    }, 800);
  };

  const resetGame = () => {
    setScore(0);
    setMessage("");
    nextWord();
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
      <h2 className="mb-4 text-center text-2xl font-bold text-[#1f2937] dark:text-white">
        {language === "ar" ? "ترتيب الكلمات" : "Word Scramble"}
      </h2>

      <p className="mb-2 text-center text-sm text-gray-600 dark:text-gray-300">
        {language === "ar" ? `النقاط: ${score}` : `Score: ${score}`}
      </p>

      <p className="mb-5 text-center text-3xl font-extrabold tracking-widest text-[#1e3a5f] dark:text-[#35c6c6]">
        {scrambled}
      </p>

      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-center text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
        placeholder={language === "ar" ? "اكتبي الكلمة الصحيحة بالإنجليزية" : "Type the correct word"}
      />

      <button
        onClick={checkAnswer}
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

export default WordScramble;