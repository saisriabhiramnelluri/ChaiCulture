import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorGlow() {
    const glowRef = useRef(null);
    const trailRef = useRef(null);

    useEffect(() => {
        const glow = glowRef.current;
        const trail = trailRef.current;

        if (!glow || !trail) return;

        if (window.matchMedia("(pointer: coarse)").matches) {
            glow.style.display = "none";
            trail.style.display = "none";
            return;
        }

        const handleMouseMove = (e) => {
            gsap.to(glow, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power2.out",
            });

            gsap.to(trail, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: "power2.out",
            });
        };

        const handleMouseEnter = () => {
            gsap.to([glow, trail], {
                opacity: 1,
                duration: 0.3,
            });
        };

        const handleMouseLeave = () => {
            gsap.to([glow, trail], {
                opacity: 0,
                duration: 0.3,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <>
            <div
                ref={glowRef}
                className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2"
                style={{
                    background: "radial-gradient(circle, rgba(198,164,94,0.4) 0%, transparent 70%)",
                    filter: "blur(2px)",
                }}
            />
            <div
                ref={trailRef}
                className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-[9998] opacity-0 -translate-x-1/2 -translate-y-1/2"
                style={{
                    background: "radial-gradient(circle, rgba(198,164,94,0.08) 0%, transparent 70%)",
                    filter: "blur(20px)",
                }}
            />
        </>
    );
}
