import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  // Typography,
  Paper,
  Container,
} from "@material-ui/core";
import Radio from "@mui/material/Radio";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MaterialTable from "material-table";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
const postingList = [];

const rewardsList = [];

const punishmentList = [];

const professionalQualificationList = [];

const specialTrainingList = [];

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({
    email: "",
    Name: "",
    Rank: "",
    Emp_Code: "",
    BeltNo: "",
    PSINo: "",
    ProfileImg: "",
    Level: "",
    Password: "", // if rights
    FathersOrHusbandsName: "",
    Dob: "",
    Doa: "",
    EdnQualification: "",
    Category: "",
    PermanentAddress: "",
    CL: "",
    EL: "",
    HPL: "",
    CCL: "",
    Maternity: "",
    Others: "",
    isAdmin: false,
  });
  const [access, setValueState] = useState("");
  const [postingData, setPostingData] = useState(postingList);
  const [rewardsData, setRewardsData] = useState(rewardsList);
  const [punishmentData, setPunishmentData] = useState(punishmentList);
  const [specialTrainingData, setSpecialTrainingData] =
    useState(specialTrainingList);
  const [professionalQualification, setProfessionalQualification] = useState(
    professionalQualificationList
  );
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();

  const httpRequest = async () => {
    setLoading(false);
    const data = {
      email: postData.email,
      Name: postData.Name,
      Rank: postData.Rank,
      EmpCode: postData.Emp_Code,
      BeltNo: postData.BeltNo,
      PSINo: postData.PSINo,
      ProfileImg: postData.ProfileImg,
      isAdmin: postData.isAdmin,
      Level: 0,
      Password: postData.Password, // if rights
      FathersOrHusbandsName: postData.FathersOrHusbandsName,
      Dob: postData.Dob,
      Doa: postData.Dob,
      EdnQualification: postData.EdnQualification,
      Category: "yyy",
      PermanentAddress: postData.PermanentAddress,
      Posting: postingData,
      Rewards: rewardsData,
      Punishments: punishmentData,
      CL: postData.CL,
      EL: postData.EL,
      HPL: postData.HPL,
      CCL: postData.CCL,
      Maternity: postData.Maternity,
      Others: postData.Others,
      Qualification: professionalQualification,
      Training: specialTrainingData,
    };
    console.log("data add", data);
    try {
      axios
        .post("https://reactbackend-demo.onrender.com/alluser/adduser", {
          email: postData.email,
          Name: postData.Name,
          Rank: postData.Rank,
          EmpCode: postData.Emp_Code,
          BeltNo: postData.BeltNo,
          PSINo: postData.PSINo,
          ProfileImg: postData.ProfileImg,
          isAdmin: postData.isAdmin,
          Level: 0,
          Password: postData.Password, // if rights
          FathersOrHusbandsName: postData.FathersOrHusbandsName,
          Dob: postData.Dob,
          Doa: postData.Dob,
          EdnQualification: postData.EdnQualification,
          Category: "yyy",
          PermanentAddress: postData.PermanentAddress,
          Posting: postingData,
          Rewards: rewardsData,
          Punishments: punishmentData,
          CL: postData.CL,
          EL: postData.EL,
          HPL: postData.HPL,
          CCL: postData.CCL,
          Maternity: postData.Maternity,
          Others: postData.Others,
          Qualification: professionalQualification,
          Training: specialTrainingData,
          headers: {
            "Content-Type": "application/json",
          },
          maxBodyLength: Infinity,
        })
        .then((resposne) => {
          console.log("Add Response from Api", resposne.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(true);
        });
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  const positngColumns = [
    { title: "Place of Posting", field: "placeOfPosting" },
    { title: "From", field: "From" },
    { title: "To", field: "to" },
    { title: "Duration", field: "duration" },
  ];

  const rewardsColumns = [
    { title: "Rewarded For", field: "rewardFor" },
    { title: "By Whom", field: "byWhom" },
    { title: "Ob_no", field: "Obno" },
  ];

  const punishmentsColumns = [
    { title: "Punishment For", field: "punishmentFor" },
    { title: "By Whom", field: "byWhom" },
    { title: "OB_no", field: "Obno" },
  ];

  const professionalQualificationColumns = [
    { title: "Name of Course/Certification", field: "Course" },
    { title: "Conducted By", field: "conductedBy" },
    {
      title: "Date of award of certification",
      field: "DateOfAwardofCertification",
    },
  ];

  const SpecialTrainingColumns = [
    { title: "Traning Details", field: "TrainingDetails" },
    { title: "Name of Training Institute", field: "NameOfTrainingInstitute" },
    { title: "Duration", field: "Duration" },
    { title: "Date of Completion", field: "DateOfCompletion" },
  ];
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));

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
    // setCurrentId(null);
    // setPostData({
    //   creator: "",
    //   title: "",
    //   message: "",
    //   tags: "",
    //   selectedFile: "",
    // });
    console.log("printing data", professionalQualification);
  };

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  // if (!user?.result?.name) {
  //   return (
  //     <Paper className={classes.paper}>
  //       <Typography variant="h6" align="center">
  //         Please Sign In to Register Employee.
  //       </Typography>
  //     </Paper>
  //   );
  // }
  // EmpCode: postData.Emp_Code,
  // Level: postData.Level,
  // PSINo: postData.PSINo,

  return (
    <Paper className={classes.paper} raised elevation={6}>
      {loading ? (
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
                  label="Email"
                  fullWidth
                  value={postData.creator}
                  onChange={
                    (e) => setPostData({ ...postData, email: e.target.value })
                    // setValueState(e.target.value)
                  }
                />
                <TextField
                  name="creator"
                  variant="outlined"
                  label="Name"
                  fullWidth
                  value={postData.creator}
                  onChange={
                    (e) => setPostData({ ...postData, Name: e.target.value })
                    // setValueState(e.target.value)
                  }
                />
                <TextField
                  name="creator"
                  variant="outlined"
                  label="Belt No"
                  fullWidth
                  value={postData.creator}
                  onChange={
                    (e) => setPostData({ ...postData, BeltNo: e.target.value })
                    // setValueState(e.target.value)
                  }
                />
                <TextField
                  name="creator"
                  variant="outlined"
                  label="Pis No"
                  fullWidth
                  value={postData.creator}
                  onChange={
                    (e) => setPostData({ ...postData, PSINo: e.target.value })
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
                    setPostData({ ...postData, Rank: e.target.value })
                  }
                />
                <TextField
                  name="tags"
                  variant="outlined"
                  label="Fathers Name"
                  fullWidth
                  value={postData.tags}
                  onChange={(e) => {
                    postData.FathersOrHusbandsName = e.target.value;
                    setPostData({ ...postData });
                  }}
                />
                <TextField
                  name="tags"
                  variant="outlined"
                  label="Date of Birth YYYY-MM-DD"
                  fullWidth
                  value={postData.tags}
                  onChange={(e) => {
                    postData.Dob = e.target.value;
                    setPostData({ ...postData });
                  }}
                />
                <TextField
                  name="tags"
                  variant="outlined"
                  label="Date of Appointment YYYY-MM-DD"
                  fullWidth
                  value={postData.tags}
                  onChange={(e) => {
                    postData.Doa = e.target.value;
                    setPostData({ ...postData });
                  }}
                />
                <TextField
                  name="tags"
                  variant="outlined"
                  label="Edu. Qualification"
                  fullWidth
                  value={postData.tags}
                  onChange={(e) => {
                    postData.EdnQualification = e.target.value;
                    setPostData({ ...postData });
                  }}
                />
                <TextField
                  name="tags"
                  variant="outlined"
                  label="Emp_Code"
                  fullWidth
                  value={postData.tags}
                  onChange={(e) => {
                    postData.Emp_Code = e.target.value;
                    setPostData({ ...postData });
                  }}
                />
                <TextField
                  name="tags"
                  variant="outlined"
                  label="Password"
                  fullWidth
                  value={postData.tags}
                  onChange={(e) => {
                    postData.Password = e.target.value;
                    setPostData({ ...postData });
                  }}
                />
                <TextField
                  name="message"
                  variant="outlined"
                  label="Permanent Address"
                  fullWidth
                  value={postData.message}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      PermanentAddress: e.target.value,
                    })
                  }
                />

                <div className={classes.fileInput}>
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Admin
                  </Typography>
                  <Radio
                    checked={postData.isAdmin}
                    onChange={() => setPostData({ ...postData, isAdmin: true })}
                    value={postData.isAdmin}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                </div>
                <div className={classes.fileInput}>
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Upload Photo
                  </Typography>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setPostData({
                        ...postData,
                        ProfileImg: base64,
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
                      const updatedRows = [...postingData, newRow];
                      console.log("add", updatedRows);
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
                      const updatedRows = [...rewardsData, newRow];
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
                      const updatedRows = [...punishmentData, newRow];
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
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Leaves
              </Typography>
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
                  onChange={(e) => {
                    postData.CL = e.target.value;
                    setPostData({ ...postData });
                  }}
                />
                <TextField
                  name="creator"
                  variant="outlined"
                  label="Earned Leaves"
                  fullWidth
                  value={postData.creator}
                  onChange={(e) => {
                    postData.EL = e.target.value;
                    setPostData({ ...postData });
                  }}
                />
                <TextField
                  name="title"
                  variant="outlined"
                  label="HPL"
                  fullWidth
                  value={postData.title}
                  onChange={(e) => {
                    postData.HPL = e.target.value;
                    setPostData({ ...postData });
                  }}
                />
                <TextField
                  name="tags"
                  variant="outlined"
                  label="CCL"
                  fullWidth
                  value={postData.tags}
                  onChange={(e) => {
                    postData.CCL = e.target.value;
                    setPostData({ ...postData });
                  }}
                />
                <TextField
                  name="tags"
                  variant="outlined"
                  label="Maternity"
                  fullWidth
                  value={postData.tags}
                  onChange={(e) => {
                    postData.Maternity = e.target.value;
                    setPostData({ ...postData });
                  }}
                />
                <TextField
                  name="tags"
                  variant="outlined"
                  label="Others"
                  fullWidth
                  value={postData.tags}
                  onChange={(e) => {
                    postData.Others = e.target.value;
                    setPostData({ ...postData });
                  }}
                />
              </form>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Professional Qualification
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MaterialTable
                title="Qualification Data"
                data={professionalQualification}
                columns={professionalQualificationColumns}
                editable={{
                  onRowAdd: (newRow) =>
                    new Promise((resolve, reject) => {
                      const updatedRows = [
                        ...professionalQualification,
                        newRow,
                      ];
                      setTimeout(() => {
                        setProfessionalQualification(updatedRows);
                        resolve();
                      }, 2000);
                    }),
                  onRowDelete: (selectedRow) =>
                    new Promise((resolve, reject) => {
                      const index = selectedRow.tableData.id;
                      const updatedRows = [...professionalQualification];
                      updatedRows.splice(index, 1);
                      setTimeout(() => {
                        setProfessionalQualification(updatedRows);
                        resolve();
                      }, 2000);
                    }),
                  onRowUpdate: (updatedRow, oldRow) =>
                    new Promise((resolve, reject) => {
                      const index = oldRow.tableData.id;
                      const updatedRows = [...professionalQualification];
                      updatedRows[index] = updatedRow;
                      setTimeout(() => {
                        setProfessionalQualification(updatedRows);
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
            expanded={expanded === "panel7"}
            onChange={handleChange("panel7")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Special Training
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MaterialTable
                title="SpecialTraining Data"
                data={specialTrainingData}
                columns={SpecialTrainingColumns}
                editable={{
                  onRowAdd: (newRow) =>
                    new Promise((resolve, reject) => {
                      const updatedRows = [...specialTrainingData, newRow];
                      setTimeout(() => {
                        setSpecialTrainingData(updatedRows);
                        resolve();
                      }, 2000);
                    }),
                  onRowDelete: (selectedRow) =>
                    new Promise((resolve, reject) => {
                      const index = selectedRow.tableData.id;
                      const updatedRows = [...specialTrainingData];
                      updatedRows.splice(index, 1);
                      setTimeout(() => {
                        setSpecialTrainingData(updatedRows);
                        resolve();
                      }, 2000);
                    }),
                  onRowUpdate: (updatedRow, oldRow) =>
                    new Promise((resolve, reject) => {
                      const index = oldRow.tableData.id;
                      const updatedRows = [...specialTrainingData];
                      updatedRows[index] = updatedRow;
                      setTimeout(() => {
                        setSpecialTrainingData(updatedRows);
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
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            onClick={() => httpRequest()}
          >
            Submit
          </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={Clear}
            fullWidth
          >
            Clear
          </Button> */}
        </div>
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
    </Paper>
  );
};

export default Form;

// Posting: [
//   {
//     placeOfPosting: "dds",
//     From: "dsd",
//     to: "ds",
//     duration: "dsd",
//     tableData: 0,
//   },
//   {
//     placeOfPosting: "ddrees",
//     From: "deewwddfsd",
//     to: "dswwe",
//     duration: "dwwwwsd",
//     tableData: 0,
//   },
// ],
// Rewards: [
//   {
//     RewardFor: "sdsd",
//     By_whom: "sdsd",
//     OB_No: "dfd",
//     tableData: 0,
//   },
// ],
// Punishments: [
//   {
//     PunismentFor: "yuy",
//     ByWhome: "yuyu",
//     OBNo: "yuyu",
//     tableData: 0,
//   },
// ],
// CL: postData.CL,
// EL: postData.EL,
// HPL: postData.HPL,
// CCL: postData.CCL,
// Maternity: postData.Maternity,
// Others: postData.Others,
// Qualification: [
//   {
//     Course: "dfw",
//     ConductedBy: "wdw",
//     DateOfAwardofCertification: "dw",
//     tableData: 0,
//   },
// ],
// Training: [
//   {
//     TrainingDetails: "wdw",
//     NameOfTrainingInstitute: "dwd",
//     DateOfCompletion: "dwdw",
//     Duration: "wdw",
//     tableData: 0,
//   },
// ],
