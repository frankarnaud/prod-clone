import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProjectInfo } from "../../../store/actions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  item: {
    cursor: "pointer",
  },
  avatar: {
    width: 60,
    height: 60,
    border: "1px solid #eeeeee",
    marginRight: "15px",
  },
});

const RelatedProduct = ({ relatedProducts, updateProjectInfo }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (product) => {
    updateProjectInfo({ id: product.id, topic: product.topic });
    history.push(`/posts/${product.name}`);
  };

  return (
    <React.Fragment>
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ textTransform: "uppercase", fontSize: "12px" }}
      >
        related products
      </Typography>
      <List component="nav" dense>
        {relatedProducts.map((product, index) => (
          <ListItem
            key={index}
            className={classes.item}
            onClick={handleClick.bind(this, product)}
          >
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={product.mainImageUrl}
                className={classes.avatar}
              />
            </ListItemAvatar>
            <Box display="flex" alignItems="flex-start" pb={1}>
              <ListItemText
                primary={
                  <Typography style={{ fontWeight: "bold" }}>
                    {product.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    color="textSecondary"
                    style={{ fontSize: "13px" }}
                  >
                    {product.summary}
                  </Typography>
                }
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

RelatedProduct.propTypes = {
  relatedProducts: PropTypes.array.isRequired,
};

export default connect(null, { updateProjectInfo })(RelatedProduct);
