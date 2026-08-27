import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "text-sm font-medium py-2 px-3 flex items-center gap-[7px] transition duration-150 ease-in-out whitespace-nowrap rounded-xl h-10 " +
                (active
                    ? "text-[#2d1600] bg-[#ffb875] shadow-[0_4px_14px_rgba(255,184,117,0.25)]"
                    : "text-[#b9ab99] hover:bg-[rgba(255,184,117,0.08)]") +
                className
            }
        >
            {children}
        </Link>
    );
}
