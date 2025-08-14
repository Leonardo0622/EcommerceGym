'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from "../styles/Navbar.module.css";
import { useCart } from '../../context/CartContext';
import { usePathname, useRouter } from 'next/navigation';
import AdminNavbar from './AdminNavbar';

export default function Navbar() {
  const { cart } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    setIsLoggedIn(!!token);
    setUserName(name || 'Usuario');

    // Cargar la imagen de perfil
    if (token) {
      fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(res => res.json())
      .then(data => {
        if (data.profileImage) {
          setProfileImage(`http://localhost:5000/uploads/${data.profileImage}`);
        }
      })
      .catch(error => console.error('Error fetching profile:', error));
    }

    // Actualizar el nombre cuando cambie en localStorage
    const handleStorageChange = () => {
      const updatedName = localStorage.getItem('userName');
      setUserName(updatedName || 'Usuario');
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('role') === 'admin';
  const isAdminRoute = pathname?.startsWith('/dashboard') || pathname?.startsWith('/manage-users');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserName('');
    setProfileImage('');
    setIsMobileMenuOpen(false);
    router.push('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowDropdown(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setShowDropdown(false);
  };

  if (isAdmin && isAdminRoute) {
    return <AdminNavbar />;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <Link href="/" onClick={closeMobileMenu}>
            <span className={styles.logoText}>EcommerceGym</span>
          </Link>
        </div>

        <div className={styles.hamburger} onClick={toggleMobileMenu}>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
        </div>

        <ul className={`${styles.navMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
          <li><Link href='/' onClick={closeMobileMenu}>Inicio</Link></li>
          <li><Link href='/products' onClick={closeMobileMenu}>Productos</Link></li>
          <li><Link href='/contact' onClick={closeMobileMenu}>Contacto</Link></li>
          <li><Link href='/pasarelas' onClick={closeMobileMenu}>Pasarela</Link></li>

          <li className={styles.cartContainer}>
            <Link href='/cart' className={styles.cartlink} onClick={closeMobileMenu}>
              <i className="bi bi-cart-fill" />
              {cart.length > 0 && (
                <span className={styles.cartBadge}>
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </li>

          {isLoggedIn && (
            <li className={styles.userMenu}>
              <button 
                className={styles.userButton}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className={styles.profileImage}
                    onError={(e) => {
                      console.error('Error loading profile image');
                      e.target.src = 'https://via.placeholder.com/32';
                    }}
                  />
                ) : (
                  <i className="bi bi-person-circle" />
                )}
                <span className={styles.userName}>{userName}</span>
                <i className={`bi bi-chevron-down ${showDropdown ? 'bi-chevron-up' : ''}`} />
              </button>

              <div className={`${styles.dropdown} ${showDropdown ? styles.show : ''}`}>
                <Link href="/profile" className={styles.dropdownItem} onClick={closeMobileMenu}>
                  <i className="bi bi-person" />
                  Editar Perfil
                </Link>
                <div className={styles.dropdownDivider} />
                <button onClick={handleLogout} className={styles.dropdownItem}>
                  <i className="bi bi-box-arrow-right" />
                  Cerrar Sesión
                </button>
              </div>
            </li>
          )}

          {!isLoggedIn && (
            <li>
              <Link href='/login' onClick={closeMobileMenu}>Iniciar Sesión</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
