import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function TaoKhoanThu() {
  const [value, setValue] = useState("Có");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Grid container spacing={2} padding={"50px"}>
      <Grid item>
        <div style={{ fontSize: "40px" }}>Tạo khoản thu dân cư mới</div>
      </Grid>
      <Grid container direction={"row"} alignItems={"center"} item xs={12}>
        <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
          Tên khoản thu
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
        ></TextField>
      </Grid>
      <Grid container direction={"row"} alignItems={"center"} item xs={12}>
        <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
          Số tiền (đồng)
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
        ></TextField>
      </Grid>
      <Grid container direction={"row"} item xs={12}>
        <Typography style={{ fontSize: "24px", marginRight: "68px" }}>
          Bắt buộc?
        </Typography>
        <RadioGroup
          name="radio-buttons-group"
          value={value}
          onChange={handleChange}
          style={{ display: "inline" }}
        >
          <FormControlLabel
            value="Có"
            control={<Radio />}
            label=<Typography variant="h4" fontWeight={400}>
              Có
            </Typography>
          />
          <FormControlLabel
            value="Không"
            control={<Radio />}
            label=<Typography variant="h4" fontWeight={400}>
              Không
            </Typography>
          />
        </RadioGroup>
      </Grid>
      <Grid item>
        <NavLink to="/danhmucthu">
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Xác nhận
            </Typography>
          </Button>
        </NavLink>
      </Grid>
    </Grid>
  );
}
