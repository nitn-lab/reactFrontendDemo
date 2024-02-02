import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Post from "../Posts/Post/Post";
import Form from "../Form/Form";
// import useStyles from "../../styles";
import useStyles from "./styles";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { ThreeDots } from "react-loader-spinner";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Data } from "../Form/jsonData";
const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [level, setsetLevel] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [addEmployee, setAddEmployee] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState();
  const [open, setOpen] = React.useState(false);
  const [ids, setIds] = useState([])

  useEffect(() => {
    const userdetails = JSON.parse(localStorage.getItem("userDetails"));
    const userdetails2 = localStorage.getItem("currentIdViewed");
    // console.log("userdetails", userdetails["result"]["level"]);
    const av = ids.push(userdetails2);
    console.log("userdetails", userdetails.result, userdetails2, av, ids );
  
    setsetLevel(userdetails.result.Level);
    dispatch(getPosts());
  }, [currentId, dispatch]);
  const switchMode = () => {
    // setFormData(initialState);
    setAddEmployee((prevIsSignup) => !prevIsSignup);
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    console.log("reason", reason);
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const SearchRequest = async () => {
    setLoading(false);
    try {
      await axios
        .post("https://reactbackend-demo.onrender.com/alluser/finduser", {
          query: search,
        })
        .then((response) => {
          // console.log("serach request response", response.data);
          if (response?.data?.length === 0) {
            setEmpty(true);
            setLoading(true);
            handleClick();
          } else {
            // SearchPost(response?.data);
            setSearchData(response?.data);
            setLoading(true);
            setEmpty(true);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(true);
        });
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Not Found!!"
          action={action}
        />
        {loading ? (
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
                // label="Search Employee by Name / Belt - No"
                label={
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 500,
                      alignItems: "center",
                      fontSize: 15,
                    }}
                  >
                    Search Employee by Name / Belt - No
                  </Typography>
                }
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ fontFamily: "Poppins", fontWeight: 500, marginTop: 7 }}
              />

              <Button
                className={classes.searchButton}
                variant="contained"
                color="primary"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  marginLeft: 10,
                  fontSize: 15,
                }}
                onClick={() => SearchRequest()}
              >
                Search
              </Button>

              {level === "1" ? (
                <Button
                  className={classes.searchButton}
                  variant="contained"
                  color="primary"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    marginLeft: 10,
                    fontSize: 15,
                  }}
                  onClick={switchMode}
                >
                  Add Emp
                </Button>
              ) : (
                <p></p>
              )}
            </AppBar>


            
            {/* <Typography
              to="/"
              className={classes.heading}
              variant="h8"
              // align="center"
              style={{ fontFamily: "Poppins", fontWeight: 800 }}
            >
              Recently Viewed
            </Typography> */}

{/*             
              {Data?.map((p) => {
                // console.log("gffp", p);
                return (
                  <Grid container alignItems="stretch" xs={12} sm={12} md={12}>
                    <Post post={p} setCurrentId={setCurrentId} />
                  </Grid>
                );
              })} */}

            {addEmployee ? (
              empty ? (
                searchData?.map((p) => {
                  // console.log("searchPost map", p);
                  return (
                    <Grid key={p._id} item xs={12} sm={12} md={12} lg={12}>
                      <Post post={p} setCurrentId={setCurrentId} />
                    </Grid>
                  );
                })
              ) : (
                <Grid container alignItems="stretch" xs={12} sm={12} md={12}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>
              )
            ) : (
              <Grid container spacing={3} className={classes.appBarSearch}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            )}
          </Grid>
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
    </Grow>
  );
};

export default Home;
