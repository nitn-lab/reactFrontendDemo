import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import MaterialTable from "material-table";
import { getPost, getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";
import axios from "axios";
import { usePDF } from "react-to-pdf";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const EmployeeDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const [employeeDetails, setEmployeeDetails] = useState();
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const { state } = useLocation();

  const [pdfName, setPdfName] = useState("");
  const { toPDF, targetRef } = usePDF({ filename: `${pdfName.replace(" ", "_")}.pdf` });
  console.log("uselocation", state);
  const [isStateSet, setIsStateSet] = useState(false);

  useEffect(() => {
    findUserById();
  }, [state]);

  const downloadUserData = (name) => {
    setPdfName(name);
    console.log(name)
    console.log(pdfName)
    setIsStateSet(true);
    //  if(pdfName){toPDF()}
  };
  useEffect(() => {
    if (isStateSet) {
     
      toPDF();
    }
  }, [isStateSet]);
  const findUserById = async () => {
    try {
      await axios
        .get(
          `https://reactbackend-demo.onrender.com/alluser/finduserbyid/${state}`
        )
        .then((response) => {
          console.log("findById", response.data);
          setEmployeeDetails(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
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
  // if (isLoading) {
  //   return (
  //     <Paper elevation={6} className={classes.loadingPaper}>
  //       <CircularProgress size="7em" />
  //     </Paper>
  //   );
  // }

  // const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6} ref={targetRef}>
      <Tooltip title="Export Data as PDF" className="exportData">
        <IconButton>
          <SaveAltIcon fontSize="large" color="gray" onClick={() => downloadUserData(employeeDetails.Name)} />
        </IconButton>
      </Tooltip>

      <div >
        <div>
          <Typography variant="h6" component="h2" gutterBottom>
            <strong>1. Name:</strong>
            {employeeDetails?.Name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            // color="textSecondary"
            component="h2"
          >
            <strong>2. Pis No:</strong>
            {employeeDetails?.PSINo}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            // color="textSecondary"
            component="h2"
          >
            <strong>3. Belt No:</strong>
            {employeeDetails?.BeltNo}
          </Typography>
          <Typography gutterBottom variant="h6" component="p">
            <strong>4. Rank:</strong>
            {employeeDetails?.Rank}
          </Typography>
          <Typography gutterBottom variant="h6" component="p">
            <strong>5. Emp Code:</strong>
            {employeeDetails?.EmpCode}
          </Typography>
          <Typography gutterBottom variant="h6" component="p">
            <strong>6. Email:</strong> {employeeDetails?.email}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>7. Fathers Name:</strong>{" "}
            {employeeDetails?.FathersOrHusbandsName}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>8. Date of Birth : </strong>
            {employeeDetails?.Dob}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>9. Date of Appointment :</strong>
            {employeeDetails?.Doa}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>10. Category :</strong>
            {employeeDetails?.Rank}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>11. Permanent Address :</strong>
            {employeeDetails?.PermanentAddress}
          </Typography>
          <Typography gutterBottom variant="h6" component="p">
            <strong>12. CL</strong> {employeeDetails?.CL}
          </Typography>
          <Typography gutterBottom variant="h6" component="p">
            <strong>13. CCL:</strong> {employeeDetails?.CCL}
          </Typography>
          <Typography gutterBottom variant="h6" component="p">
            <strong>14. EL:</strong> {employeeDetails?.EL}
          </Typography>
          <Typography gutterBottom variant="h6" component="p">
            <strong>15. HPL:</strong> {employeeDetails?.HPL}
          </Typography>
          <Typography gutterBottom variant="h6" component="p">
            <strong>16. Maternity:</strong> {employeeDetails?.Maternity}
          </Typography>
          <Typography gutterBottom variant="h6" component="p">
            <strong>17. Others:</strong> {employeeDetails?.Others}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6" gutterBottom>
            <strong>Posting Details</strong>
          </Typography>
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              title="Posting Data"
              data={employeeDetails?.Posting}
              columns={positngColumns}
              options={{
                search: false,
                sorting: false,
                exportButton: true,
              }}
            />
          </div>

          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6" gutterBottom>
            <strong>Rewards</strong>
          </Typography>
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              title="Rewards Data"
              data={employeeDetails?.Rewards}
              columns={rewardsColumns}
              options={{
                search: false,
                sorting: false,
                exportButton: true,
              }}
            />
          </div>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6" gutterBottom>
            <strong>Punishments</strong>
          </Typography>
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              title="Punishments Data"
              data={employeeDetails?.Punishments}
              columns={punishmentsColumns}
              options={{
                search: false,
                sorting: false,
                exportButton: true,
              }}
            />
          </div>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6" gutterBottom>
            <strong>Qualification</strong>
          </Typography>
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              title="Qualification Data"
              data={employeeDetails?.Qualification}
              columns={professionalQualificationColumns}
              options={{
                search: false,
                sorting: false,
                exportButton: true,
              }}
            />
          </div>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6" gutterBottom>
            <strong>Special Training</strong>
          </Typography>
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              title="Training Data"
              data={employeeDetails?.Training}
              columns={SpecialTrainingColumns}
              options={{
                search: false,
                sorting: false,
                exportButton: true,
              }}
            />
          </div>
        </div>
        {/* <div >
          <img
            className={classes.media}
            src={
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            // alt={post.title}
          />
        </div> */}
      </div>
      {/* {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  // onClick={() => openPost(_id)} key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    title
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    name
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    mess
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes:{" "}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )} */}
    </Paper>
  );
};

export default EmployeeDetails;
