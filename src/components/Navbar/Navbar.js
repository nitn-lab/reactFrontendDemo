import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useStyles from "./styles";
import memories from "../../images/memories.jpeg";
import * as actionType from "../../constants/actionTypes";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
const Navbar = () => {
  const classes = useStyles();
  // const user = null;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    console.log("uesers", user);
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="70"
        />
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h5"
          align="center"
          style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 27}}
        >
          PERSONAL INFORMATION SYSTEM (PIS)
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.Name}
              src={user.result.imageUrl}
            >
              {user.result.Name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6" style={{ fontFamily: "Poppins", fontWeight: 500}}>
              {user.result.Name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
              style={{ fontFamily: "Poppins", fontWeight: 500}}
            >
              logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
            style={{ fontFamily: "Poppins", fontWeight: 500}}
          >
            SignIn
          </Button>
        )}
        {/* <Button style={{marginLeft: '20px'}} component={Link} to="/auth" variant="contained" color="primary">
          Admin Login
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
