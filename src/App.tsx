import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { INFO_LOCALSTORAGE } from "./app/shared/constants/constant";
import AppLayout from "./app/views/layouts/AppLayout";
import LoginScreen from "./app/views/login/LoginScreen";
import "antd/dist/antd.css";

function App() {
  const userLogged = localStorage.getItem(INFO_LOCALSTORAGE.USER_LOGGED);

  return userLogged !== null ? (
    <BrowserRouter>
      <AppLayout></AppLayout>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <LoginScreen />
    </BrowserRouter>
  );
}

export default App;
