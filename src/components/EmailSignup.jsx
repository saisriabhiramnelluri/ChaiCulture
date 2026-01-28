import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EmailSignup() {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || status === "loading") return;

        setStatus("loading");

        gsap.to(buttonRef.current, {
            scale: 0.95,
            duration: 0.1,
        });

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus("success");
        setEmail("");

        gsap.timeline()
            .to(buttonRef.current, {
                scale: 1.05,
                duration: 0.2,
                ease: "back.out(2)",
            })
            .to(buttonRef.current, {
                scale: 1,
                duration: 0.3,
            });

        createConfetti();

        setTimeout(() => setStatus("idle"), 3000);
    };

    const createConfetti = () => {
        const colors = ["#C6A45E", "#D4BA7A", "#B89345", "#F6F1EA"];
        const container = sectionRef.current;

        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement("div");
            confetti.className = "absolute w-2 h-2 rounded-full pointer-events-none";
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = "50%";
            confetti.style.top = "50%";
            container.appendChild(confetti);

            gsap.to(confetti, {
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
                rotation: Math.random() * 720,
                opacity: 0,
                scale: Math.random() + 0.5,
                duration: 1 + Math.random(),
                ease: "power2.out",
                onComplete: () => confetti.remove(),
            });
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-20 px-6 flex justify-center items-center"
        >
            <div
                ref={formRef}
                className="relative w-full max-w-lg p-8 md:p-10 rounded-3xl bg-[#2B1E16]/60 backdrop-blur-xl border border-[#C6A45E]/20 shadow-2xl"
            >
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#B89345]/20 via-[#C6A45E]/20 to-[#D4BA7A]/20 blur-xl opacity-50" />

                <div className="relative z-10">
                    <h2 className="font-playfair text-2xl md:text-3xl text-[#C6A45E] text-center mb-3">
                        Be the First to Know
                    </h2>
                    <p className="text-[#F6F1EA]/60 text-center text-sm mb-8">
                        Join our exclusive waitlist for early access
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <div
                                className={`absolute -inset-[1px] rounded-full transition-opacity duration-300 ${isFocused
                                    ? "opacity-100 bg-gradient-to-r from-[#B89345] via-[#C6A45E] to-[#D4BA7A]"
                                    : "opacity-0"
                                    }`}
                            />
                            <input
                                ref={inputRef}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Enter your email"
                                disabled={status === "loading"}
                                className="relative w-full rounded-full bg-[#1e120b] border border-[#C6A45E]/30 px-6 py-4 text-[#F6F1EA] placeholder:text-[#F6F1EA]/40 focus:outline-none transition-all duration-300"
                            />
                        </div>

                        <button
                            ref={buttonRef}
                            type="submit"
                            disabled={status === "loading"}
                            className="relative w-full group overflow-hidden rounded-full py-4 transition-all duration-300"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#B89345] via-[#C6A45E] to-[#D4BA7A] transition-transform duration-500 group-hover:scale-105" />
                            <span className="absolute inset-0 bg-gradient-to-r from-[#D4BA7A] via-[#C6A45E] to-[#B89345] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative flex items-center justify-center gap-2 text-[#2B1E16] font-semibold tracking-wide">
                                {status === "loading" ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        Joining...
                                    </span>
                                ) : status === "success" ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        You're In!
                                    </span>
                                ) : (
                                    "Notify Me"
                                )}
                            </span>
                        </button>
                    </form>

                    <p className="text-[#F6F1EA]/40 text-xs text-center mt-4">
                        No spam, only royal updates
                    </p>
                </div>
            </div>
        </section>
    );
}
