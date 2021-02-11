import React from "react";
import UpcomingProduct from "./UpcomingProduct";
import HiringNow from "./HiringNow";
import Discussions from "./Discussions";
import { Box } from "@material-ui/core";

export default function RightContent() {
  return (
    <Box pt={3}>
      <UpcomingProduct />
      <HiringNow />
      <Discussions />
    </Box>
  );
}
