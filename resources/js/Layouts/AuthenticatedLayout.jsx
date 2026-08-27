import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { LayoutGrid, Receipt, Heart, Bell } from "lucide-react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const initials = (user?.name ?? "?")
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div className="min-h-screen bg-[radial-gradient(680px_420px_at_88%_-6%,rgba(255,184,117,.12),transparent_65%),radial-gradient(560px_380px_at_4%_18%,rgba(201,131,43,.09),transparent_60%),radial-gradient(700px_500px_at_60%_100%,rgba(92,52,0,.28),transparent_65%)] bg-[#141009]">
            <nav className="sticky top-0 z-50 py-4">
                <div className="mx-auto flex h-16 max-w-7xl items-center gap-10 rounded-full border border-white/[0.09] bg-white/[0.055] px-8 shadow-[0_14px_34px_rgba(0,0,0,0.4)] backdrop-blur-[22px]">
                    <Link
                        href="/"
                        className="flex shrink-0 items-center gap-2.5"
                    >
                        <div className="flex shrink-0 items-center">
                            {" "}
                            <Link href="/">
                                {" "}
                                <img
                                    src="/images/logo aun putih.png"
                                    alt="Rembulan Relief"
                                    className="h-12 w-auto"
                                />{" "}
                            </Link>{" "}
                        </div>
                    </Link>

                    <div className="hidden items-center gap-1 sm:flex">
                        <NavItem
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            icon={LayoutGrid}
                        >
                            Dashboard
                        </NavItem>
                        <NavItem icon={Receipt}>Transaction History</NavItem>
                        <NavItem icon={Heart}>My Campaign</NavItem>
                    </div>

                    <div className="ms-auto hidden items-center gap-2 sm:flex">
                        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.09] bg-white/5 text-white/70 transition hover:border-[#ffb875]/35 hover:text-[#ffb875]">
                            <Bell size={16} />
                            <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full bg-[#ff9086] shadow-[0_0_0_2px_#1a1510]" />
                        </button>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="flex items-center gap-[9px] rounded-full border border-white/[0.09] bg-white/5 py-1 pl-1 pr-3 text-white"
                                >
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#ffb875] to-[#c9832b] text-[11px] font-bold text-[#2d1600]">
                                        {initials}
                                    </span>
                                    <span className="text-[12.5px] font-semibold">
                                        {user.name}
                                    </span>
                                    <svg
                                        className="ms-1 h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    <div className="-me-2 ms-auto flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown((prev) => !prev)
                            }
                            className="inline-flex items-center justify-center rounded-md p-2 text-white/70 hover:text-white"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " mx-auto mt-2 max-w-7xl rounded-2xl border border-white/[0.09] bg-white/[0.055] px-4 backdrop-blur-[22px] sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-white/10 pb-1 pt-4">
                        <div className="px-2">
                            <div className="text-base font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-white/50">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-white">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

function NavItem({ href, active, icon: Icon, children }) {
    const Tag = href ? Link : "span";

    return (
        <Tag
            href={href}
            className={`flex items-center gap-[7px] whitespace-nowrap rounded-full px-[15px] py-[9px] font-medium text-[13.5px] transition ${
                active
                    ? "bg-primary text-white"
                    : "text-white/60 hover:bg-[#ffb875]/[0.08] hover:text-white"
            }`}
        >
            <Icon size={15} className="opacity-80" />
            {children}
        </Tag>
    );
}
