import { useEffect, useState } from "react";

const Countdown = () => {
  // Offer শেষ হবে 30 June 2026 রাত 11:59:59
  const offerEndDate = new Date("2026-06-30T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = offerEndDate - now;

      if (distance <= 0) {
        clearInterval(timer);

        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });

        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      );

      const seconds = Math.floor(
        (distance % (1000 * 60)) /
          1000
      );

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <div className="text-center">
        <p className="text-xs">Days</p>
        <div className="bg-black text-white px-2 py-1 rounded">
          {timeLeft.days}
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs">Hour</p>
        <div className="bg-black text-white px-2 py-1 rounded">
          {timeLeft.hours}
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs">Min</p>
        <div className="bg-black text-white px-2 py-1 rounded">
          {timeLeft.minutes}
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs">Sec</p>
        <div className="bg-black text-white px-2 py-1 rounded">
          {timeLeft.seconds}
        </div>
      </div>
    </div>
  );
};

export default Countdown;