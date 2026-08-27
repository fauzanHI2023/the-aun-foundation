import React from "react";

const VARIANTS = {
    primary:
        "cta-glow text-[#fcf9f8] shadow-[0_12px_24px_-10px_rgba(172,108,41,0.55)] hover:-translate-y-0.5",
    secondary:
        "border-[1.5px] border-grey-light text-grey-light hover:-translate-y-0.5",
    ghost: "text-[#1c1b1b] opacity-70 hover:opacity-100",
    glow: "cta-glow text-white font-bold",
};

/**
 * Shared pill button used across the donation flow.
 * Pass `as="a"` + `href` to render a link instead of a <button>.
 */
export default function Button({
    as = "button",
    variant = "primary",
    href,
    onClick,
    className = "",
    children,
    ...rest
}) {
    const base =
        "inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[14.5px] font-semibold transition cursor-pointer";
    const classes = `${base} ${
        VARIANTS[variant] ?? VARIANTS.primary
    } ${className}`;

    if (as === "a") {
        return (
            <a href={href} onClick={onClick} className={classes} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={classes} {...rest}>
            {children}
        </button>
    );
}
