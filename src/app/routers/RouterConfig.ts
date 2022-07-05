import React from "react";
import LoginScreen from "../views/login/LoginScreen";
import HomeScreen from "../views/home/HomeScreen";


const RouterConfig = [
    {
        path: '/',
        component: LoginScreen,
        moduleId: 1
    },
    {
        path: '/login',
        component: LoginScreen,
        moduleId: 1
    },
 
 
];
export default RouterConfig;
