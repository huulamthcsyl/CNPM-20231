import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ResidenceFee } from "../../Models/ResidenceFee";
import ClassApi from "../../Api/Api";
import { toast } from "react-toastify";

export default function TaoKhoanThu() {
  const [isObligatory, setIsObligatory] = useState(true);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const handleChangeObligatory = (event) => {
    setIsObligatory(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newResidenceFee = new ResidenceFee(name, Boolean(isObligatory), cost === "" ? null : parseInt(cost));
    console.log(newResidenceFee);
    if (Boolean(isObligatory) === true && cost === "") {
      toast.error("Vui lòng nhập số tiền cho khoản thu bắt buộc!");
      return ;
    }
    ClassApi.PostResidenceFee(newResidenceFee)
      .then((res) => {
        
        toast.success("Tạo khoản thu thành công!");
      })
      .catch((err) => {
        toast.error(err.response.data);  
      });
  };

  return (
    <Grid container spacing={2} padding={"50px"}>
      <Grid item>
        <div style={{ fontSize: "40px" }}>Tạo khoản thu dân cư mới</div>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Grid container direction={"row"} alignItems={"center"} item xs={12}>
            <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
              Tên khoản thu
            </Typography>
            <TextField
              style={{ width: "500px" }}
              inputProps={{ style: { fontSize: "18px" }, required: true }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </Grid>

          <Grid
            container
            direction={"row"}
            alignItems={"center"}
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
              Số tiền (đồng)
            </Typography>
            <TextField
              style={{ width: "500px" }}
              inputProps={{ style: { fontSize: "18px" }}}
              onChange={(e) => setCost(e.target.value)}
            ></TextField>
          </Grid>
          <Grid
            container
            direction={"row"}
            alignItems={"center"}
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <Typography style={{ fontSize: "24px", marginRight: "68px" }}>
              Bắt buộc?
            </Typography>
            <RadioGroup
              name="radio-buttons-group"
             value={isObligatory}
              onChange={() => isObligatory === true ? setIsObligatory(false) : setIsObligatory(true)}
              style={{ display: "inline" }}
            >
              <FormControlLabel
               value={true}
                control={<Radio />}
                label=<Typography variant="h4" fontWeight={400}>
                  Có
                </Typography>
              />
              <FormControlLabel
               value={false}
                control={<Radio />}
                label=<Typography variant="h4" fontWeight={400}>
                  Không
                </Typography>
              />
            </RadioGroup>
          </Grid>

          <Grid item>
           
            <Button
              variant="contained"
              style={{
                backgroundColor: "#79C9FF",
                margin: "30px 0px",
                fontSize: "20px",
                color: "black",
                fontWeight: "400",
              }}
              type="submit"
              size="large"
            >
              Xác nhận
            </Button>
            <NavLink to="/danhmucthu">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#FA7070",
                marginLeft: "30px",
                fontSize: "20px",
                color: "black",
                fontWeight: "400"
              }}
              size="large"
            >
              Hủy
            </Button>
            </NavLink>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
