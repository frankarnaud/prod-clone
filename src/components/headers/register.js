import React from "react";
import { connect } from "react-redux";

import { Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { updateDialog } from "../../store/actions";

const useStyles = makeStyles({
  btn: {
    background: "#d44b11",
    color: "white",
    fontSize: "12px",
    paddingTop: "5px",
    "&:hover": {
      color: "black",
      background: "#db5335",
    },
  },
  textSize: {
    fontSize: "12px",
    borderColor: "#dddddd",
  },
});

function Register({ user, updateDialog }) {
  const classes = useStyles();

  const openSignDialog = () => {
    updateDialog(true);
  };

  const openLogDialog = () => {
    updateDialog(true);
  };

  return (
    <Box display="flex" pt={2} className={classes.textSize}>
      <Box mr={1}>
        <Button
          variant="outlined"
          size="small"
          onClick={openLogDialog}
          className={classes.textSize}
        >
          LOG IN
        </Button>
      </Box>
      <Box>
        <Button
          variant="contained"
          fullWidth
          disableElevation
          className={classes.btn}
          size="small"
          onClick={openSignDialog}
        >
          SIGN UP
        </Button>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateDialog })(Register);
