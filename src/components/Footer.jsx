import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative py-12 px-6 border-t border-[#C6A45E]/10"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-[#C6A45E]/5 to-transparent pointer-events-none" />

            <div ref={contentRef} className="relative max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/logo.png"
                            alt="Chai Culture"
                            className="w-8 h-8 opacity-60"
                        />
                        <span className="text-[#F6F1EA]/40 text-sm">
                            {new Date().getFullYear()} Chai Culture
                        </span>
                    </div>

                    <p className="font-playfair text-[#C6A45E]/60 text-sm italic">
                        Brew the Royal Tradition
                    </p>

                    <div className="flex items-center gap-6">
                        {["Privacy", "Terms", "Contact"].map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="group relative text-[#F6F1EA]/40 hover:text-[#C6A45E] text-xs uppercase tracking-wider transition-colors duration-300"
                            >
                                {link}
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A45E] group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
