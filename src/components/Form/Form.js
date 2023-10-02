import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  // Typography,
  Paper,
  Container,
} from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import AddBoxIcon from "@mui/icons-material/AddBox";
import MaterialTable from "material-table";

const postingList = [
  {
    id: 1,
    placeOfPosting: "Bangalore",
    From: "Delhi",
    to: "Chennai",
    duration: 10,
  },
];

const rewardsList = [
  {
    id: 1,
    name: "Ramveer",
    rewardFor: "Cycling",
    byWhom: "Modi",
    Obno: "1234",
  },
];

const punishmentList = [
  {
    id: 1,
    name: "Ramveer",
    punishmentFor: "Killing",
    byWhom: "SupremeCourt",
    Obno: "9908908",
  },
];

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
  const [postingData, setPostingData] = useState(postingList);
  const [rewardsData, setRewardsData] = useState(rewardsList);
  const [punishmentData, setPunishmentData] = useState(punishmentList);

  const positngColumns = [
    { title: "ID", field: "id", editable: false },
    { title: "Place of Posting", field: "placeOfPosting" },
    { title: "From", field: "From" },
    { title: "To", field: "to" },
    { title: "Duration", field: "duration" },
  ];

  const rewardsColumns = [
    { title: "ID", field: "id", editable: false },
    { title: "Name", field: "name" },
    { title: "Rewarded For", field: "rewardFor" },
    { title: "By Whom", field: "byWhom" },
    { title: "Ob_no", field: "Obno" },
  ];

  const punishmentsColumns = [
    { title: "ID", field: "id", editable: false },
    { title: "Name", field: "name" },
    { title: "Punishment For", field: "punishmentFor" },
    { title: "By Whom", field: "byWhom" },
    { title: "OB_no", field: "Obno" },
  ];
  console.log("state", access);
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
      <div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Employee Personal Details
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
              I am an accordion
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails>
            <form
              autoComplete="off"
              noValidate
              className={`${classes.root} ${classes.form}`}
              onSubmit={handleSubmit}
            >
              {/* <Typography variant="h6">
                {currentId ? "Editing" : "Registration -"} Add Employee
              </Typography> */}
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
                name="creator"
                variant="outlined"
                label="Pis No / Belt No"
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
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
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
            </form>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Complete Posting Details
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Please Add All The Posting Details Of the Employee
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MaterialTable
              title="Posting Data"
              data={postingData}
              columns={positngColumns}
              editable={{
                onRowAdd: (newRow) =>
                  new Promise((resolve, reject) => {
                    const updatedRows = [
                      ...postingData,
                      { id: Math.floor(Math.random() * 100), ...newRow },
                    ];
                    setTimeout(() => {
                      setPostingData(updatedRows);
                      resolve();
                    }, 2000);
                  }),
                onRowDelete: (selectedRow) =>
                  new Promise((resolve, reject) => {
                    const index = selectedRow.tableData.id;
                    const updatedRows = [...postingData];
                    updatedRows.splice(index, 1);
                    setTimeout(() => {
                      setPostingData(updatedRows);
                      resolve();
                    }, 2000);
                  }),
                onRowUpdate: (updatedRow, oldRow) =>
                  new Promise((resolve, reject) => {
                    const index = oldRow.tableData.id;
                    const updatedRows = [...postingData];
                    updatedRows[index] = updatedRow;
                    setTimeout(() => {
                      setPostingData(updatedRows);
                      resolve();
                    }, 2000);
                  }),
              }}
              options={{
                actionsColumnIndex: -1,
                addRowPosition: "first",
              }}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Rewards
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Please All the Rewards Given to Employee
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MaterialTable
              title="Rewards Data"
              data={rewardsData}
              columns={rewardsColumns}
              editable={{
                onRowAdd: (newRow) =>
                  new Promise((resolve, reject) => {
                    const updatedRows = [
                      ...rewardsData,
                      { id: Math.floor(Math.random() * 100), ...newRow },
                    ];
                    setTimeout(() => {
                      setRewardsData(updatedRows);
                      resolve();
                    }, 2000);
                  }),
                onRowDelete: (selectedRow) =>
                  new Promise((resolve, reject) => {
                    const index = selectedRow.tableData.id;
                    const updatedRows = [...rewardsData];
                    updatedRows.splice(index, 1);
                    setTimeout(() => {
                      setRewardsData(updatedRows);
                      resolve();
                    }, 2000);
                  }),
                onRowUpdate: (updatedRow, oldRow) =>
                  new Promise((resolve, reject) => {
                    const index = oldRow.tableData.id;
                    const updatedRows = [...rewardsData];
                    updatedRows[index] = updatedRow;
                    setTimeout(() => {
                      setRewardsData(updatedRows);
                      resolve();
                    }, 2000);
                  }),
              }}
              options={{
                actionsColumnIndex: -1,
                addRowPosition: "first",
              }}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Punishments
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MaterialTable
              title="Punishment Data"
              data={punishmentData}
              columns={punishmentsColumns}
              editable={{
                onRowAdd: (newRow) =>
                  new Promise((resolve, reject) => {
                    const updatedRows = [
                      ...punishmentData,
                      { id: Math.floor(Math.random() * 100), ...newRow },
                    ];
                    setTimeout(() => {
                      setPunishmentData(updatedRows);
                      resolve();
                    }, 2000);
                  }),
                onRowDelete: (selectedRow) =>
                  new Promise((resolve, reject) => {
                    const index = selectedRow.tableData.id;
                    const updatedRows = [...punishmentData];
                    updatedRows.splice(index, 1);
                    setTimeout(() => {
                      setPunishmentData(updatedRows);
                      resolve();
                    }, 2000);
                  }),
                onRowUpdate: (updatedRow, oldRow) =>
                  new Promise((resolve, reject) => {
                    const index = oldRow.tableData.id;
                    const updatedRows = [...punishmentData];
                    updatedRows[index] = updatedRow;
                    setTimeout(() => {
                      setPunishmentData(updatedRows);
                      resolve();
                    }, 2000);
                  }),
              }}
              options={{
                actionsColumnIndex: -1,
                addRowPosition: "first",
              }}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>Leaves</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form
              autoComplete="off"
              noValidate
              className={`${classes.root} ${classes.form}`}
              onSubmit={handleSubmit}
            >
              {/* <Typography variant="h6">
                {currentId ? "Editing" : "Registration -"} Add Employee
              </Typography> */}
              <TextField
                name="creator"
                variant="outlined"
                label="Casual Leave"
                fullWidth
                value={postData.creator}
                // onChange={
                //   (e) => setPostData({ ...postData, creator: e.target.value })
                //   // setValueState(e.target.value)
                // }
              />
              <TextField
                name="creator"
                variant="outlined"
                label="Earned Leaves"
                fullWidth
                value={postData.creator}
                // onChange={
                //   (e) => setPostData({ ...postData, creator: e.target.value })
                //   // setValueState(e.target.value)
                // }
              />
              <TextField
                name="title"
                variant="outlined"
                label="HPL"
                fullWidth
                value={postData.title}
                // onChange={(e) =>
                //   setPostData({ ...postData, title: e.target.value })
                // }
              />
              <TextField
                name="tags"
                variant="outlined"
                label="CCL"
                fullWidth
                value={postData.tags}
                // onChange={(e) =>
                //   setPostData({ ...postData, tags: e.target.value.split(",") })
                // }
              />
              <TextField
                name="tags"
                variant="outlined"
                label="Maternity"
                fullWidth
                value={postData.tags}
                // onChange={(e) =>
                //   setPostData({ ...postData, tags: e.target.value.split(",") })
                // }
              />
              <TextField
                name="tags"
                variant="outlined"
                label="Others"
                fullWidth
                value={postData.tags}
                // onChange={(e) =>
                //   setPostData({ ...postData, tags: e.target.value.split(",") })
                // }
              />
            </form>
          </AccordionDetails>
        </Accordion>

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
      </div>
    </Paper>
  );
};

export default Form;
