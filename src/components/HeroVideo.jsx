import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const posterRef = useRef(null);
    const overlayRef = useRef(null);
    const particlesRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const poster = posterRef.current;

        if (!video) return;

        const handleCanPlay = () => {
            video.classList.remove("opacity-0");
            if (poster) poster.classList.add("opacity-0");
        };

        video.addEventListener("canplay", handleCanPlay);

        gsap.to(videoRef.current, {
            yPercent: 30,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            },
        });

        gsap.to(overlayRef.current, {
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            },
        });

        gsap.to(videoRef.current, {
            scale: 1.15,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        return () => {
            video.removeEventListener("canplay", handleCanPlay);
        };
    }, []);

    useEffect(() => {
        if (!particlesRef.current) return;

        const particles = particlesRef.current.children;

        Array.from(particles).forEach((particle, i) => {
            gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
            });

            gsap.to(particle, {
                y: `-=${Math.random() * 200 + 100}`,
                x: `+=${Math.random() * 100 - 50}`,
                opacity: Math.random() * 0.5 + 0.2,
                duration: Math.random() * 10 + 10,
                repeat: -1,
                ease: "none",
                delay: i * 0.5,
            });
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-[120vh] w-full overflow-hidden"
        >
            <img
                ref={posterRef}
                src="/images/chai-poster-alt.jpg"
                alt="Premium Chai"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms]"
            />

            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[2000ms] scale-100"
            >
                <source src="/video/chai-texture-alt.mp4" type="video/mp4" />
            </video>

            <div
                ref={overlayRef}
                className="absolute inset-0 bg-gradient-to-b from-[#1e120b]/30 via-[#1e120b]/40 to-[#1e120b]/90"
            />

            <div className="absolute inset-0 bg-radial-gold opacity-20" />

            <div
                ref={particlesRef}
                className="absolute inset-0 pointer-events-none overflow-hidden"
            >
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-[#C6A45E]/40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-[#C6A45E]/60 text-xs tracking-[3px] uppercase">Scroll</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-[#C6A45E]/60 to-transparent" />
            </div>
        </section>
    );
}
