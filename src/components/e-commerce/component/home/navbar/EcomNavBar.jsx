import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ecomNavBar.module.css';

const EcomNavBar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('token');
      navigate('/ecommerce');
    }
    setIsMenuOpen(false);
  };

  const handleHome = () => {
    navigate('/ecommerce/home');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <h1 className={styles.navbarTitle}>Product Details</h1>

        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        <div className={`${styles.navbarMenu} ${isMenuOpen ? styles.active : ''}`}>
          <button className={`${styles.navbarBtn} ${styles.navbarBtnSecondary}`} onClick={handleHome}>
            Home
          </button>
          <button className={`${styles.navbarBtn} ${styles.navbarBtnPrimary}`} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default EcomNavBar;
