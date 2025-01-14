'use client';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiLogIn, FiUser, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/app/lib/redux/hooks';
import { removeAuth, setAuth } from '@/app/lib/redux/features/auth.slice';
import { deleteCookies } from '@/app/lib/actions/sessionCookies/action';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      dispatch(
        setAuth({
          accessToken: authData.accessToken,
          isAuth: true
        })
      );
    }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(removeAuth());
      await deleteCookies();
      toast.success('Vous avez été déconnecté avec succès.');
      router.push('/');
    } catch (error) {
      toast.error('Une erreur est survenue lors de la déconnexion.');
      console.error(error);
    }
  };

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
            {isAuth ? (
              <>
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  <FiUser className="mr-2" /> Profil
                </Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  <FiLogOut className="mr-2" /> Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">
                  <FiLogIn className="mr-2" /> Connexion
                </Link>
                <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">
                  <FiUserPlus className="mr-2" /> S&apos;inscrire
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
