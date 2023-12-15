import React, { useEffect, useState } from 'react'
import { Grid, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { NavLink, useParams } from 'react-router-dom';
import ClassApi from '../../Api/Api'
function ChiTietPhuongTien() {
  const [PhuongTien, setPhuongTien] = useState({
    "vehicle": {
      "vehicleId": "f6b659b7-610d-44f6-9a67-61c505389108",
      "personId": "ad4beae4-662f-406d-bb56-d1d9275dd440",
      "category": "Ô tô",
      "licensePlate": "12A-45568"
    },
    "name": "Nguyễn Văn C"
  })
  const param = useParams()
  useEffect(() => {
    ClassApi.GetVehicleById(param.id).then((response) => {
      setPhuongTien(response.data)
    })
  }, [])
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
          value={PhuongTien.vehicle.licensePlate}
        ></TextField>
      </Grid>

      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "110px" }}>
          Loại xe
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={PhuongTien.vehicle.category}
        ></TextField>
      </Grid>

      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "65px" }}>
          Chủ sở hữu
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={PhuongTien.name}

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