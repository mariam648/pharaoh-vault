import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  return {
    num1,
    num2,
    answer: num1 + num2,
  };
}

function QuickMath() {
  const { language } = useLanguage();
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (timeLeft <= 0) {
      setResult(language === "ar" ? "انتهى الوقت" : "Time is up");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, language]);

  const checkAnswer = () => {
    if (Number(userAnswer) === question.answer) {
      setScore((prev) => prev + 1);
      setResult(language === "ar" ? "إجابة صحيحة!" : "Correct Answer!");
    } else {
      setResult(language === "ar" ? "إجابة خاطئة!" : "Wrong Answer!");
    }

    setUserAnswer("");
    setQuestion(generateQuestion());
  };

  const resetGame = () => {
    setQuestion(generateQuestion());
    setUserAnswer("");
    setResult("");
    setScore(0);
    setTimeLeft(15);
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
      <h2 className="mb-4 text-center text-2xl font-bold text-[#1f2937] dark:text-white">
        {language === "ar" ? "الحساب السريع" : "Quick Math"}
      </h2>

      <p className="mb-2 text-center text-sm text-gray-600 dark:text-gray-300">
        {language === "ar" ? `الوقت: ${timeLeft}` : `Time: ${timeLeft}`}
      </p>

      <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-300">
        {language === "ar" ? `النقاط: ${score}` : `Score: ${score}`}
      </p>

      <div className="mb-4 text-center text-3xl font-extrabold text-[#1e3a5f] dark:text-[#35c6c6]">
        {question.num1} + {question.num2} = ?
      </div>

      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-center text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white"
        placeholder={language === "ar" ? "اكتبي الإجابة" : "Enter answer"}
      />

      <button
        onClick={checkAnswer}
        className="mt-4 w-full rounded-2xl bg-[#1e3a5f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
      >
        {language === "ar" ? "تحقق" : "Check"}
      </button>

      {result && (
        <p className="mt-4 text-center font-bold text-[#c89b3c] dark:text-[#35c6c6]">
          {result}
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

export default QuickMath;