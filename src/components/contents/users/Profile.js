import React from "react";
import {
  Box,
  Paper,
  List,
  ListItem,
  Avatar,
  Typography,
  Link,
  Button,
  Divider,
  Container,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  useParams,
  Route,
  useRouteMatch,
  Link as RouterLink,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import ProfileDetails from "./ProfileDetails";
import clsx from "clsx";
import { getVotedProjects } from "../../../store/asycActions";
import { updateUserProjectsInfos } from "../../../store/actions";
import ProjectSummary from "../projets/ProjectSummary";
import projectsStore from "localforage";
import { useSnackbar } from "notistack";

const useStyles = makeStyles({
  paper: {
    boxShadow: "none",
    zIndex: 1,
  },
  paperHeader: {
    background: "rgba(38, 63, 79, 0.82)",
    marginTop: "1%",
  },
  paperSocial: {
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  typoMenu: {
    fontSize: "11px",
    fontWeight: "bold",
  },

  container: {
    paddingLeft: "6%",
    paddingRight: "4%",
    paddingTop: 12,
  },
  avatar: {
    width: "110px",
    height: "110px",
    background: "#FF5722",
  },
  avatarTypo: {
    fontSize: "45px",
  },
  btn: {
    boxShadow: "none",
  },
  typoSize: {
    fontSize: "12px",
    color: "grey",
  },
  typoHeader: {
    color: "white",
    fontSize: "12px",
  },
  btnTwitter: {
    background: "#1DA1F2",
    "&:hover": {
      background: "#1DA1F2",
    },
  },

  btnFacebook: {
    background: "#4267B2",
    "&:hover": {
      background: "#4267B2",
    },
  },
  btnSocial: {
    color: "white",
  },
  typoLeft: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const { username } = useParams("username");
  const { path: pathname, url } = useRouteMatch();
  const infos = useSelector((state) => state.userProjectsInfos.projectsInfos);
  const projects = useSelector((state) => state.userProjectsInfos.upvotes);
  const dispatch = useDispatch();
  const isOnline = useSelector((state) => state.isOnline);
  const [connected, setConnected] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const getUpVotedProjects = () => {
    if (navigator.onLine) {
      if (infos) {
        if (!projects && infos.votedProjects.length !== 0) {
          dispatch(getVotedProjects(infos.votedProjects));
        }
      }
    } else {
      let products = [];
      let localInfos = { upvoted: 0, made: 0 };
      projectsStore
        .length()
        .then((length) => {
          localInfos.submitted = length;
          if (length) {
            projectsStore.iterate((value, key) => {
              products.push(value);
            });
          }
        })
        .then(() => {
          if (!infos) {
            dispatch(
              updateUserProjectsInfos("projectsInfos", { ...localInfos })
            );
          }
          dispatch(updateUserProjectsInfos("submitted", products));
        });
    }
  };

  React.useEffect(() => {
    getUpVotedProjects();
  }, [infos, projects]);

  React.useEffect(() => {
    if (connected) {
      if (isOnline) {
        enqueueSnackbar("You are now connected", { variant: "success" });
      } else {
        enqueueSnackbar("You are disconnected", { variant: "error" });
      }
    } else {
      setConnected(true);
    }
  }, [connected, isOnline]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Box>
        <Paper className={clsx(classes.paper, classes.paperHeader)}>
          <List>
            <ListItem>
              <Box display="flex" p={3}>
                <Avatar className={classes.avatar}>
                  <Typography className={classes.avatarTypo}>
                    {user && user.displayName.charAt(0)}
                  </Typography>
                </Avatar>
                <Box ml={2}>
                  <Box pt={1} mb={1}>
                    <Typography
                      variant="h6"
                      style={{ fontSize: "20px", color: "white" }}
                    >
                      {user && user.displayName}
                    </Typography>
                  </Box>
                  <Box mb={1}>
                    <Typography className={clsx(classes.typoHeader)}>
                      #2625071 {username}
                    </Typography>
                  </Box>
                  <Box display="flex" mt={1}>
                    <Box mr={1}>
                      <Typography>
                        <Link className={clsx(classes.typoHeader)} to="">
                          {0} Following
                        </Link>
                      </Typography>
                    </Box>
                    <Box mx={1}>
                      <Typography>
                        <Link className={clsx(classes.typoHeader)} to="">
                          {0} Followers
                        </Link>{" "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box pt={1}>
                  <Button
                    className={classes.btn}
                    disableElevation
                    variant="contained"
                  >
                    edit
                  </Button>
                </Box>
              </Box>
            </ListItem>
          </List>
        </Paper>
        <Box mt={4} display="flex">
          <Box display="flex" flexDirection="column" mr={2}>
            <Typography>
              <Link
                component={RouterLink}
                className={clsx(classes.typoSize, classes.typoLeft)}
                to={`${url}`}
              >
                {infos && infos.upvoted} Upvotes
              </Link>
            </Typography>
            <Typography>
              <Link
                component={RouterLink}
                className={clsx(classes.typoSize, classes.typoLeft)}
                to={`${url}/submitted`}
              >
                {infos && infos.submitted} Submitted
              </Link>
            </Typography>
            <Typography>
              <Link
                component={RouterLink}
                className={clsx(classes.typoSize, classes.typoLeft)}
                to={`${url}/made`}
              >
                {infos && infos.made} Made
              </Link>
            </Typography>
            <Typography>
              <Link
                component={RouterLink}
                className={clsx(classes.typoSize, classes.typoLeft)}
                to={`${url}/topics`}
              >
                {0} Following Topics
              </Link>
            </Typography>
            <Typography>
              <Link
                component={RouterLink}
                className={clsx(classes.typoSize, classes.typoLeft)}
                to={`${url}/collections`}
              >
                {0} Collection Made
              </Link>
            </Typography>
            <Typography>
              <Link
                component={RouterLink}
                className={clsx(classes.typoSize, classes.typoLeft)}
                to={`${url}/followed_collections`}
              >
                {0} Followed Collections
              </Link>
            </Typography>
          </Box>
          <Box flexGrow={1} px={2}>
            <Paper className={classes.paper}>
              <List component="nav">
                <Switch>
                  <Route exact path={pathname}>
                    {projects &&
                      projects.map((project, index) => (
                        <React.Fragment key={index}>
                          <ProjectSummary project={project} />
                          {index <= projects.length - 2 ? <Divider /> : null}
                        </React.Fragment>
                      ))}
                  </Route>
                  <Route path={`${pathname}/:rubrique`}>
                    <ProfileDetails user_id={user && user.uid} />
                  </Route>
                </Switch>
              </List>
            </Paper>
          </Box>
          <Box width={260} ml={2}>
            <Paper className={clsx(classes.paper, classes.paperSocial)}>
              <Box py={2}>
                <Typography variant="h6" className={classes.typoMenu}>
                  SHARE YOUR PROFILE
                </Typography>
              </Box>
              <Divider />
              <Box display="flex" py={3} justifyContent="center">
                <Box mr={1} flexGrow={1}>
                  <Button
                    fullWidth
                    className={clsx(
                      classes.btn,
                      classes.btnSocial,
                      classes.btnTwitter
                    )}
                    variant="contained"
                  >
                    <TwitterIcon />
                  </Button>
                </Box>
                <Box mx={1} flexGrow={1}>
                  <Button
                    fullWidth
                    className={clsx(
                      classes.btn,
                      classes.btnSocial,
                      classes.btnFacebook
                    )}
                    variant="contained"
                  >
                    <FacebookIcon />
                  </Button>
                </Box>
              </Box>
            </Paper>
            <Paper className={clsx(classes.paper, classes.paperSocial)}>
              <Box flexGrow={1}>
                <Box py={2}>
                  <Typography variant="h6" className={classes.typoMenu}>
                    RECENT COMMENTS
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" flexDirection="column" pb={2} flexGrow={1}>
                  <Box py={1}>
                    <Typography>
                      <Link
                        className={classes.typoSize}
                        to=""
                      >{`${"First and first"}`}</Link>
                    </Typography>
                  </Box>
                  <Box py={1}>
                    <Typography>
                      <Link
                        className={classes.typoSize}
                        to=""
                      >{`${"First and first"}`}</Link>
                    </Typography>
                  </Box>
                  <Box py={1}>
                    <Typography>
                      <Link
                        className={classes.typoSize}
                        to=""
                      >{`${"First and first"}`}</Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
