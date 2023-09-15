import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [access, setValueState] = useState("");
  console.log("state", access);
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit", postData);
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    Clear();
  };
  const Clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to Register Employee.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper} raised elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Registration -"} Add Employee
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Name"
          fullWidth
          value={postData.creator}
          onChange={
            (e) => setPostData({ ...postData, creator: e.target.value })
            // setValueState(e.target.value)
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Rank"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Fathers Name"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Date of Birth"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Date of Appointment"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Edu. Qualification"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Category"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Permanent Address"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({
                ...postData,
                selectedFile: base64,
              })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={Clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;