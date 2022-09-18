import {createBrowserRouter} from "react-router-dom";
import React from 'react'
import  SignIn  from '../components/SignIn';
import  App  from '../App';
import Dashboard from "../components/Dashboard";
import UserProfile from "../components/UserProfile";

const router = createBrowserRouter([
    {
        path : "/",
        element: <App />
    },
    {
        path : "/signIn",
        element: <SignIn />
    },
    {
        path : '/dashboard',
        element : <Dashboard />
    },
    {
        path : "/:username",
        element : <UserProfile />
    }
    
])


export default router;