import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandIntro() {
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const badgeRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                logoRef.current,
                { opacity: 0, scale: 0.6, filter: "blur(20px)" },
                {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.to(logoRef.current, {
                y: -15,
                filter: "drop-shadow(0 0 30px rgba(198, 164, 94, 0.6))",
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1.5,
            });

            if (titleRef.current) {
                const chars = titleRef.current.querySelectorAll(".char");
                gsap.fromTo(
                    chars,
                    { opacity: 0, y: 50, rotateX: -90 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        stagger: 0.04,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 70%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            gsap.fromTo(
                descRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.fromTo(
                badgeRef.current,
                { opacity: 0, scale: 0.8, y: 20 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.to(containerRef.current, {
                yPercent: -10,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const title = "Brew the Royal Tradition";

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 -mt-[20vh]"
        >
            <div className="absolute inset-0 bg-radial-gold opacity-10 pointer-events-none" />

            <img
                ref={logoRef}
                src="/images/logo.png"
                alt="Chai Culture"
                className="w-[130px] md:w-[150px] mb-8"
            />

            <h1
                ref={titleRef}
                className="font-playfair text-4xl md:text-6xl lg:text-7xl mb-6 perspective-1000"
            >
                {title.split("").map((char, i) => (
                    <span
                        key={i}
                        className="char inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#B89345] via-[#C6A45E] to-[#D4BA7A]"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </h1>

            <p
                ref={descRef}
                className="max-w-xl text-[#F6F1EA]/80 text-base md:text-lg leading-relaxed"
            >
                Premium instant chai inspired by royal Indian households — crafted
                for timeless taste and heritage. Experience the luxury of
                tradition in every sip.
            </p>

            <div
                ref={badgeRef}
                className="mt-10 relative group cursor-pointer"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#B89345] via-[#C6A45E] to-[#D4BA7A] rounded-full opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500" />
                <div className="relative px-8 py-3 bg-[#1e120b] rounded-full border border-[#C6A45E]/30">
                    <span className="tracking-[4px] text-xs md:text-sm text-[#C6A45E] font-medium uppercase">
                        Launching Soon
                    </span>
                </div>
            </div>

            <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#C6A45E]/5 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-[#C6A45E]/5 blur-3xl" />
        </section>
    );
}
