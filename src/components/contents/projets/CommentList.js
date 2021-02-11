import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

const CommentList = ({ comments, projectId }) => {
  if (comments !== []) {
    return (
      <React.Fragment>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} projectId={projectId} />
        ))}
      </React.Fragment>
    );
  }
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default CommentList;
