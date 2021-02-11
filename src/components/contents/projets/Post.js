import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import AddLink from "./AddLink";
import Submission from "./Submission";

const Post = (props) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <AddLink />
      </Route>
      <Route path={`${path}/submission`}>
        <Submission />
      </Route>
    </Switch>
  );
};

export default Post;
