import React, { useEffect, useState } from 'react'
import { Grid, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { NavLink, useParams } from 'react-router-dom';
import ClassApi from '../../Api/Api'
function ChiTietPhuongTien() {
  // const [PhuongTien, setPhuongTien] = useState({
  //   "vehicleId": "aec3d7c5-1e17-4e8f-826c-01eff91ba981",
  //   "category": "Xe máy",
  //   "licensePlate": "88A-12345",
  //   "ownerName": "Phùng Thanh Đăng"
  // })
  const [PhuongTien, setPhuongTien] = useState(null);
  const param = useParams()
  useEffect(() => {
    ClassApi.GetVehicleById(param.id).then((response) => {
      setPhuongTien(response.data)
    })
  }, [])
  if (!PhuongTien) {
    // If PhuongTien is null, return null
    return null;
  }
  return (
    <Grid container spacing={2} padding={"50px"}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "40px" }}>
          Chi tiết phương tiện
        </h1>
      </Grid>

      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "27px" }}>
          Biển kiểm soát
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={PhuongTien.licensePlate}
        ></TextField>
      </Grid>

      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "110px" }}>
          Loại xe
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={PhuongTien.category}
        ></TextField>
      </Grid>

      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "65px" }}>
          Chủ sở hữu
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={PhuongTien.ownerName}

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

      {/* <Grid item>
        <NavLink to="/quanlyphuongtien">
          <Button
            variant="contained"
            style={{ backgroundColor: "#FA7070", margin: "30px 30px" }}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Xóa
            </Typography>
          </Button>
        </NavLink>
      </Grid> */}
    </Grid >
  )
}

export default ChiTietPhuongTien;