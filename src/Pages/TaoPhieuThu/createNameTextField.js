import React from "react";
import { Grid, Typography, TextField } from "@mui/material";
export default function createNameTextField(props) {
  return (
    <Grid item container direction="row" alignItems="center">
      <Typography style={{ fontSize: "24px", marginRight: props.marginRight }}>
        {props.name}
      </Typography>
      <TextField
        style={{ width: "500px" }}
        inputProps={{ style: { fontSize: "18px" } }}
      />
    </Grid>
  );
}
