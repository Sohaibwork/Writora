// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   return (
//     <nav className="text-gray-600 body-font w-full  shadow-sm bg-blue-100 sticky top-0 z-50">
//       <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
//         <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
//           <span className="ml-3 text-3xl logo-font font-bold  tracking-wide bg-gradient-to-r from-[#0b3c58] to-[#2f90ab] bg-clip-text text-transparent">
//             Writora
//           </span>
//         </a>
//         <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
//           <Link
//             className="mr-5  text-cyan-700 font-semibold text-lg cursor-pointer"
//             href={"/"}
//           >
//             Home
//           </Link>
//           <Link
//             className="mr-5 text-cyan-700 font-semibold text-lg cursor-pointer"
//             href={""}
//           >
//             Dashboard
//           </Link>
//           <Link
//             className="mr-5  text-cyan-700 font-semibold text-lg cursor-pointer"
//             href={""}
//           >
//             Editor
//           </Link>
//         </nav>
//         <button className="inline-flex items-center bg-[#657de9]  text-white border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
//           Login
//         </button>
//       </div>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: replace with your icon library

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-blue-100 text-gray-600 w-full shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-3xl logo-font font-bold bg-gradient-to-r from-[#0b3c58] to-[#2f90ab] bg-clip-text text-transparent tracking-wide">
            Writora
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            href="/"
            className="text-cyan-700 font-semibold text-lg hover:underline"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-cyan-700 font-semibold text-lg hover:underline"
          >
            Dashboard
          </Link>
          <Link
            href="/editor"
            className="text-cyan-700 font-semibold text-lg hover:underline"
          >
            Editor
          </Link>

          {isLoggedIn ? (
            <Link
              href="/profile"
              className="bg-[#657de9] text-white py-1 px-4 rounded hover:bg-[#4c64c7] transition"
            >
              Profile
            </Link>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)} // just for demo
              className="bg-[#2ba8fb] text-white py-1 px-4 rounded hover:bg-[#657de9da] cursor-pointer transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-50 px-4 pb-4">
          <Link
            href="/"
            className="block py-2 text-cyan-700 font-semibold text-lg"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="block py-2 text-cyan-700 font-semibold text-lg"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link
            href="/editor"
            className="block py-2 text-cyan-700 font-semibold text-lg"
            onClick={toggleMenu}
          >
            Editor
          </Link>
          {isLoggedIn ? (
            <Link
              href="/profile"
              className="block py-2 text-white bg-[#657de9] text-center rounded"
              onClick={toggleMenu}
            >
              Profile
            </Link>
          ) : (
            <button
              onClick={() => {
                setIsLoggedIn(true);
                toggleMenu();
              }}
              className="block w-full py-2 text-white bg-[#2ba8fb] rounded text-center cursor-pointer   "
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
