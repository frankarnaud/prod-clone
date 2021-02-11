import React from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  Paper,
  Typography,
  Link,
  Divider,
} from "@material-ui/core";
import { Link as RouterLink, Route } from "react-router-dom";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";

import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import LogOut from "./LogOut";

const useStyles = makeStyles({
  menuBlock: {
    boxShadow: "none",
    border: "1px solid #eeeeef",
  },
  arrowUpMd: {
    position: "absolute",
    top: "52px",
    right: "5.6%",
  },
  arrowUpLg: {
    right: "18.7%",
  },
  menuPosition: {
    marginTop: "4.25%",
    marginLeft: "2%",
  },
  meunPositionLarger: {
    marginTop: "3.01%",
    marginLeft: "1.5%",
  },
  item: {
    background: "none",
  },
  linkStyles: {
    textTransform: "uppercase",
    fontSize: "11px",
    fontWeight: "bold",
  },
});

const defaultProps = {
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  keepMounted: true,
  getContentAnchorEl: null,
};

export default function SettingMenu() {
  const classes = useStyles();
  let [anchorEl, setAnchorEl] = React.useState(null);

  const user = useSelector((state) => state.user);

  const matches = useMediaQuery("(min-width:1400px)");
  const mdMatches = useMediaQuery("(min-width: 992px)");

  const handleClick = (ev) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const items = [
    "my profile",
    "maker profile",
    "my collections",
    "settings",
    "subscriptions",
    "founder club",
    "api dashboard",
    "log out",
  ];

  return (
    <React.Fragment>
      <Avatar
        style={{ background: "#FF5722", cursor: "pointer", fontSize: "20px" }}
        onClick={handleClick.bind(this)}
      >
        {user && user.displayName.charAt(0)}
      </Avatar>
      {anchorEl ? (
        <div
          className={clsx(classes.arrowUpMd, matches ? classes.arrowUpLg : "")}
        >
          <ArrowDropUpIcon style={{ fontSize: "40px", color: "white" }} />
        </div>
      ) : null}
      <Menu
        {...defaultProps}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        className={clsx(
          mdMatches ? classes.menuPosition : "",
          matches ? classes.meunPositionLarger : ""
        )}
        PopoverClasses={{ paper: classes.menuBlock }}
      >
        <Paper style={{ boxShadow: "none" }}>
          <MenuItem style={{ background: "none" }}>
            <Typography>
              <Link
                to={`/@${user.displayName.split(" ").join("_")}`}
                className={classes.linkStyles}
                component={RouterLink}
                color="textSecondary"
              >
                my profile
              </Link>
            </Typography>
          </MenuItem>
          {items.slice(1, 3).map((value, index) => (
            <MenuItem key={index} style={{ background: "none" }}>
              <Typography>
                <Link
                  to=""
                  className={classes.linkStyles}
                  component={RouterLink}
                  color="textSecondary"
                >
                  {value}
                </Link>
              </Typography>
            </MenuItem>
          ))}
          <Divider />
          {items.slice(3, items.length - 1).map((value, index) => (
            <MenuItem key={index} style={{ background: "none" }}>
              <Typography>
                <Link
                  to="/"
                  className={classes.linkStyles}
                  component={RouterLink}
                  color="textSecondary"
                >
                  {value}
                </Link>
              </Typography>
            </MenuItem>
          ))}
          <Divider />
          {items.slice(items.length - 1, items.length).map((value, index) => (
            <MenuItem key={index} style={{ background: "none" }}>
              <Typography>
                <Link
                  to="/logout"
                  className={classes.linkStyles}
                  component={RouterLink}
                  color="textSecondary"
                >
                  {value}
                </Link>
              </Typography>
            </MenuItem>
          ))}
        </Paper>
      </Menu>
      <Route path="/logout" component={LogOut} />
    </React.Fragment>
  );
}
