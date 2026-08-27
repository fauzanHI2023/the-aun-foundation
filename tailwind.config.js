import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./app/Filament/**/*.php",
        "./resources/views/**/*.blade.php",
        "./vendor/filament/**/*.blade.php",
        "./resources/views/filament/**/*.blade.php",
        "./vendor/filament/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans],
                heading: ["Exo 2", "sans-serif"],
            },
            backgroundImage: {
                "amber-fade":
                    "linear-gradient(135deg, #B9873F 0%, #6B4226 68%, #4a2d18 100%)",
            },
            colors: {
                primary: "#744D2C",
                secondary: "#8b5e34",
                "secondary-orange": "#A66329",
                third: "#232629",
                fourty: "#4D3A28",
                "grey-primary": "#524439",
                "grey-light": "#7A7672",
                "primary-two": "#AF9B7E",
                "primary-light": "#f2952f",
                "secondary-blue": "#00004B",
                "primary-black": "#161511",
                "primary-white": "#f3f3f2",
                "on-primary": "#402e32",
                "primary-container": "#a56623",
                "on-primary-container": "#3a1f00",
                background: "#FEFEFE",
                "background-primary": "#F3F3F2",
                "on-background": "#201a18",
                "tertiary-container": "#a06834",
                surface: "#fff8f5",
                surfacedark: "#fcf9f8",
                "on-surface-dark": "#1c1b1b",
                "on-surface": "#201a18",
                "border-grey": "#e6e6e6",
                "amber-light": "#B9873F",
                "amber-dark": "#6B4226",
                "warm-accent": "#8B5E34",
                "light-accent": "#AF9B7E",
            },
            fontSize: {
                "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
                "label-caps": [
                    "12px",
                    {
                        lineHeight: "1",
                        letterSpacing: "0.1em",
                        fontWeight: "700",
                    },
                ],
                "headline-md": [
                    "36px",
                    { lineHeight: "1.2", fontWeight: "600" },
                ],
                "headline-sm": [
                    "28px",
                    { lineHeight: "1.3", fontWeight: "600" },
                ],
                "display-lg": [
                    "50px",
                    {
                        lineHeight: "1.1",
                        letterSpacing: "-0.01em",
                        fontWeight: "700",
                    },
                ],
                "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
                "display-lg-mobile": [
                    "48px",
                    {
                        lineHeight: "1.2",
                        letterSpacing: "-0.01em",
                        fontWeight: "700",
                    },
                ],
            },
            keyframes: {
                shake: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-5px)" },
                    "75%": { transform: "translateX(5px)" },
                },
                spin: { to: { transform: "rotate(360deg)" } },
                radar: {
                    "0%": { transform: "scale(.5)", opacity: "0.6" },
                    "100%": { transform: "scale(2.4)", opacity: "0" },
                },
                fadeUp: {
                    from: { opacity: "0", transform: "translateY(16px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                blink: {
                    "0%, 100%": { opacity: "0.3" },
                    "50%": { opacity: "1" },
                },
                nfSpin: { to: { transform: "rotate(360deg)" } },
                nfBob: {
                    "0%, 100%": { transform: "translateY(0) rotate(-6deg)" },
                    "50%": { transform: "translateY(-6px) rotate(4deg)" },
                },
                nfDrift: {
                    "0%": { opacity: "0", transform: "translateY(6px)" },
                    "35%": { opacity: "0.7" },
                    "70%": { opacity: "0.7" },
                    "100%": { opacity: "0", transform: "translateY(-8px)" },
                },
            },
            animation: {
                shake: "shake .35s ease",
                spin: "spin .8s linear infinite",
                radar: "radar 1.8s ease-out infinite",
                fadeUp: "fadeUp .5s cubic-bezier(.2,.8,.2,1)",
                fadeIn: "fadeIn .4s ease",
                blink: "blink 1.4s ease-in-out infinite",
                "nf-spin": "nfSpin 14s linear infinite",
                "nf-spin-rev": "nfSpin 10s linear infinite reverse",
                "nf-bob": "nfBob 3.2s ease-in-out infinite",
                "nf-drift": "nfDrift 3.6s ease-in-out infinite",
            },
            borderRadius: {
                DEFAULT: "0.5rem",
                lg: "1rem",
                xl: "1.5rem",
                full: "9999px",
            },
            spacing: {
                "margin-mobile": "20px",
                gutter: "32px",
                "stack-lg": "32px",
                "container-max": "1280px",
                "stack-sm": "8px",
                "stack-xl": "80px",
                "stack-md": "16px",
                "margin-desktop": "64px",
            },
        },
    },

    plugins: [forms],
};
