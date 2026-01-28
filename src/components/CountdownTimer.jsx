import { useState, useEffect } from "react";

export default function CountdownTimer() {
    const launchDate = new Date("2026-01-29T00:00:00").getTime();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = launchDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [launchDate]);

    const timeUnits = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <div className="flex flex-col items-center">
            <p className="text-[#F6F1EA]/50 text-xs tracking-[4px] uppercase mb-6">
                Launching In
            </p>

            <div className="flex items-center gap-3 md:gap-6">
                {timeUnits.map((unit, index) => (
                    <div key={unit.label} className="flex items-center gap-3 md:gap-6">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#B89345]/20 via-[#C6A45E]/20 to-[#D4BA7A]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative flex flex-col items-center px-4 py-3 md:px-6 md:py-4 rounded-xl bg-[#2B1E16]/60 backdrop-blur-sm border border-[#C6A45E]/20 min-w-[70px] md:min-w-[90px]">
                                <span className="font-playfair text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#D4BA7A] to-[#C6A45E] tabular-nums">
                                    {String(unit.value).padStart(2, "0")}
                                </span>

                                <span className="text-[#F6F1EA]/40 text-[10px] md:text-xs uppercase tracking-wider mt-1">
                                    {unit.label}
                                </span>
                            </div>
                        </div>

                        {index < timeUnits.length - 1 && (
                            <span className="text-[#C6A45E]/40 text-2xl md:text-4xl font-light animate-pulse">
                                :
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
