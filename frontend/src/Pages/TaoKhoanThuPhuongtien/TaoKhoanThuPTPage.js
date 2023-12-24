import React, { useState } from 'react';
import { Grid, Button, Typography, TextField } from "@mui/material";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClassApi from "../../Api/Api";

function TaoKhoanThuPTPage() {
  const [name, setName] = useState('');
  const [printError, setPrintError] = useState(null);
  const handleAdd = () => {
    if (!name) {
      setPrintError("Vui lòng nhập Tên khoản thu!");
      return;
    }
    ClassApi.PostVehicleFee({
      "name": name,
      "cost": 0,
    }).then(
      (response) => {
        toast.success('Thêm khoản thu thành công');
      }
    ).catch((err) => {
      toast.error(err.response.data);
    });
  }

  return (
    <Grid container spacing={2} padding={"50px"}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "40px" }}>Tạo khoản thu phương tiện mới</h1>
      </Grid>
      <Grid item>
        {/* <form onSubmit={handleAdd}> */}

        <Grid item container direction="row" alignItems="center">
          <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
            Tên khoản thu
          </Typography>
          <TextField
            style={{ width: "400px" }}
            inputProps={{ style: { fontSize: "18px" }, required: true }}
            FormHelperTextProps={{ style: { fontSize: "18px" } }}
            error={printError != null}
            helperText={printError}
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          ></TextField>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#79C9FF", margin: "30px 0px", fontSize: "20px", fontWeight: "400",
              color: "black",
            }}
            type='submit'
            size="large"
            onClick={handleAdd}
          >
            Xác nhận
          </Button>

          <NavLink to="/thuphiphuongtien">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#FA7070", marginLeft: "30px", fontSize: "20px", fontWeight: "400",
                color: "black",
              }}
              size="large"

            >
              Hủy
            </Button>
          </NavLink>

        </Grid>
        {/* </form> */}
      </Grid>
    </Grid>
  );
}

export default TaoKhoanThuPTPage;
