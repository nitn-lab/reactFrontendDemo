import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Button
} from "@material-ui/core/";
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
import memories from "../../images/memories.png";
import { ThreeDots } from "react-loader-spinner";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import demopic from '../../images/demopic.png'
const EmployeeDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const [employeeDetails, setEmployeeDetails] = useState();
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [pdfName, setPdfName] = useState("");
  const [open, setOpen] = React.useState(false);
  const { toPDF, targetRef } = usePDF({
    filename: `${pdfName.replace(" ", "_")}.pdf`,
  });
  console.log("uselocation", state);
  const [isStateSet, setIsStateSet] = useState(false);

  useEffect(() => {
    findUserById();
  }, [state]);

  const downloadUserData = (name) => {
    setPdfName(name);
    console.log(name);
    console.log(pdfName);
    setIsStateSet(true);
    
    //  if(pdfName){toPDF()}
  };
  useEffect(() => {
    if (isStateSet) {
      toPDF();
      handleClick()
    }
  }, [isStateSet]);
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
  const findUserById = async () => {
    setLoading(false);
    try {
      await axios
        .get(
          `https://reactbackend-demo.onrender.com/alluser/finduserbyid/${state}`
        )
        .then((response) => {
          console.log("findById", response.data);
          setEmployeeDetails(response.data);
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
    { title: "Rewarded For", field: "RewardFor" },
    { title: "By Whom", field: "By_whom" },
    { title: "Ob_no", field: "OB_No" },
  ];

  const punishmentsColumns = [
    { title: "Punishment For", field: "PunismentFor" },
    { title: "By Whom", field: "ByWhome" },
    { title: "OB_no", field: "OBNo" },
  ];

  const professionalQualificationColumns = [
    { title: "Name of Course/Certification", field: "Course" },
    { title: "Conducted By", field: "ConductedBy" },
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
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <Paper
      style={{ padding: "20px", borderRadius: "15px" }}
      elevation={6}
      ref={targetRef}
    >
      {loading ? (
        <>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Successfully Downloaded report"
          action={action}
        />
          <Tooltip title="Export Data as PDF" className="exportData">
            <IconButton>
              <SaveAltIcon
                fontSize="large"
                color="gray"
                onClick={() => downloadUserData(employeeDetails.Name)}
              />
            </IconButton>
          </Tooltip>

          <div>
            <div>
              <section style={{ backgroundColor: "#eee" }}>
                <MDBContainer className="py-5">
                  <img
                    className={classes.image}
                    src={memories}
                    alt="memories"
                    height="70"
                  />
                  <Divider style={{ margin: "20px 0" }} />
                  <MDBRow>
                    <MDBCol lg="4">
                      <MDBCard className="mb-4">
                        <MDBCardBody className="text-center">
                          <MDBCardImage
                            src={employeeDetails?.ProfileImg === "" ? demopic : employeeDetails?.ProfileImg}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid
                          />
                          <p className="text-muted mb-1">
                            {employeeDetails?.Name}
                          </p>
                          <p className="text-muted mb-4">
                            {employeeDetails?.Rank}
                          </p>
                          {/* <div className="d-flex justify-content-center mb-2">
                        <MDBBtn>Follow</MDBBtn>
                        <MDBBtn outline className="ms-1">
                          Message
                        </MDBBtn>
                      </div> */}
                          <MDBRow className="d-flex justify-content-center mb-2">
                            <MDBCol sm="3">
                              <MDBCardText>Emp Code:</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.EmpCode}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow className="d-flex justify-content-center mb-2">
                            <MDBCol sm="3">
                              <MDBCardText>Belt No:</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.BeltNo}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          {/* <MDBRow className="d-flex justify-content-center mb-2">
                            <MDBCol sm="3">
                              <MDBCardText>Pis No:</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.PSINo}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow> */}
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                      <MDBCard className="mb-4">
                        <MDBCardBody>
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Full Name</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.Name}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Email</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.email === '' ? "--" : employeeDetails?.email}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Fathers Name</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.FathersOrHusbandsName === '' ? "--" : employeeDetails?.FathersOrHusbandsName}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          {/* <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Emp Code:</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.EmpCode}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr /> */}
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Date of Birth :</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.Dob}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Gender :</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.Gender}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Education Qualification :</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.EdnQualification}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Address :</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.PermanentAddress === '' ? "--" : employeeDetails?.PermanentAddress}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Date of Appointment :</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.Doa}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Date of Posting :</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.Dop}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Place of Posting :</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {employeeDetails?.Posting[0].placeOfPosting}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </section>

              <Divider style={{ margin: "20px 0" }} />
              <Typography variant="h6" gutterBottom>
                <strong>Leaves Details</strong>
              </Typography>
              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBCardText>Casual Leave</MDBCardText>
                      <MDBCardText>{employeeDetails?.CL === '' ? "--" : employeeDetails?.CL}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBCardText>Child Care Leave (CCL)</MDBCardText>
                      <MDBCardText>{employeeDetails?.CCL === '' ? "--" : employeeDetails?.CCL}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBCardText>Earned Leave (EL)</MDBCardText>
                      <MDBCardText>{employeeDetails?.EL === '' ? "--" : employeeDetails?.EL}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBCardText>Half-Pay Leave (HPL)</MDBCardText>
                      <MDBCardText>{employeeDetails?.HPL === '' ? "--" : employeeDetails?.HPL}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBCardText>Maternity Leave</MDBCardText>
                      <MDBCardText>{employeeDetails?.Maternity === '' ? "--" : employeeDetails?.Maternity}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBCardText>Others Leave</MDBCardText>
                      <MDBCardText>{employeeDetails?.Others === '' ? "--" : employeeDetails?.Others}</MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
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
          </div>
        </>
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

export default EmployeeDetails;

{
  /* <Typography variant="h6" component="h2" gutterBottom>
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
          </Typography> */
}
