import React from "react";
import {
  Paper,
  List,
  ListItemSecondaryAction,
  ListItem,
  Avatar,
  Divider,
  Box,
  Typography,
  Button,
  Link,
  ListItemAvatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import TWitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import ReplyIcon from "@material-ui/icons/Reply";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { connect } from "react-redux";
import CustomAvatar from "./CustomAvatar";
import clsx from "clsx";
import topicIcon from "../../../images/topic.png";

const useStyles = makeStyles({
  counter: {
    width: "60px",
    height: "70px",
    border: "1px solid #d44b11",
    color: "#d44b11",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  iconSize: {
    fontSize: "12px",
  },
  paper: {
    boxShadow: "none",
    zIndex: 1,
    padding: "3%",
  },
  avatar: {
    borderColor: "rgba(240,240,240,0.5)",
    width: 85,
    height: 85,
    border: "1px solid #eeeeee",
    marginRight: "15px",
    background: "rgba(240,240,240,0.5)",
  },
  paperHover: {
    padding: "1%",
    borderRadius: "5px",
    "&:hover": {
      background: "rgba(250,250,250,0.7)",
      cursor: "pointer",
    },
  },
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
  avatarImage: {
    width: "95%",
    height: "100%",
  },
  boxAvatarImage: {
    width: "100%",
    overflowX: "scroll",
    display: "flex",
    height: "270px",
    background: "#eeeeee",
  },
  avatarImageMini: {
    width: "40px",
    height: "40px",
    marginRight: "8px",
    background: "#eeeeee",
  },
  tw: {
    borderColor: "#1DA1F2",
    color: "#1DA1F2",
    boxShadow: "none",
    fontSize: "12px",
    "&:hover": {
      background: "#1DA1F2",
    },
  },
  fb: {
    borderColor: "#4267B2",
    color: "#4267B2",
    "&:hover": {
      backgroundColor: "#4267B2",
      color: "white",
    },
  },

  commonBtn: {
    boxShadow: "none",
    fontSize: "12px",
    "&:hover": {
      color: "white",
    },
  },
  embed: {
    fontSize: "12px",
  },
  voteColor: {
    color: "#d44b11",
  },
  avatarBackground: {
    background: "#FF5722",
    width: "30px",
    height: "30px",
    fontSize: "16px",
  },
  typoText: {
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "bold",
  },
  btn: {
    color: "grey",
    fontSize: "12px",
    "&:hover": {
      background: "none",
    },
  },
  weight: {
    fontWeight: "bold",
  },
  boxMiniAvatar: {
    display: "flex",
    overflowX: "scroll",
  },
});

const Preview = ({
  name,
  summary,
  description,
  topicCounter,
  voteCounter,
  imageUrl,
  topic,
  activeStep,
  user,
  comment,
  pad,
}) => {
  const classes = useStyles();
  let [visible, setVisible] = React.useState(false);
  const handleMouseOver = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);

  return (
    <Box pt={pad}>
      <Typography color="textSecondary" variant="overline">
        preview
      </Typography>
      {activeStep === 0 ? (
        <Paper className={clsx(classes.paper, classes.paperHover)}>
          <List dense>
            <ListItem
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              style={{ display: "block" }}
            >
              <Box display="flex">
                <ListItemAvatar>
                  <CustomAvatar
                    imageUrl={imageUrl[0] && imageUrl[0].fileBlod}
                    avatarType="mini"
                    classStyle={classes.avatar}
                  />
                </ListItemAvatar>
                <Box>
                  <Box>
                    <Typography variant="h6" className={classes.weight}>
                      {name || "Name"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      color="textSecondary"
                      style={{ fontSize: "12px" }}
                    >
                      {summary.charAt(0).toUpperCase() + summary.slice(1) ||
                        "Tagline"}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    flexDirection="column"
                  >
                    <Box
                      display="flex"
                      justifySelf="flex-end"
                      justifyContent="center"
                      pt={2}
                    >
                      <Box className={classes.share}>
                        <Typography
                          color="textSecondary"
                          className={classes.weight}
                        >
                          <img
                            style={{ height: "13px", marginRight: "5px" }}
                            src={topicIcon}
                            alt=""
                          />
                          {topicCounter || 5}
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
                            className={classes.iconSize}
                          >
                            {topic}
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <ListItemSecondaryAction>
                <Box className={classes.counter}>
                  <ArrowDropUpIcon />
                  <Typography variant="h6" className={classes.iconSize}>
                    {voteCounter || 1024}
                  </Typography>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
      ) : null}

      {activeStep === 1 ? (
        <React.Fragment>
          <Paper className={classes.paper} style={{ marginBottom: "30px" }}>
            <Box>
              <Box className={classes.boxAvatarImage}>
                <CustomAvatar
                  classStyle={classes.avatarImage}
                  imageUrl={(imageUrl[1] && imageUrl[1].fileBlod) || ""}
                />
                <CustomAvatar
                  classStyle={classes.avatarImage}
                  imageUrl={(imageUrl[2] && imageUrl[2].fileBlod) || ""}
                />
                <CustomAvatar
                  classStyle={classes.avatarImage}
                  imageUrl={(imageUrl[3] && imageUrl[3].fileBlod) || ""}
                />
                {imageUrl.slice(4).map((image, index) => (
                  <CustomAvatar
                    classStyle={classes.avatarImage}
                    imageUrl={image.fileBlod}
                    key={index}
                  />
                ))}
              </Box>
              <Box my={1} pb={1} className={classes.boxMiniAvatar}>
                <CustomAvatar
                  classStyle={classes.avatarImageMini}
                  imageUrl={(imageUrl[1] && imageUrl[1].fileBlod) || ""}
                  avatarType="mini"
                />
                <CustomAvatar
                  classStyle={classes.avatarImageMini}
                  imageUrl={(imageUrl[2] && imageUrl[2].fileBlod) || ""}
                  avatarType="mini"
                />
                <CustomAvatar
                  classStyle={classes.avatarImageMini}
                  imageUrl={(imageUrl[3] && imageUrl[3].fileBlod) || ""}
                  avatarType="mini"
                />
                {imageUrl.slice(4).map((image, index) => (
                  <CustomAvatar
                    classStyle={classes.avatarImageMini}
                    imageUrl={image.fileBlod}
                    key={index}
                  />
                ))}
              </Box>
            </Box>
          </Paper>

          <Paper className={classes.paper}>
            <Box display="flex" mx={2} my={2}>
              <Box>
                <Button
                  variant="outlined"
                  className={clsx(classes.tw, classes.commonBtn)}
                  startIcon={<TWitterIcon />}
                >
                  TWEET
                </Button>
              </Box>
              <Box mx={1}>
                <Button
                  variant="outlined"
                  className={clsx(classes.fb, classes.commonBtn)}
                  startIcon={<FacebookIcon />}
                >
                  SHARE
                </Button>
              </Box>
              <Box>
                <Button variant="outlined">
                  <PlaylistAddIcon />
                </Button>
              </Box>
            </Box>
            <Divider />
            <Box>
              <Box my={2}>
                <Typography>{description || "description ici !"}</Typography>
              </Box>
              <Box>
                <Typography style={{ fontSize: "13px" }}>
                  have a question about this product?{" "}
                  <span style={{ color: "#d44b11" }}>Ask the Markers</span>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </React.Fragment>
      ) : null}

      {activeStep === 2 ? (
        <Paper className={classes.paper}>
          <Box px={2}>
            <Box display="flex">
              <Box mb={1}>
                <Box mb={2}>
                  <Typography
                    color="textSecondary"
                    className={classes.typoText}
                  >
                    hunter
                  </Typography>
                </Box>
                <Box display="flex">
                  <Avatar className={classes.avatarBackground}>
                    {(user.displayName && user.displayName.charAt(0)) || "f"}
                  </Avatar>
                  <Box pt={1} mx={2}>
                    <Typography
                      className={classes.typoText}
                      style={{ textTransform: "none" }}
                    >
                      {user.name || "frank arnaud"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box mx={1} px={1}>
                <Box mb={2}>
                  <Typography
                    color="textSecondary"
                    className={classes.typoText}
                  >
                    markers
                  </Typography>
                </Box>
                <Box pt={1}>
                  <Typography
                    color="textSecondary"
                    style={{ fontSize: "12px" }}
                  >
                    there are no markers yet
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box display="flex" mt={2}>
              <Avatar className={classes.avatarBackground}>
                {(user.displayName && user.displayName.charAt(0)) || "f"}
              </Avatar>
              <Box mx={2}>
                <Box>
                  <Typography
                    className={classes.typoText}
                    style={{ textTransform: "none" }}
                  >
                    {user.displayName || "frank arnaud"}
                  </Typography>
                </Box>
                <Box mb={3}>
                  <Typography
                    style={{ fontSize: "13px" }}
                    color="textSecondary"
                  >
                    {user.displayName || "frank_arnaud null"}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    color="textSecondary"
                    style={{ fontSize: "14px" }}
                  >
                    {comment ||
                      "Explain how you discovered this product... invite people to join the conversation, ask questions to the Makers."}
                  </Typography>
                </Box>
                <Box display="flex" mt={1}>
                  <Box>
                    <Button
                      className={classes.btn}
                      variant="text"
                      startIcon={<ArrowDropUpIcon />}
                    >
                      10
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      className={classes.btn}
                      variant="text"
                      startIcon={<ReplyIcon />}
                    >
                      reply
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      className={classes.btn}
                      variant="text"
                      disabled={true}
                    >
                      a minute ago
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      ) : null}
    </Box>
  );
};

Preview.propTypes = {
  voteCounter: PropTypes.number,
  topicCounter: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  topic: PropTypes.string,
  imageUrl: PropTypes.array,
  activeStep: PropTypes.number,
  pad: PropTypes.number,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Preview);
