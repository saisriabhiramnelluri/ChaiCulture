import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const navRef = useRef(null);
    const logoRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollY / docHeight) * 100;

            setScrolled(scrollY > 50);
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (logoRef.current) {
            gsap.to(logoRef.current, {
                filter: "drop-shadow(0 0 15px rgba(198, 164, 94, 0.6))",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }, []);

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "py-3 bg-[#1e120b]/80 backdrop-blur-xl border-b border-[#C6A45E]/20"
                    : "py-6 bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            ref={logoRef}
                            src="/images/logo.png"
                            alt="Chai Culture"
                            className={`transition-all duration-500 ${scrolled ? "w-10 h-10" : "w-12 h-12"
                                }`}
                        />
                        <span className={`font-playfair text-[#C6A45E] transition-all duration-500 ${scrolled ? "text-lg" : "text-xl"
                            }`}>
                            Chai Culture
                        </span>
                    </div>

                    <button className="relative group px-6 py-2.5 rounded-full overflow-hidden">
                        <span className="absolute inset-0 bg-gradient-to-r from-[#B89345] via-[#C6A45E] to-[#D4BA7A] transition-transform duration-500 group-hover:scale-105"></span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#D4BA7A] via-[#C6A45E] to-[#B89345] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                        <span className="relative text-[#2B1E16] font-medium text-sm tracking-wide">
                            Get Notified
                        </span>
                    </button>
                </div>
            </nav>

            <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-transparent">
                <div
                    className="h-full bg-gradient-to-r from-[#B89345] via-[#C6A45E] to-[#D4BA7A] transition-all duration-150"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
        </>
    );
}
