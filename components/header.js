import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

// Header component to display the navigation bar
const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState({
    games: false,
    charts: false,
    admin: false,
  });

  const navItems = [
    { label: "Home", href: "/home" },
    { label: "Players", href: "/playerstats" },
    { label: "Teams", href: "/teams" },
    { label: "Leaders", href: "/leaders" },
    { label: "Trade", href: "/trade" },
    { label: "Charts", href: "#" },
    { label: "Standings", href: "/standings" },
    { label: "Games", href: "#" },
  ];

  const chartItems = [
    { label: "Compare", href: "/compare" },
    { label: "BPM - WS/48 (Advanced Analytics)", href: "/scatter" },
  ];

  const gameItems = [
    { label: "Trivia", href: "/trivia" },
    { label: "Hi-Lo", href: "/hilo" },
    { label: "TeamBuild", href: "/teambuild" },
    { label: "Leaderboard", href: "/leaderboard" },
  ];

  const adminItems = [
    { label: "Change Stats", href: "/edit" },
    { label: "Change Standings", href: "/teamstandings" },
    { label: "Admin Requests", href: "/adminrequests" },
  ];

  const isGamesActive = gameItems.some((game) => game.href === pathname);
  const isChartsActive = chartItems.some((chart) => chart.href === pathname);
  const isAdminActive = adminItems.some((admin) => admin.href === pathname);

  return (
    <header className="bg-gray-800 text-white shadow-lg py-3 p-4 border-b border-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/bpa.webp" alt="NBA Logo" className="h-20 w-auto" />
          <h1 className="text-3xl font-bold">NBAlytics</h1>
        </div>
        <nav className="bg-gray-700 p-2 rounded-lg">
          <ul className="flex space-x-4">
            {navItems.map((link, index) => {
              if (link.label === "Games") {
                return (
                  <li
                    key={index}
                    className={`relative px-3 py-2 rounded ${
                      isGamesActive ? "bg-orange-500 text-white" : "hover:bg-gray-600"
                    } cursor-pointer`}
                    onMouseEnter={() =>
                      setDropdownOpen({ ...dropdownOpen, games: true })
                    }
                    onMouseLeave={() =>
                      setDropdownOpen({ ...dropdownOpen, games: false })
                    }
                  >
                    <span>Games</span>
                    {dropdownOpen.games && (
                      <ul className="absolute left-0 mt-2 bg-gray-700 rounded-lg shadow-lg w-40 z-50">
                        {gameItems.map((game, gameIndex) => (
                          <li
                            key={gameIndex}
                            className={`px-4 py-2 ${
                              pathname === game.href
                                ? "bg-orange-500 text-white"
                                : "hover:bg-gray-600 text-white"
                            }`}
                          >
                            <Link href={game.href}>{game.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              } else if (link.label === "Charts") {
                return (
                  <li
                    key={index}
                    className={`relative px-3 py-2 rounded ${
                      isChartsActive ? "bg-orange-500 text-white" : "hover:bg-gray-600"
                    } cursor-pointer`}
                    onMouseEnter={() =>
                      setDropdownOpen({ ...dropdownOpen, charts: true })
                    }
                    onMouseLeave={() =>
                      setDropdownOpen({ ...dropdownOpen, charts: false })
                    }
                  >
                    <span>Charts</span>
                    {dropdownOpen.charts && (
                      <ul className="absolute left-0 mt-2 bg-gray-700 rounded-lg shadow-lg w-40 z-50">
                        {chartItems.map((chart, chartIndex) => (
                          <li
                            key={chartIndex}
                            className={`px-4 py-2 ${
                              pathname === chart.href
                                ? "bg-orange-500 text-white"
                                : "hover:bg-gray-600 text-white"
                            }`}
                          >
                            <Link href={chart.href}>{chart.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              } else {
                return (
                  <li
                    key={index}
                    className={`px-3 py-2 rounded ${
                      pathname === link.href ? "bg-orange-500 text-white" : "hover:bg-gray-600"
                    }`}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                );
              }
            })}
            {/* Conditional Admin Dropdown Menu */}
            {status === "authenticated" && session.user.isAdmin && (
              <li
                className={`relative px-3 py-2 rounded ${
                  isAdminActive ? "bg-orange-500 text-white" : "hover:bg-gray-600"
                } cursor-pointer`}
                onMouseEnter={() =>
                  setDropdownOpen({ ...dropdownOpen, admin: true })
                }
                onMouseLeave={() =>
                  setDropdownOpen({ ...dropdownOpen, admin: false })
                }
              >
                <span>Admin</span>
                {dropdownOpen.admin && (
                  <ul className="absolute left-0 mt-2 bg-gray-700 rounded-lg shadow-lg w-40 z-50">
                    {adminItems.map((admin, adminIndex) => (
                      <li
                        key={adminIndex}
                        className={`px-4 py-2 ${
                          pathname === admin.href
                            ? "bg-orange-500 text-white"
                            : "hover:bg-gray-600 text-white"
                        }`}
                      >
                        <Link href={admin.href}>{admin.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}
            {/* Logout tab */}
            <li
              className={`px-3 py-2 rounded ${
                pathname === "/logout" ? "bg-orange-500 text-white" : "hover:bg-gray-600"
              }`}
            >
              <Link href="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
