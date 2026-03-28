import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function ReactionTap() {
  const { language } = useLanguage();
  const [status, setStatus] = useState("waiting");
  const [message, setMessage] = useState(
    language === "ar" ? "اضغطي ابدأ" : "Press start"
  );
  const [reactionTime, setReactionTime] = useState(null);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    setMessage(language === "ar" ? "اضغطي ابدأ" : "Press start");
  }, [language]);

  const startGame = () => {
    setStatus("ready");
    setReactionTime(null);
    setMessage(language === "ar" ? "استعدي..." : "Get ready...");

    const delay = Math.floor(Math.random() * 3000) + 2000;

    timeoutRef.current = setTimeout(() => {
      setStatus("go");
      setMessage(language === "ar" ? "اضغطي الآن!" : "Tap now!");
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleTap = () => {
    if (status === "ready") {
      clearTimeout(timeoutRef.current);
      setStatus("waiting");
      setMessage(language === "ar" ? "بسرعة جدًا! ابدئي من جديد" : "Too early! Start again");
      return;
    }

    if (status === "go") {
      const endTime = Date.now();
      const time = endTime - startTimeRef.current;
      setReactionTime(time);
      setStatus("waiting");
      setMessage(
        language === "ar"
          ? `زمن رد فعلك: ${time} ms`
          : `Your reaction time: ${time} ms`
      );
    }
  };

  const resetGame = () => {
    clearTimeout(timeoutRef.current);
    setStatus("waiting");
    setReactionTime(null);
    setMessage(language === "ar" ? "اضغطي ابدأ" : "Press start");
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
      <h2 className="mb-4 text-center text-2xl font-bold text-[#1f2937] dark:text-white">
        {language === "ar" ? "سرعة النقر" : "Reaction Tap"}
      </h2>

      <div
        onClick={handleTap}
        className={`flex h-40 cursor-pointer items-center justify-center rounded-3xl text-center text-lg font-bold transition ${
          status === "go"
            ? "bg-green-500 text-white"
            : "bg-[#f7f1e7] text-[#1e3a5f] dark:bg-[#102038] dark:text-[#35c6c6]"
        }`}
      >
        {message}
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

      {reactionTime !== null && (
        <p className="mt-4 text-center font-bold text-[#c89b3c] dark:text-[#35c6c6]">
          {language === "ar"
            ? `النتيجة: ${reactionTime} مللي ثانية`
            : `Score: ${reactionTime} ms`}
        </p>
      )}
    </div>
  );
}

export default ReactionTap;