import React from 'react'
import { Grid, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { NavLink } from 'react-router-dom';
import { useState, toast } from 'react';
import ClassApi from "../../Api/Api"

function TaoKhoanThuPTPage() {

  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const handleAdd = () => {
    ClassApi.PostVehicleFee({
      "name": name,
      "cost": parseInt(cost),
    }).then(
      (response) => {
        toast.success('Thành công')
      }
    ).catch(() => {
      toast.error('Lỗi')
    })
  }

  return (
    <Grid container spacing={2} padding={"50px"}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "40px" }}>Tạo khoản thu phương tiện mới</h1>
      </Grid>

      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
          Tên khoản thu
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        ></TextField>
      </Grid>

      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "95px" }}>
          Giá tiền
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={cost}
          onChange={(e) => { setCost(e.target.value) }}
        ></TextField>
      </Grid>

      <Grid item>
        <NavLink to="/thuphiphuongtien">
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
  );
}

export default TaoKhoanThuPTPage;
