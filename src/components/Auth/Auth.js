import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlinedIcon";
import useStyles from "./styles";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

import { ThreeDots } from "react-loader-spinner";
const initialState = {
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  empCode: "",
  level:""
};
const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  // const isSignup = false;
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("form submit", formData, history);
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      setLoading(false);
      dispatch(signin(formData, history));
      
      
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <Container component="main" maxWidth="xs">
      {loading ? (
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="LastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="empCode"
                label="Employee Code"
                handleChange={handleChange}
                type="empCode"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Dont have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid> */}
          </form>
        </Paper>
      ) : (
        <div style={style}>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="red"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}
    </Container>
  );
};

export default Auth;
