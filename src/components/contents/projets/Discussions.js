import React from "react";
import {
  List,
  Box,
  Typography,
  Button,
  Link,
  Paper,
  ListItem,
  Avatar,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import useStyles from "./leftContentStyle";
import clsx from "clsx";
import topic from "../../../images/topic.png";
import person from "../../../images/person.png";
import person_3 from "../../../images/person_3.png";
import person_4 from "../../../images/person_4.png";

const Discussions = () => {
  const classes = useStyles();
  return (
    <Box>
      <Box py={2}>
        <Typography className={classes.typoTitle}>Top Discussions</Typography>
      </Box>
      <Paper>
        <List>
          <ListItem className={classes.item}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography
                  className={clsx(classes.typoSize, classes.typoWeight)}
                >
                  <Link className={classes.colorLink} to="#">
                    If ironing 2.0 is to exist what would it look like for you
                  </Link>
                </Typography>
              </Box>
              <Avatar src={person} />
            </Box>
            <Box display="flex" flexWrap="nowrap" pt={1}>
              <Box>
                <Button
                  variant="text"
                  size="small"
                  className={clsx(
                    classes.btnSize,
                    classes.discussion,
                    classes.actionBtn
                  )}
                  startIcon={<ArrowDropUpIcon />}
                >
                  40
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  startIcon={
                    <img src={topic} className={classes.img} alt="topic" />
                  }
                  size="small"
                  className={clsx(
                    classes.btnSize,
                    classes.discussion,
                    classes.actionBtn
                  )}
                >
                  7
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  size="small"
                  className={clsx(
                    classes.btnSize,
                    classes.discussion,
                    classes.actionBtn
                  )}
                >
                  Join discussion
                </Button>
              </Box>
            </Box>
          </ListItem>
          <ListItem className={classes.item}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography
                  className={clsx(classes.typoSize, classes.typoWeight)}
                >
                  <Link className={classes.colorLink} to="#">
                    What are good practices to make sure action-items get
                    followed through after meetings?
                  </Link>
                </Typography>
              </Box>
              <Avatar src={person_3} />
            </Box>
            <Box display="flex" flexWrap="nowrap" pt={1}>
              <Box>
                <Button
                  variant="text"
                  size="small"
                  className={clsx(
                    classes.btnSize,
                    classes.discussion,
                    classes.actionBtn
                  )}
                  startIcon={<ArrowDropUpIcon />}
                >
                  44
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  startIcon={
                    <img src={topic} className={classes.img} alt="topic" />
                  }
                  size="small"
                  className={clsx(
                    classes.btnSize,
                    classes.discussion,
                    classes.actionBtn
                  )}
                >
                  11
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  size="small"
                  className={clsx(
                    classes.btnSize,
                    classes.discussion,
                    classes.actionBtn
                  )}
                >
                  Join discussion
                </Button>
              </Box>
            </Box>
          </ListItem>
          <ListItem className={classes.item}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography
                  className={clsx(classes.typoSize, classes.typoWeight)}
                >
                  <Link className={classes.colorLink} to="#">
                    Share your product here to get support, feedback, users (w/c
                    8th of June)
                  </Link>
                </Typography>
              </Box>
              <Avatar src={person_4} />
            </Box>
            <Box display="flex" flexWrap="nowrap" pt={1}>
              <Box>
                <Button
                  variant="text"
                  size="small"
                  className={clsx(
                    classes.btnSize,
                    classes.discussion,
                    classes.actionBtn
                  )}
                  startIcon={<ArrowDropUpIcon />}
                >
                  63
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  startIcon={
                    <img src={topic} className={classes.img} alt="topic" />
                  }
                  size="small"
                  className={clsx(
                    classes.btnSize,
                    classes.discussion,
                    classes.actionBtn
                  )}
                >
                  151
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  size="small"
                  className={clsx(
                    classes.btnSize,
                    classes.discussion,
                    classes.actionBtn
                  )}
                >
                  Join discussion
                </Button>
              </Box>
            </Box>
          </ListItem>
          <ListItem className={classes.item}>
            <Box textAlign="center">
              <Button
                variant="text"
                size="small"
                className={clsx(classes.btnSize, classes.discussion)}
              >
                <Link className={classes.orange} to="#">
                  view more discussions
                </Link>
              </Button>
            </Box>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Discussions;
