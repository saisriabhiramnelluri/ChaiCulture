import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import HeroVideo from "../components/HeroVideo";
import BrandIntro from "../components/BrandIntro";
import CountdownTimer from "../components/CountdownTimer";
import EmailSignup from "../components/EmailSignup";
import SocialIcons from "../components/SocialIcons";
import Footer from "../components/Footer";
import HeritagePatterns from "../components/HeritagePatterns";
import CursorGlow from "../components/CursorGlow";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const mainRef = useRef(null);
    const lenisRef = useRef(null);

    useEffect(() => {
        if (isLoading) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, [isLoading]);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

            <CursorGlow />
            <HeritagePatterns />

            <main
                ref={mainRef}
                className={`relative bg-[#1e120b] text-[#F6F1EA] overflow-x-hidden transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"
                    }`}
            >
                <Navbar />
                <HeroVideo />
                <BrandIntro />

                <section className="relative py-16 px-6">
                    <CountdownTimer />
                </section>

                <EmailSignup />
                <SocialIcons />
                <Footer />
                <BackToTop />
            </main>
        </>
    );
}

function BackToTop() {
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                gsap.to(buttonRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    pointerEvents: "auto",
                });
            } else {
                gsap.to(buttonRef.current, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3,
                    pointerEvents: "none",
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            ref={buttonRef}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-[#B89345] via-[#C6A45E] to-[#D4BA7A] text-[#2B1E16] flex items-center justify-center opacity-0 scale-75 hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-[#C6A45E]/40"
        >
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
            </svg>
        </button>
    );
}
