'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/adminNavbar.module.css';
import { useRouter } from 'next/navigation';

const AdminNavbar = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState('');
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    setUserName(name || 'Admin');

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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <ul className={styles.navList}>
          <li><Link href="/dashboard" className={styles.navLink}>
            <i className="bi bi-speedometer2"></i> Dashboard
          </Link></li>
          <li><Link href="/manage-users" className={styles.navLink}>
            <i className="bi bi-people"></i> Gestionar Usuarios
          </Link></li>
        </ul>

        <div className={styles.userSection}>
          <div 
            className={styles.userInfo}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Admin Profile"
                className={styles.profileImage}
                onError={(e) => {
                  console.error('Error loading profile image');
                  e.target.src = 'https://via.placeholder.com/32';
                }}
              />
            ) : (
              <i className="bi bi-person-circle"></i>
            )}
            <span className={styles.userName}>{userName}</span>
            <i className={`bi bi-chevron-down ${showDropdown ? styles.rotated : ''}`}></i>
          </div>

          {showDropdown && (
            <div className={styles.dropdown}>
              <Link href="/profile" className={styles.dropdownItem}>
                <i className="bi bi-person"></i>
                Editar Perfil
              </Link>
              <div className={styles.dropdownDivider}></div>
              <button onClick={handleLogout} className={styles.dropdownItem}>
                <i className="bi bi-box-arrow-right"></i>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
