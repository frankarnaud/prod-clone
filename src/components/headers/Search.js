import React from "react";
import { InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { updateSearchDialog } from "../../store/actions";

import useStyles from "./HeaderStyle";

function Search({ updateSearchDialog }) {
  const classes = useStyles();

  const handleFocus = (ev) => {
    updateSearchDialog(true);
    ev.target.blur();
  };
  return (
    <Box className={classes.search}>
      <Box className={classes.searchIcon}>
        <SearchIcon />
      </Box>
      <InputBase
        placeholder="Discover your next favorite things..."
        onFocus={handleFocus}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        style={{ width: "45ch" }}
        inputProps={{ "aria-label": "search" }}
      />
    </Box>
  );
}

export default connect(null, { updateSearchDialog })(Search);
