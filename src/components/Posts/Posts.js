import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
const Posts = ({ setCurrentId }) => {
  // const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  const [userData, setUserData] = useState();
  // console.log("Posts", posts);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    try {
      await axios
        .get("http://54.234.124.75:5000/alluser/getalluser", {
          headers: {
            "Content-Type": "application/json",
          },
          maxBodyLength: Infinity,
        })
        .then((response) => {
          // console.log("alluser api all data", response.data);
          setUserData(response.data);
          // response.data.map(p => {
          //   console.log("p", p);
          // })
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  
  return !userData?.length ? (
    // <CircularProgress />
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
  ) : (
    <Grid
      // className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {/* {
        userData?.map((post) => (
          <Grid key={userData._id} item xs={12} sm={6} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))
      } */}
      {userData?.map((p) => {
        // console.log("gffp", p);
        return (
          <Grid key={userData._id} item xs={12} sm={6} md={6} lg={3}>
            <Post post={p} setCurrentId={setCurrentId} />
          </Grid>
        );
      })}
    </Grid>
  );
  // <>
  // <h1>Posts</h1>
  // <Post/>
  // <Post/>
  // </>
};

export default Posts;
