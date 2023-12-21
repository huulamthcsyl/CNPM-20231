import React from "react";
import { Grid, Button, Typography, collapseClasses } from "@mui/material";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { TablePagination } from "@mui/material";
import { Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import PlusCircle from "../../Icons/PlusCircle.png";
import ClassApi from "../../Api/Api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { format } from 'date-fns';

function ChiTietThuPhiPhuongtienPage() {
  const fields = [{ label: "Biển kiểm soát" }]
  const columnNames = ["Số thứ tự", "Biển kiểm soát", "Chủ sở hữu", "Số tiền đã đóng (đồng)", "Ngày thu", "Ghi chú"];
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Biển kiểm soát" },
    { name: "Chủ sở hữu" },
    { name: "Số tiền đã đóng" },
    { name: "Ghi chú" },
  ];

  const [vehicleReceipts, setVehicleReceipts] = useState([]);
  const [lisensePlate, setLisensePlate] = useState('');
  const [starttime, setStarttime] = useState();
  const [endtime, setEndtime] = useState();


  const handleSearch = (lisensePlate, starttime, endtime) => {
    console.log(starttime, endtime);

    var startTime, endTime;

    if (starttime === undefined || !starttime.isValid()) startTime = "";
    else {
      startTime = new Date(starttime);
      startTime.setDate(startTime.getDate() + 1);
      startTime = JSON.stringify(startTime);
      startTime = startTime.slice(1, startTime.length - 1);
    }
    if (endtime === undefined || !endtime.isValid()) endTime = "";
    else {
      endTime = new Date(endtime);
      endTime.setDate(endTime.getDate() + 1);
      endTime = JSON.stringify(endTime);
      endTime = endTime.slice(1, endTime.length - 1);
    }

    console.log(startTime, endTime);
    ClassApi.FindVehicleReceipt(lisensePlate, startTime, endTime)
      .then((res) => {
        setVehicleReceipts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error("lỗi");
        console.log(err);
      });
  };




  const CustomizedDatePicker = styled(DatePicker)`
    & .MuiInputBase-input {
      font-size: 18px;
      width: 150px;
    }
    .MuiInputLabel-root {
      font-size: 20px;
    }
  `;
  useEffect(() => {
    ClassApi.GetAllVehicleReceipt()
      .then((res) => {
        setVehicleReceipts(res.data);
      })
      .catch((error) => {
        toast.error("lỗi");
        console.log(error);
      });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} padding={"50px"}>

        <Grid item xs={12}>
          <h1 style={{ fontSize: "40px" }}>
            Chi tiết Phí gửi xe tháng 10
          </h1>
        </Grid>

        <Grid item xs={6}>
          <Typography style={{ fontSize: "24px", marginRight: "50px" }}>
            Số phương tiện đã đóng: 10
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography style={{ fontSize: "24px", marginRight: "50px" }}>
            Tổng số tiền: 3.000.000 đồng
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <h2 style={{ fontSize: "24px" }}>
            Danh sách thu
          </h2>
        </Grid>

        <Grid item xs={12}>
          <Typography style={{ fontSize: "24px", marginRight: "50px" }}>
            Tìm kiếm
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <FormGroup row>
              {/* {fields.map((field, index) => (
                <TextField
                  key={index}
                  label={field.label}
                  variant="filled"
                  style={{ marginRight: "35px" }}
                  inputProps={{ style: { fontSize: "18px" } }}
                  InputLabelProps={{ style: { fontSize: "20px" } }}
                />
              ))} */}
              <TextField
                label="Biển kiểm soát"
                variant="filled"
                style={{ marginRight: "35px" }}
                inputProps={{ style: { fontSize: "18px" } }}
                InputLabelProps={{ style: { fontSize: "20px" } }}
                onChange={(e) => setLisensePlate(e.target.value)}
              />

              <CustomizedDatePicker
                label="Từ ngày"
                slotProps={{ textField: { variant: "filled" } }}
                sx={{ marginRight: "35px" }}
                value={starttime}
                onChange={(date) => {
                  setStarttime(date);
                }}
                format="DD-MM-YYYY"
              />
              <CustomizedDatePicker
                label="Đến ngày"
                slotProps={{ textField: { variant: "filled" } }}
                value={endtime}
                onChange={(date) => setEndtime(date)}
                format="DD-MM-YYYY"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
            onClick={() => handleSearch(lisensePlate, starttime, endtime)}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Tìm kiếm
            </Typography>
          </Button>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              {/* <TableHead>
                <TableRow>
                  {tableHeadName.map((column, index) => (
                    <TableCell key={index}>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        {column.name}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead> */}

              <TableHead>
                <TableRow>
                  {columnNames.map((name, index) => (
                    <TableCell key={index}>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        {name}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicleReceipts.map((column, index) => (
                  <TableRow>
                    <TableCell style={{ fontSize: "18px" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {column.lisensePlate}
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {column.name}
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {column.amount}
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {column.dateCreated}
                    </TableCell>
                    <TableCell>
                      <NavLink to="/chitietphieuthuphuongtien">
                        <Typography style={{ fontSize: "18px" }}>Chi Tiết</Typography>
                      </NavLink>
                    </TableCell>

                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </Grid>



      </Grid>
    </LocalizationProvider>

  );
}

export default ChiTietThuPhiPhuongtienPage;
