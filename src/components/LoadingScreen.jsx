import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const textRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        gsap.fromTo(
            logoRef.current,
            { opacity: 0, scale: 0.5, rotateY: -180 },
            {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 1.5,
                ease: "power4.out",
            }
        );

        gsap.to(logoRef.current, {
            filter: "drop-shadow(0 0 40px rgba(198, 164, 94, 0.8))",
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1,
        });

        gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5,
                ease: "power3.out",
            }
        );
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const tl = gsap.timeline({
                onComplete: () => onComplete?.(),
            });

            tl.to(progressRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.3,
            })
                .to(textRef.current, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                }, "-=0.2")
                .to(logoRef.current, {
                    scale: 1.2,
                    filter: "drop-shadow(0 0 60px rgba(198, 164, 94, 1))",
                    duration: 0.5,
                })
                .to(logoRef.current, {
                    scale: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.in",
                })
                .to(containerRef.current, {
                    opacity: 0,
                    duration: 0.3,
                });
        }
    }, [progress, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1e120b]"
        >
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-40 h-40 border border-[#C6A45E] rounded-full" />
                <div className="absolute top-20 left-20 w-32 h-32 border border-[#C6A45E] rounded-full" />
                <div className="absolute bottom-10 right-10 w-40 h-40 border border-[#C6A45E] rounded-full" />
                <div className="absolute bottom-20 right-20 w-32 h-32 border border-[#C6A45E] rounded-full" />
            </div>

            <div className="absolute inset-0 bg-radial-gold opacity-30" />

            <div ref={logoRef} className="relative mb-8" style={{ perspective: "1000px" }}>
                <img
                    src="/images/logo.png"
                    alt="Chai Culture"
                    className="w-24 md:w-32"
                />
            </div>

            <div ref={textRef} className="text-center mb-8">
                <h1 className="font-playfair text-2xl md:text-3xl text-[#C6A45E] mb-2">
                    Chai Culture
                </h1>
                <p className="text-[#F6F1EA]/50 text-xs tracking-[3px] uppercase">
                    Brew the Royal Tradition
                </p>
            </div>

            <div ref={progressRef} className="w-48 md:w-64">
                <div className="h-[2px] bg-[#2B1E16] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#B89345] via-[#C6A45E] to-[#D4BA7A] transition-all duration-100"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-center text-[#C6A45E]/60 text-xs mt-3 tabular-nums">
                    {progress}%
                </p>
            </div>
        </div>
    );
}
