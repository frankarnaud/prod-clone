import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Typography,
  Link,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import VoteCounter from "./VoteCounter";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { updateProjectInfo } from "../../../store/actions";
import { firestore } from "../../../firebase/firebase.utils";
import topic from "../../../images/topic.png";
import { useDispatch, useSelector } from "react-redux";
import { formatName } from "../../../utils/appUtils";
import { useLocation } from "react-router-dom";
import { imagesStore } from "../../../storage";

const useStyles = makeStyles({
  share: {
    border: "1px solid #dddddd",
    borderRadius: "3px",
    width: "45px",
    height: "20px",
    textAlign: "center",
    lineHeight: "10px",
    "&:hover": {
      background: "#dddddd",
    },
  },
  openNew: {
    width: "25px",
    height: "19px",
    border: "1px solid #dddddd",
    textAlign: "center",
    borderRadius: "3px",
    "&:hover": {
      background: "#dddddd",
    },
  },
  avatar: {
    borderRadius: "none",
    width: "85px",
    height: "85px",
    border: "1px solid #eeeeee",
    marginRight: "15px",
  },
  iconSize: {
    fontSize: "15px",
  },
  typoSize: {
    fontSize: "12px",
  },
  offline: {
    color: "red",
    fontSize: "10px",
  },
});

export default function ProjetSummary({ project }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [visible, setVisible] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  const handleMouseOver = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);
  const isOnline = useSelector((state) => state.isOnline);
  const [image, setImage] = React.useState("");

  const handleClick = () => {
    dispatch(
      updateProjectInfo({
        id: project.id,
        topic: project.topic,
        from: location.pathname,
      })
    );
    history.push(`/posts/${project.name}`);
  };

  React.useEffect(() => {
    const getCounter = () => {
      const vRef = firestore
        .collection("projects")
        .doc(project.id)
        .collection("voted_users");
      vRef.get().then((votes) => {
        setCounter(votes.docs.length);
      });
    };
    getCounter();
  }, [project]);

  React.useEffect(() => {
    if (navigator.onLine) {
      imagesStore.getItem(project.id).then((storeValue) => {
        if (!storeValue) {
          fetch(project.mainImageUrl)
            .then((response) => {
              return response.blob();
            })
            .then((blod) => {
              const localImageUrl = URL.createObjectURL(blod);
              setImage(localImageUrl);
              imagesStore
                .setItem(project.id, blod)
                .then(() => console.log("image are stored"));
            });
        } else {
          setImage(URL.createObjectURL(storeValue));
        }
      });
    } else {
      if (!project.offline) {
        imagesStore.getItem(project.id).then((imageBlod) => {
          if (imageBlod) {
            setImage(URL.createObjectURL(imageBlod));
          }
        });
      }
    }
  }, []);

  return (
    <ListItem
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      button
      onClick={handleClick}
    >
      <ListItemAvatar>
        <Avatar
          variant="square"
          alt="ProdHunt Logo"
          src={project.offline ? project.mainImageUrl.fileBlod : image}
          className={classes.avatar}
        />
      </ListItemAvatar>
      <Box display="flex" alignItems="flex-start" flexDirection="column">
        <ListItemText
          primary={
            <Typography color="textSecondary" style={{ fontWeight: "bold" }}>
              {formatName(project.name)}
            </Typography>
          }
          secondary={
            <Typography color="textSecondary" className={classes.typoSize}>
              {project.summary}
            </Typography>
          }
        />
        <Box
          display="flex"
          justifySelf="flex-end"
          justifyContent="center"
          pt={1}
        >
          <Box className={classes.share}>
            <Typography color="textSecondary" style={{ fontWeight: "bold" }}>
              <img
                style={{ height: "13px", marginRight: "5px" }}
                alt="topic"
                src={topic}
              />
              {project.topicCounter}
            </Typography>
          </Box>
          {visible ? (
            <Box mx={1} className={classes.openNew}>
              <Typography>
                <OpenInNewIcon className={classes.iconSize} />
              </Typography>
            </Box>
          ) : null}
          <Box px={1}>
            <Typography>
              <Link
                color="textSecondary"
                className={classes.typoSize}
                to={`/topic/${project.topic}`}
                component={RouterLink}
              >
                {project.topic}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <ListItemSecondaryAction>
        <VoteCounter counter={counter} projectId={project.id} details={false} />
        {project.offline && !isOnline ? (
          <span className={classes.offline}>offline mode, not submitted</span>
        ) : null}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

ProjetSummary.propTypes = {
  project: PropTypes.object.isRequired,
};
