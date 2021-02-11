import React from "react";
import { List, Paper, Divider } from "@material-ui/core";
import ProjectSummary from "../projets/ProjectSummary";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getUserProjects } from "../../../store/asycActions";

const useStyles = makeStyles({
  paper: {
    boxShadow: "none",
    zIndex: 1,
  },
});

const ProfileDetails = ({ user_id }) => {
  const classes = useStyles();
  const location = useLocation();
  const { rubrique } = useParams("rubrique");
  const submitted = useSelector((state) => state.userProjectsInfos.submitted);
  const isOnline = useSelector((state) => state.isOnline);
  const dispatch = useDispatch();
  const [projects, setProjects] = React.useState([]);

  const getRubriqueDetails = () => {
    if (!submitted) {
      if (isOnline) {
        dispatch(getUserProjects(user_id));
      }
    } else if (rubrique === "submitted") {
      setProjects(submitted);
    } else if (rubrique === "made") {
      setProjects(submitted.filter((prod) => prod.isMaker === true));
    }
  };

  React.useEffect(() => {
    getRubriqueDetails();
  }, [location, submitted]);

  if (projects) {
    return (
      <Paper className={classes.paper}>
        <List component="nav">
          {projects.map((project, index) => (
            <React.Fragment key={index}>
              <ProjectSummary project={project} />
              {index <= projects.length - 2 ? <Divider /> : null}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    );
  } else {
    return null;
  }
};

export default ProfileDetails;
