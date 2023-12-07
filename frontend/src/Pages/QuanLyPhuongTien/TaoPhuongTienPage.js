import React, { useEffect, useState } from 'react'
import { Grid, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import ClassApi from '../../Api/Api'
import axios from 'axios';
import { toast } from "react-toastify";

function TaoPhuongTienPage() {
  let PhuongTien = {}
  const [PersionId, setPersonId] = useState('');
  const [VehicleId, setVehicleId] = useState('');
  const [Category, setCategory] = useState('');

  const handleAdd = () => {
    ClassApi.PostVehicle({
      "personId": PersionId,
      "category": Category,
      "licensePlate": VehicleId,
    }).then(
      (response) => {
        toast.success('thành công')
      }
    ).catch(() => {
      toast.error('lỗi')
    })
  }
  return (
    <Grid container spacing={2} padding={"50px"}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "40px" }}>Thêm phương tiện mới</h1>
      </Grid>
      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
          Biển kiểm soát
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={VehicleId}
          onChange={(e) => { setVehicleId(e.target.value) }}
        ></TextField>
      </Grid>
      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "110px" }}>
          Loại xe
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={Category}
          onChange={(e) => { setCategory(e.target.value) }}
        ></TextField>
      </Grid>
      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "65px" }}>
          Chủ sở hữu
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={PersionId}
          onChange={(e) => { setPersonId(e.target.value) }}
        ></TextField>
      </Grid>

      <Grid item>
        <NavLink to="/quanlyphuongtien">
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
            onClick={handleAdd}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Xác nhận
            </Typography>
          </Button>
        </NavLink>
      </Grid>
    </Grid>
  )
}
export default TaoPhuongTienPage