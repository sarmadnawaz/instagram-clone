import {createBrowserRouter} from "react-router-dom";
import React from 'react'
import  SignIn  from '../components/SignIn';
import  App  from '../App';
import UserProfile from "../components/UserProfile";
import Page404 from "../components/Page404";

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
        path : "/signIn/*",
        element: <Page404 />
    },
    {
        path : "/:username",
        element : <UserProfile />
    },
    {
        path : "/:username/*",
        element : <Page404 />
    }
])


export default router;