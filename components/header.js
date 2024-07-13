import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// Header component to display the navigation bar
const Header = () => {
    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navItems = [
        { label: "Home", href: "/home" },
        { label: "Players", href: "/edit" },
        { label: "Trade Simulator", href: "/trade" },
        { label: "Standings", href: "/teamstandings" },
        { label: "Games", href: "#" },
        { label: "Logout", href: "/logout" },
    ];

    const gameItems = [
        { label: "Trivia", href: "/trivia" },
        { label: "Hi-Lo", href: "/hilo" },
    ];

    const isGamesActive = gameItems.some(game => game.href === pathname);

    return (
        <header className="bg-gray-800 text-white shadow-lg py-3">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src="/bpa.webp" alt="NBA Logo" className="h-20 w-auto" />
                    <h1 className="text-3xl font-bold">NBA Player App</h1>
                </div>
                <nav className="bg-gray-700 p-2 rounded-lg">
                    <ul className="flex space-x-4">
                        {navItems.map((link, index) => (
                            link.label !== "Games" ? (
                                <li key={index} className={`px-3 py-2 rounded ${pathname === link.href ? "bg-orange-500 text-gray-800" : "hover:bg-gray-600"}`}>
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ) : (
                                <li 
                                    key={index} 
                                    className={`relative px-3 py-2 rounded ${isGamesActive ? "bg-orange-500 text-gray-800" : "hover:bg-gray-600"} cursor-pointer`}
                                    onMouseEnter={() => setDropdownOpen(true)}
                                    onMouseLeave={() => setDropdownOpen(false)}
                                >
                                    <span>Games</span>
                                    {dropdownOpen && (
                                        <ul className="absolute left-0 mt-2 bg-gray-700 rounded-lg shadow-lg w-40">
                                            {gameItems.map((game, gameIndex) => (
                                                <li key={gameIndex} className={`px-4 py-2 ${pathname === game.href ? "bg-orange-500 text-gray-800" : "hover:bg-gray-600"}`}>
                                                    <Link href={game.href}>{game.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            )
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;