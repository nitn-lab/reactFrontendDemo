import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActions,
  ButtonBase
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/posts";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const disptach = useDispatch();
  const navigate = useNavigate();
  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    navigate(`/posts/${post._id}`,{state: post._id});
  };

  const deleteUser = async (userId) => {
    console.log("userId", userId);
    try {
      await axios
        .delete(
          `https://reactbackend-demo.onrender.com/alluser/deleteuser/${userId}`
        )
        .then((response) => {
          // console.log("delete status", response);
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
      {/* <CardMedia
        className={classes.media}
        image={post.ProfileImg}
        title={post.title}
      /> */}
      {/* <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div> */}
      <div className={classes.overlay2}>
        <Button
          stlye={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          {/* <MoreHorizIcon fontSize="default" /> */}
        </Button>
      </div>
      <div className={classes.details}>
        {/* <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography> */}
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
          {post.Name}
        </Typography>
      <CardContent>
        <Typography  variant="body2" color="textSecondary" component="p">
          {post.EmpCode}
        </Typography>
      </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {/* <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button> */}
        <Button size="small" color="primary" onClick={() => deleteUser(post._id)}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
