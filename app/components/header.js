'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Header component to display the navigation bar
const Header = () => {
    const pathname = usePathname();

    const navItems = [
        { label: "Home", href: "/home" },
        { label: "Modify", href: "/edit" },
        { label: "League Leaders", href: "/leader" },
        { label: "Trade simulator", href: "/trade" },
        { label: "Standings", href: "/teamStandings" },
        { label: "Trivia", href: "/trivia" },
        { label: "Logout", href: "/logout" },



    ];

    return (
        <>
            <div className="flex items-center justify-between bg-orange-800 text-white shadow-lg w-full px-4 py-2">
                <div className="flex items-center space-x-4">
                    <img src="/NBA logo.jpg" alt="NBA Logo" className="h-12 w-auto" />
                    <h1 className="text-3xl font-bold text-white">NBA Player App</h1>
                </div>
                <ul className="flex justify-center gap-10">
                    {navItems.map((link, index) => (
                        <li key={index} className={`font-medium text-lg ${pathname === link.href ? "text-yellow-500" : "text-orange-300 hover:text-white"}`}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Header;
