'use client';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import { FiLogIn, FiUser, FiUserPlus } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link href="/" className="text-xl font-bold flex items-center">
          Blog
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex space-x-6">
        <Link href="/articles" className="hover:text-gray-300">
          Articles
        </Link>
        <Link href="/about" className="hover:text-gray-300">
          À propos
        </Link>
        <Link href="/contact" className="hover:text-gray-300">
          Contact
        </Link>
      </div>

      {/* Icone utilisateur avec menu */}
      <div className="relative">
        <FaUserCircle size={28} className="cursor-pointer" onClick={toggleMenu} />
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10">
            <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">
              <FiLogIn className="mr-2" /> Connexion
            </Link>
            <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">
              <FiUserPlus className="mr-2" /> S&apos;inscrire
            </Link>
            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
              <FiUser className="mr-2" /> Profil
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
