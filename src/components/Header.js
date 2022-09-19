import React from "react";
import Button from "@mui/material/Button";
import { auth } from '../firebase/firebase';
import {signOut} from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import "../css/Header.css"

function Header({ user = ''} = {}) {
  const navigate = useNavigate()
  return (
    <div className="header">
        <img onClick={() => navigate('/dashboard')} className="header__logo" src="/img/logo-1.png" alt="logo" />
        {user ? (
          <Button onClick={() => signOut(auth)}>LogOut</Button>
        ) : (
          <Button onClick={() => navigate('/signIn')}>Sign In</Button>
        )}
    </div>
  );
}

export default Header;