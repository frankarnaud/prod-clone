import React from "react";
import { Box, Typography } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { firestore } from "../../../firebase/firebase.utils";
import { useSelector, useDispatch } from "react-redux";
import { updateProjectVote, updateDialog } from "../../../store/actions";
import { updateUserProjectVote } from "../../../store/asycActions";
import clsx from "clsx";

const useStyles = makeStyles({
  counter: {
    width: "60px",
    height: "70px",
    border: "1px solid #eeefff",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(230, 230, 230, 0.2)",
    },
  },
  counterDetails: {
    display: "flex",
    flexGrow: 1,
    height: "50px",
    borderRadius: "3px",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    background: "#d44b11",
    color: "white",
    "&:hover": {
      background: "#FF5722",
    },
  },
  votedStyle: {
    border: "1px solid #d44b11",
    color: "#d44b11",
    background: "none",
    "&:hover": {
      background: "none",
    },
  },
});

const VoteCounter = ({ projectId, user, counter, details, updateDialog }) => {
  const classes = useStyles();
  const [localCounter, setLocalCounter] = React.useState(counter);

  const dispatch = useDispatch();
  const voteInfos = useSelector((state) => state.projectsVotes[projectId]);
  const [styled, setStyled] = React.useState(
    (voteInfos && voteInfos.voted) || false
  );

  const handleClick = () => {
    if (!user) {
      updateDialog(true);
    } else {
      updateCounter();
    }
  };

  const listenerChange = (projectId) => {
    const vRef = firestore
      .collection("projects")
      .doc(projectId)
      .collection("voted_users");
    vRef.onSnapshot((docs) => {
      setLocalCounter(docs.docs.length);
    });
  };

  const updateCounter = () => {
    const { voted } = voteInfos;
    const vRef = firestore
      .collection("projects")
      .doc(projectId)
      .collection("voted_users")
      .doc(user.uid);
    if (!voted) {
      vRef.set({ voted: true }).then(() => {
        setStyled(true);
        dispatch(updateUserProjectVote(voted, user.uid || "hacker", projectId));
      });
    } else {
      vRef.delete().then(() => {
        setStyled(false);
        dispatch(updateUserProjectVote(voted, user.uid || "hacker", projectId));
      });
    }
  };

  React.useEffect(() => {
    if (user && !voteInfos) {
      const prodVoteRef = firestore
        .collection("users")
        .doc(user.uid || "hacker")
        .collection("projects_votes")
        .doc(projectId);
      prodVoteRef.get().then((vote) => {
        if (vote.exists) {
          dispatch(updateProjectVote({ id: projectId, voted: true }));
          setStyled(true);
        } else {
          dispatch(updateProjectVote({ id: projectId, voted: false }));
        }
      });
    }
  }, [user, projectId]);

  React.useEffect(() => {
    listenerChange(projectId);
  }, [projectId]);

  if (!details) {
    return (
      <Box
        className={clsx(
          classes.counter,
          user && styled ? classes.votedStyle : ""
        )}
        onClick={handleClick}
      >
        <ArrowDropUpIcon />
        <Typography variant="h6" style={{ fontSize: "14px" }}>
          {localCounter}
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box
        className={clsx(
          classes.counterDetails,
          user && styled ? classes.votedStyle : ""
        )}
        onClick={handleClick}
      >
        <Typography>
          <ArrowDropUpIcon />
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          UpVote {localCounter}
        </Typography>
      </Box>
    );
  }
};

VoteCounter.propTypes = {
  user: PropTypes.object,
  updateDialog: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  details: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, { updateDialog })(VoteCounter);
