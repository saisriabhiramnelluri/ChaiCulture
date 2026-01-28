/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                gold: {
                    DEFAULT: "#C6A45E",
                    light: "#D4BA7A",
                    dark: "#B89345",
                },
                chai: {
                    DEFAULT: "#2B1E16",
                    light: "#3D2A1F",
                },
                cream: {
                    DEFAULT: "#F6F1EA",
                    dark: "#E8E0D5",
                },
            },
            fontFamily: {
                playfair: ["Playfair Display", "serif"],
                inter: ["Inter", "sans-serif"],
            },
            backgroundImage: {
                "radial-gold": "radial-gradient(ellipse at center, rgba(198,164,94,0.15) 0%, transparent 70%)",
                "gradient-gold": "linear-gradient(135deg, #B89345 0%, #C6A45E 50%, #D4BA7A 100%)",
            },
            animation: {
                "float": "float 3s ease-in-out infinite",
                "shimmer": "shimmer 3s linear infinite",
                "glow": "glow 2s ease-in-out infinite",
                "fade-in": "fadeIn 1s ease-out forwards",
                "slide-up": "slideUp 0.8s ease-out forwards",
                "scale-in": "scaleIn 0.5s ease-out forwards",
                "pulse-slow": "pulse 3s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% center" },
                    "100%": { backgroundPosition: "200% center" },
                },
                glow: {
                    "0%, 100%": { filter: "drop-shadow(0 0 15px rgba(198,164,94,0.4))" },
                    "50%": { filter: "drop-shadow(0 0 30px rgba(198,164,94,0.7))" },
                },
                fadeIn: {
                    from: { opacity: 0, transform: "translateY(20px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
                slideUp: {
                    from: { opacity: 0, transform: "translateY(40px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
                scaleIn: {
                    from: { opacity: 0, transform: "scale(0.9)" },
                    to: { opacity: 1, transform: "scale(1)" },
                },
            },
            transitionTimingFunction: {
                "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
                "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
            },
            backdropBlur: {
                xs: "2px",
            },
            boxShadow: {
                "gold": "0 0 15px rgba(198,164,94,0.4), 0 0 30px rgba(198,164,94,0.2)",
                "gold-lg": "0 0 30px rgba(198,164,94,0.5), 0 0 60px rgba(198,164,94,0.3)",
            },
        },
    },
    plugins: [],
};
