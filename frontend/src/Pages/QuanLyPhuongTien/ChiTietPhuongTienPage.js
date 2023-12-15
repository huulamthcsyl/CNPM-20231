import React from 'react'
import { Grid, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { NavLink } from 'react-router-dom';
function ChiTietPhuongTien({ PhuongTien }) {
  PhuongTien = {
    bienkiemsoat: "30A-88888",
    loaixe: "Ô tô",
    chusohuu: "Nguyễn Văn A"
  }
  return (
    <Grid container spacing={2} padding={"50px"}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "40px" }}>
          Chi tiết phương tiện
        </h1>
      </Grid>

      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
          Biển kiểm soát
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={PhuongTien.bienkiemsoat}
        ></TextField>
      </Grid>

      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "110px" }}>
          Loại xe
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={PhuongTien.loaixe}
        ></TextField>
      </Grid>

      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "65px" }}>
          Chủ sở hữu
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={PhuongTien.chusohuu}
        ></TextField>
      </Grid>

      <Grid item>
        <NavLink to="/quanlyphuongtien">
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

      <Grid item>
        <NavLink to="/quanlyphuongtien">
          <Button
            variant="contained"
            style={{ backgroundColor: "red", margin: "30px 30px" }}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Xóa phương tiện
            </Typography>
          </Button>
        </NavLink>
      </Grid>
    </Grid >
  )
}

export default ChiTietPhuongTien;