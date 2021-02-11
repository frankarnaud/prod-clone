import React from "react";
import { connect } from "react-redux";

import Register from "./register";
import OptionMenu from "./OptionMenu";

function ToggleMenu({ user }) {
  if (!user) {
    return <Register />;
  } else {
    return <OptionMenu />;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ToggleMenu);
