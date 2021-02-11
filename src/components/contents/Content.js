import React from "react";
import { Container, Grid, Box } from "@material-ui/core";

import RightContent from "./projets/RightContent";
import LeftContent from "./projets/LeftContent";
import useStyles from "../headers/HeaderStyle";

export default function Content() {
  const classes = useStyles();

  return (
    <Container
      className={classes.container}
      maxWidth="lg"
      style={{ background: "inherit" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <LeftContent />
        </Grid>
        <Grid item md={4}>
          <Box display={{ xs: "none", md: "block" }}>
            <RightContent />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
