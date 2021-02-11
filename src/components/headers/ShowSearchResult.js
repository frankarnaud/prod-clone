import React from "react";
import { useHistory } from "react-router-dom";
import { updateProjectInfo } from "../../store/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Typography,
  ListSubheader,
} from "@material-ui/core";
import { updateSearchDialog } from "../../store/actions";

const ShowSearchResult = ({
  results,
  updateProjectInfo,
  updateSearchDialog,
}) => {
  const history = useHistory();

  const handleClick = (result) => {
    if (result) {
      updateProjectInfo({ id: result.id, topic: result.topic });
      updateSearchDialog(false);
      history.push(`/posts/${result.name}`);
    }
  };

  return (
    <React.Fragment>
      <List dense>
        {results.length !== 0 ? (
          <ListSubheader>
            <Typography
              variant="subtitle2"
              style={{ textTransform: "uppercase", fontSize: "12px" }}
            >
              products
            </Typography>
          </ListSubheader>
        ) : null}
        {results.map((result, index) => (
          <ListItem button key={index} onClick={handleClick.bind(this, result)}>
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={result.imagesTabs[0]}
                alt="Logo"
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </ListItemAvatar>
            <Box display="flex" alignItems="flex-start" mb={2}>
              <ListItemText
                primary={`${result.name}`}
                secondary={`${result.summary || result.description}`}
              />
            </Box>
          </ListItem>
        ))}
        <ListItem onClick={handleClick.bind(this, null)}>
          <ListItemText secondary="Press enter to see all results" />
        </ListItem>
      </List>
    </React.Fragment>
  );
};

ShowSearchResult.propTypes = {
  results: PropTypes.array,
  updateProjectInfo: PropTypes.func.isRequired,
  updateSearchDialog: PropTypes.func.isRequired,
};

export default connect(null, { updateProjectInfo, updateSearchDialog })(
  ShowSearchResult
);
