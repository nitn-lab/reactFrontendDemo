import React from "react";
import { Container } from "@material-ui/core";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
      <Navbar />
        <Routes>
          {/* <Route path="/auth" exact Component={() => (!user ? <Auth /> : <Navigate  to="/posts" />)} /> */}
          <Route path="/auth" exact Component={Auth} />
          <Route path="/posts" exact Component={Home} />
          <Route path="/posts/:id" exact element={<EmployeeDetails/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
