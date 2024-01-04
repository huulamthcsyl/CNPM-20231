import React, { useState } from 'react';
import { Grid, Button, Typography, TextField } from "@mui/material";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClassApi from "../../Api/Api";
import { useEffect } from 'react';
function TaoKhoanThuPhuongTienPage() {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [printError1, setPrintError1] = useState(null);
  const [printError2, setPrintError2] = useState(null);
  const [vehicleFeeList, setVehicleFeeList] = useState([]);

  useEffect(() => {

    ClassApi.GetAllVehicleFees()
      .then((res) => {
        setVehicleFeeList(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }, [])
  const handleAdd = () => {
    setPrintError1(null);
    setPrintError2(null);
    if (!name) {
      setPrintError1("Vui lòng nhập Tên khoản thu!");
      return;
    } else {
      setPrintError1(null);
    }
    if (!cost) {
      setPrintError2("Vui lòng nhập Số tiền!");
      return;
    } else {
      setPrintError2(null);
    }
    const existingVehicleFee = vehicleFeeList.find((fee) => fee.name === name);
    if (existingVehicleFee) {
      toast.error("Khoản thu Phương tiện đã tồn tại");
      return;
    }
    ClassApi.PostVehicleFee({
      name: name,
      cost: cost,
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
        <h1 style={{ fontSize: "40px" }}>Tạo khoản thu Phương tiện mới</h1>
      </Grid>
      <Grid item>
        {/* <form onSubmit={handleAdd}> */}

        <Grid item container direction="row" alignItems="center">
          <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
            Tên khoản thu
            <span style={{ color: 'red' }}>  (*)  </span>
          </Typography>
          <TextField
            style={{ width: "400px" }}
            inputProps={{ style: { fontSize: "18px" }, required: true }}
            FormHelperTextProps={{ style: { fontSize: "18px" } }}
            error={printError1 != null}
            helperText={printError1}
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          ></TextField>
        </Grid>

        <Grid item container direction="row" alignItems="center" sx={{ mt: 2 }}>
          <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
            Số tiền
            <span style={{ color: 'red' }}>  (*)  </span>
          </Typography>
          <TextField
            style={{ width: "400px", marginLeft: "80px" }}
            inputProps={{ style: { fontSize: "18px" }, required: true }}
            FormHelperTextProps={{ style: { fontSize: "18px" } }}
            error={printError2 != null}
            helperText={printError2}
            value={cost}
            onChange={(e) => { setCost(e.target.value) }}
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

          <NavLink to="/danhsachkhoanthuphuongtien">
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

export default TaoKhoanThuPhuongTienPage;
