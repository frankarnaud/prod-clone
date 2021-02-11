import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  typoTitle: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  paper: {
    boxShadow: "none",
    zIndex: 1,
    marginBottom: "3%",
  },
  typoSize: {
    fontSize: "13px",
  },
  item: {
    display: "block",
    paddingRight: "none",
  },
  typoWeight: {
    fontWeight: "bold",
  },
  btnSize: {
    fontSize: "11px",
    color: "grey",
  },
  orange: {
    color: "#d44b11",
  },
  viewall: {
    "&:hover": {
      background: "#dddddd",
      border: "1px solid #dddddd",
    },
  },
  colorLink: {
    color: "black",
  },
  discussion: {
    "&:hover": {
      background: "none",
    },
  },
  actionBtn: {
    fontWeight: "bold",
  },
  img: {
    width: "10px",
    height: "10px",
  },
  spanHover: {
    "&:hover": {
      color: "#d44b11",
    },
  },
  btnHover: {
    "&:hover": {
      background: "none",
    },
  },
});

export default useStyles;
