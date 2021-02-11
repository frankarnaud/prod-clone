import React from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Link,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { firestore } from "../../../firebase/firebase.utils";
import { connect } from "react-redux";
import { setUrl } from "../../../store/actions";

const useStyles = makeStyles({
  btn: {
    background: "#d44b11",
    boxShadow: "none",
    fontSize: "12px",
    color: "white",
    "&:hover": {
      background: "#d44b11",
    },
  },
  paper: {
    boxShadow: "none",
    width: "470px",
    padding: "1%",
    zIndex: 1,
  },
  typoSize: {
    fontSize: "14px",
  },
  typoStyle: {
    textTransform: "capitalize",
    fontSize: "12px",
    fontWeight: "bold",
  },
  spanStyle: {
    color: "#d44b11",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  existsTypo: {
    fontSize: "13px",
  },
});

const AddLink = ({ setUrl }) => {
  const classes = useStyles();
  const [linkValue, setLinkValue] = React.useState("");
  const history = useHistory();
  const [exists, setExists] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);

  const handleChange = (ev) => {
    setLinkValue(ev.target.value);
  };

  const handleFocus = () => {
    if (linkValue.trim().length === 0) {
      setLinkValue("https://");
    }
  };

  const handleBlur = () => {
    if (linkValue.trim() === "https://") {
      setLinkValue("");
    }
  };

  const handleClick = () => {
    const prodRef = firestore.collection("projects");
    if (linkValue.length !== 0) {
      if (linkValue.startsWith("https://")) {
        prodRef
          .where("urls", "array-contains", [linkValue])
          .get()
          .then((results) => {
            if (results.docs.length === 0) {
              setUrl(linkValue);
              history.push("/posts/new/submission");
            } else {
              setInvalid(false);
              setExists(true);
            }
          });
      }
    } else {
      setInvalid(true);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      pt={4}
    >
      <Typography
        style={{ fontWeight: "bold", marginBottom: "30px", fontSize: "25px" }}
        variant="h5"
      >
        Submit a product
      </Typography>
      <Paper className={classes.paper}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography className={classes.typoStyle}>Link</Typography>
          {invalid ? (
            <Typography
              style={{
                fontSize: "10px",
                color: "#d44b11",
                textTransform: "uppercase",
              }}
            >
              invalid
            </Typography>
          ) : null}
        </Box>
        <Box mb={2}>
          <TextField
            variant="outlined"
            placeholder="Url of the product (eg. https://snapchat.com)"
            value={linkValue}
            fullWidth
            inputProps={{ style: { height: "0.2px", fontSize: "13px" } }}
            onChange={handleChange.bind(this)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Box>

        {!exists ? (
          <React.Fragment>
            <Box display="flex" justifyContent="center" mt={2} mb={4}>
              <Button
                disableElevation
                onClick={handleClick}
                className={classes.btn}
                variant="contained"
              >
                next
              </Button>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              mt={1}
            >
              <Typography variant="h6" className={classes.typoSize}>
                Not ready to launch today?
              </Typography>
              <Typography className={classes.typoSize}>
                You can schedule your launch.{" "}
                <Link style={{ color: "orange" }} to="#">
                  Learn more
                </Link>{" "}
              </Typography>
            </Box>
          </React.Fragment>
        ) : (
          <Box>
            <Box>
              <Typography variant="h6" className={classes.typoSize}>
                Oho! <span className={classes.spanStyle}>Product</span> was
                hunted recently.
              </Typography>
            </Box>
            <Box>
              <Typography className={classes.existsTypo}>
                If it went through big changes,{" "}
                <span className={classes.spanStyle}>let us know</span> and we
                will help you hunt it.
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>

      {exists ? (
        <Paper className={classes.paper} style={{ marginTop: "1%" }}>
          <Typography variant="h6" className={classes.typoStyle}>
            Maker of Product?
          </Typography>
          <Box>
            <Typography color="textSecondary" className={classes.existsTypo}>
              You recently launched and want to post your product again? Promote
              Product and get a fixed spot in the current day's homepage and
              daily newsletter
            </Typography>
          </Box>
          <Box mt={1}>
            <Button
              className={classes.btn}
              disableElevation
              variant="contained"
            >
              learn more
            </Button>
          </Box>
        </Paper>
      ) : null}
    </Box>
  );
};

export default connect(null, { setUrl })(AddLink);
