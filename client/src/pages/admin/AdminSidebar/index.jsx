import clsx from 'clsx';
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import Logo from '../../../assets/Logo1.svg';
import Profile from '../../../assets/profile.svg';
import Exit from '../../../assets/dashboardcont.svg';
import { logout } from '@/http/auth';
import { jwtDecode } from 'jwt-decode';

const AdminSidebar = ({ isMobile = false, onClose = () => {} }) => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    let email = null;
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        email = decoded?.email || decoded?.sub || decoded?.username;
      } catch (err) {
        console.error("Token decode failed:", err);
      }
    }

    if (!email || !refreshToken) {
      alert("Çıxış etmək mümkün olmadı. Məlumatlar tapılmadı.");
      setLoading(false);
      return;
    }

    try {
      await logout({ email, refreshToken });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
      alert("Çıxış zamanı xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        ${isMobile ? 'fixed top-0 left-0 z-50 h-full w-[280px] bg-white transition-transform duration-300' : ''}
        ${isMobile ? 'translate-x-0' : ''}
        lg:static
      `}
    >
      {/* Actual sidebar design starts here — DON'T TOUCH */}
      <div className="admin-panel flex">
        <div className={clsx(styles.sidebar)}>
          <div className={clsx(styles.side)}></div>
          <div className={clsx(styles.smth)}>
            <nav className={clsx(styles.nav)}>
              <NavLink to="/admin/" end className={({ isActive }) => clsx(styles.items, isActive && styles.active)} onClick={onClose}>
                Ana səhifə
              </NavLink>
              <NavLink className={({ isActive }) => clsx(styles.items, isActive && styles.active)} to="/admin/about" onClick={onClose}>Haqqımızda</NavLink>
              <NavLink className={({ isActive }) => clsx(styles.items, isActive && styles.active)} to="/admin/projects" onClick={onClose}>Layihələrimiz</NavLink>
              <NavLink className={({ isActive }) => clsx(styles.items, isActive && styles.active)} to="/admin/services" onClick={onClose}>Xidmətlərimiz</NavLink>
              <NavLink className={({ isActive }) => clsx(styles.items, isActive && styles.active)} to="/admin/career" onClick={onClose}>Karyera</NavLink>
              <NavLink className={({ isActive }) => clsx(styles.items, isActive && styles.active)} to="/admin/ksm" onClick={onClose}>KSM</NavLink>
              <NavLink className={({ isActive }) => clsx(styles.items, isActive && styles.active)} to="/admin/contact" onClick={onClose}>Əlaqə</NavLink>
              <NavLink className={({ isActive }) => clsx(styles.items, isActive && styles.active)} to="/admin/news" onClick={onClose}>Xəbərlər</NavLink>
            </nav>

            <div className={clsx(styles.logoedit)}>
              <div className={clsx(styles.logo)}>
                <Logo />
              </div>
            </div>

            <div className={clsx(styles.exit)}>
              <Link to="/admin/profile" onClick={onClose}>
                <div className='py-3 flex justify-center text-center items-center gap-2'>
                  <Profile />
                  <h1>Profile</h1>
                </div>
              </Link>
            </div>

            <div
              className={clsx(styles.exit)}
              onClick={handleLogout}
              role="button"
              tabIndex={0}
              aria-disabled={loading}
              style={{ cursor: loading ? "not-allowed" : "pointer" }}
            >
              <Exit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
