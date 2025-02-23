import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginHeader.css';
import useLogout from '../../hooks/useLogout';
import Dropdown from './ProfileDropdown';
import { ROLES_LIST } from '../../api/config';
import iconimg from "../images/purplemaze_navbar_icon.png";

const LogInHeader = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const accessAuth = JSON.parse(localStorage.getItem('accessAuth'));
  const [freeRole, setFreeRole] = useState(true);
  const signOut = async () => {
    await logout();
    navigate('/login');
  }

  const resetPassword = () => {
    navigate('/Reset-password');
  }

  const upgradeProfile = () => {
    navigate('/checkout-payment')
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
  }, [isDropdownOpen]);

  useEffect(() => {
    if ((accessAuth?.roles === ROLES_LIST.Admin || accessAuth?.roles === ROLES_LIST.PaidUser)) {
      setFreeRole(false);
    }
  }, [])
  return (
    <header class="flex header_color justify-between bx-auto py-2">
      <Link to="/">
      <div class="flex justify-center items-center px-8 sm:px-8">
      <img src={iconimg} />
        <h1 class="px-2 text-color font-type-quicksand">Purple Maze</h1>
      </div>
      </Link>
      <div class="flex items-center px-2">
        {freeRole ?
          <Link to="/checkout-payment" class="hidden font-type-monasans text-color-1 sm:inline sm:px-4 ">Upgrade Plan</Link> : ""}


<div className="frame-30 dropdown mr-3" onClick={toggleDropdown}>
            Profile
            {isDropdownOpen && <Dropdown onLogout={signOut} resetPassword = {resetPassword} upgradeProfile={upgradeProfile} />}
          </div>
      </div>

    </header>
  );
};

export default LogInHeader;
