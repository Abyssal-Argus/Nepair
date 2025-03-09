import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Ensure Firestore is initialized in firebase.js
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { FaUserCircle } from 'react-icons/fa'; // Corrected import statement
import './navbar.css';

function Navbar() {
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user details from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(`${userData.firstName} ${userData.lastName}`);
          setUserRole(userData.role); // Store the user's role
        } else {
          console.error("No such user document!");
        }
      } else {
        setUserName(null);
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUserName(null);
    setUserRole(null);
    alert("You have been logged out successfully.");
    navigate('/');
  };

  const handleProfileClick = () => {
    if (userRole === 'admin') {
      navigate('/AdminDash');
    } else if (userRole === 'user') {
      navigate('/UserProfile');
    }
  };

  return (
    <div className='containNav'>
      <nav style={{
        ...styles.navbar,
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
        transition: 'background 0.3s ease-in-out'
      }}>
        <div style={styles.logoContainer}>
          <img src="/images/clouds.png" alt="Nepal Logo" style={styles.logoImage} />
          <p style={styles.logoText}>NepAir</p>
        </div>

        <div style={styles.navLinks}>
          <button className='navButtons' onClick={() => navigate('/')}>Home</button>
          <button className='navButtons' onClick={() => navigate(userRole === 'admin' ? '/admindash' : '/userdash')}>Dashboard</button>
          <button className='navButtons' onClick={() => navigate('/education')}>News & Education</button>
          <button className='navButtons' onClick={() => navigate('/HealthAlert')}>HealthAlert</button>
        </div>

        <div style={styles.authSection}>
          {userName ? (
            <div style={styles.userSection}>
              <button className='navButtons' onClick={handleProfileClick}>
                <FaUserCircle style={styles.userIcon} className='userface' />
              </button>
              <div className='userInfo'>
                <div>
                  <span style={styles.userName}>{userName}</span>
                </div>
                <div>
                  <span style={styles.userRole}>{userRole}</span> {/* Display user role */}
                </div>
              </div>
              <button className='authButton' onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className='authButton' onClick={() => navigate('/login')}>Login</button>
          )}
        </div>
      </nav>
    </div>
  );
}

const styles = {
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: '100',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 8px',
    margin: '0',
  },
  logoContainer: {
    display: 'grid',
  },
  logoImage: {
    width: '70px',
    height: '70px',
  },
  logoText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#F4F4F4',
    paddingLeft: '10px',
  },
  navLinks: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  navButton: {
    padding: '10px 15px',
    border: 'none',
    color: '#FFF',
    backgroundColor: 'transparent',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  authSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userIcon: {
    fontSize: '24px',
    color: '#FFF',
  },
  userName: {
    color: '#FFF',
    fontSize: '16px',
  },
  userRole: {
    color: '#FFF',
    fontSize: '14px',
    marginLeft: '5px',
  },
};

export default Navbar;