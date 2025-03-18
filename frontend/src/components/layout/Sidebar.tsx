import { BookOpen, Home, LogOut, Mail, Users } from 'react-feather';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import authService from '../../services/AuthService';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  className: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const history = useHistory();

  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  const handleLogout = async () => {
    await authService.logout();
    setAuthenticatedUser(null);
    history.push('/login');
  };

  return (
    <div
      className={'sidebar ' + className}
      style={{
        backgroundImage: 'url("/sidemenu-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Link to="/" className="no-underline text-black">
        <div className="flex justify-center items-center py-5">
          <img
            src="/urbano-logo-white.png"
            alt="Logo"
            className="w-44 h-auto max-w-none"
          />
        </div>
      </Link>
      {/* <nav className="mt-5 flex flex-col gap-3 flex-grow"> */}
      <nav className="mt-10 flex flex-col gap-3">
        <SidebarItem to="/">
          <Home className="w-5 h-5" /> Dashboard
        </SidebarItem>
        <SidebarItem to="/courses">
          <BookOpen className="w-5 h-5" /> Courses
        </SidebarItem>
        {authenticatedUser.role === 'admin' ? (
          <SidebarItem to="/users">
            <Users className="w-5 h-5" /> Users
          </SidebarItem>
        ) : null}
        <SidebarItem to="/contact">
          <Mail className="w-5 h-5" /> Contact
        </SidebarItem>
      </nav>
      <button
        className="text-white rounded-md p-3 transition-all flex items-center justify-center gap-2 bg-red-700"
        style={{ marginTop: 'auto' }}
        onClick={handleLogout}
      >
        <LogOut /> Logout
      </button>
    </div>
  );
}
