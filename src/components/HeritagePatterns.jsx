export default function HeritagePatterns() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <CornerOrnament position="top-left" />
            <CornerOrnament position="top-right" />
            <CornerOrnament position="bottom-left" />
            <CornerOrnament position="bottom-right" />
            <FloatingPaisley />
        </div>
    );
}

function CornerOrnament({ position }) {
    const positionClasses = {
        "top-left": "top-0 left-0",
        "top-right": "top-0 right-0 rotate-90",
        "bottom-left": "bottom-0 left-0 -rotate-90",
        "bottom-right": "bottom-0 right-0 rotate-180",
    };

    return (
        <div className={`absolute ${positionClasses[position]} w-32 h-32 md:w-48 md:h-48`}>
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-[#C6A45E]/[0.03]"
                fill="currentColor"
            >
                <path d="M0,0 Q50,0 50,50 Q50,0 100,0 L100,10 Q55,10 50,55 Q45,10 0,10 Z" />
                <circle cx="50" cy="15" r="3" />
                <circle cx="35" cy="10" r="2" />
                <circle cx="65" cy="10" r="2" />
                <path d="M0,20 Q30,20 35,50 Q40,20 0,20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M20,0 Q20,30 50,35 Q20,40 20,0" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
        </div>
    );
}

function FloatingPaisley() {
    const paisleyPositions = [
        { top: "15%", left: "5%", size: "40px", delay: "0s" },
        { top: "25%", right: "8%", size: "50px", delay: "1s" },
        { top: "60%", left: "3%", size: "35px", delay: "2s" },
        { top: "70%", right: "5%", size: "45px", delay: "0.5s" },
        { top: "85%", left: "10%", size: "30px", delay: "1.5s" },
    ];

    return (
        <>
            {paisleyPositions.map((pos, i) => (
                <div
                    key={i}
                    className="absolute opacity-[0.02] animate-float"
                    style={{
                        top: pos.top,
                        left: pos.left,
                        right: pos.right,
                        width: pos.size,
                        height: pos.size,
                        animationDelay: pos.delay,
                    }}
                >
                    <svg viewBox="0 0 50 50" className="w-full h-full text-[#C6A45E]" fill="currentColor">
                        <path d="M25,5 Q45,15 40,35 Q35,50 20,45 Q5,40 10,25 Q15,10 25,5 Z" />
                        <circle cx="25" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="25" cy="25" r="4" />
                    </svg>
                </div>
            ))}
        </>
    );
}
