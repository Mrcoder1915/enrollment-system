"use client"
import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export const dashboardContext = createContext(null);

const dashboardProvider = ({children}) => {
    const [show, setShow] = useState(1);
    const [userAccess, setUserAccess] = useState("registrar"); // default = registrar
    const [userName, setUserName] = useState("Registrar");
    const [userPhoto, setUserPhoto] = useState("/default-profile.png");

    useEffect(() => {
        const access = Cookies.get('userAccess');
        const name = Cookies.get('userName');
        const photo = Cookies.get('userPhoto');

        if (access) setUserAccess(access);
        if (name) setUserName(name);
        if (photo) setUserPhoto(photo);
    }, []);

    const showDetails = (position) => {
        setShow(position);
    };

    const loginUser = ({ access, name, photo }) => {
        Cookies.set('userAccess', access);
        Cookies.set('userName', name);
        Cookies.set('userPhoto', photo);

        setUserAccess(access);
        setUserName(name);
        setUserPhoto(photo);
    };

    const logoutUser = () => {
        Cookies.remove('userAccess');
        Cookies.remove('userName');
        Cookies.remove('userPhoto');

        setUserAccess("registrar"); // fallback to default
        setUserName("Registrar");
        setUserPhoto("/default-profile.png");
    };

    const value = {
        show,
        showDetails,
        userAccess,
        userName,
        userPhoto,
        loginUser,
        logoutUser
    };

    return (
        <dashboardContext.Provider value={value}>
            {children}
        </dashboardContext.Provider>
    );
};

export default dashboardProvider;
