import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
 
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
// import useStyles from "../../styles";
import useStyles from "./styles";
import axios from "axios";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [level, setsetLevel] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [addEmployee, setAddEmployee] = useState(true);
  useEffect(() => {
   const userdetails=JSON.parse(localStorage.getItem("userDetails"));

   console.log("userdetails",userdetails['result']['level'])

   setsetLevel(userdetails['result']['level'])
    dispatch(getPosts());
  }, [currentId, dispatch]);
  const switchMode = () => {
    // setFormData(initialState);
    setAddEmployee((prevIsSignup) => !prevIsSignup);
  };

  const SearchRequest = async () => {
    try {
      await axios.post('https://reactbackend-demo.onrender.com/alluser/finduser',{
        query: search
      })
      .then(response => {
        console.log("serach request response", response.data);
      })
      .catch(error => {
        console.log("error", error);
      })
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <AppBar
            className={classes.appBarSearch}
            position="static"
            color="inherit"
          >
            <TextField
              name="search"
              variant="outlined"
              label="Search Employee by Name / Belt - No / PIS - No"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              className={classes.searchButton}
              variant="contained"
              color="primary"
              style={{ marginLeft: 10 }}
              onClick={() => SearchRequest()}
            >
              Search
            </Button>

            {level===1?<Button
              className={classes.searchButton}
              variant="contained"
              color="primary"
              style={{ marginLeft: 10 }}
              onClick={switchMode}
            >
              Add Emp
            </Button>:<p></p>}
          </AppBar>
          {addEmployee ? (
            <Grid container alignItems="stretch" xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
          ) : (
            <Grid container spacing={3} className={classes.appBarSearch}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          )}
          {/* <Grid container alignItems="stretch" xs={12} sm={6} md={9} >
            <Posts setCurrentId={setCurrentId} />
          </Grid> */}
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
