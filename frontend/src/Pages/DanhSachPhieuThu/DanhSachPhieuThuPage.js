import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { TablePagination } from "@mui/material";
import { Paper, createTheme, ThemeProvider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import PlusCircle from "../../Icons/PlusCircle.png";
import ClassApi from "../../Api/Api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";


export default function DanhSachPhieuThu() {
  const [residenceReceipts, setResidenceReceipts] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [starttime, setStarttime] = useState();
  const [endtime, setEndtime] = useState();
  const [page, setPage] = useState(0);
  const [rowsperpage, setRowsperpage] = useState(5);

  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Họ và tên" },
    { name: "Địa chỉ" },
    { name: "Tổng số tiền" },
    { name: "Thời gian" },
    { name: "Ghi chú" },
  ];
  const handleChangeRowsPerPage = (event) => {
    setRowsperpage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (name, address, starttime, endtime) => {
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
    ClassApi.FindResidenceReceipt(name, address, startTime, endTime)
      .then((res) => {
        setResidenceReceipts(res.data);
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
    ClassApi.GetAllResidenceReceipt()
      .then((res) => {
        setResidenceReceipts(res.data);
      })
      .catch((error) => {
        toast.error("lỗi");
        console.log(error);
      });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} style={{ padding: "50px" }}>
        <Grid item xs={12}>
          <div style={{ fontSize: "48px" }}> Danh sách phiếu thu </div>
        </Grid>
        <Grid item xs={6}>
          <NavLink to="/taophieuthu">
            <Button
              variant="contained"
              style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
            >
              <Typography style={{ marginRight: "8px" }}>
                <img
                  src={PlusCircle}
                  style={{ width: "26px", height: "26px" }}
                  alt=""
                />
              </Typography>
              <Typography variant="h4" style={{ color: "black" }}>
                Tạo phiếu thu
              </Typography>
            </Button>
          </NavLink>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormGroup row>
              <TextField
                label="Họ và tên"
                variant="filled"
                style={{ marginRight: "35px" }}
                inputProps={{ style: { fontSize: "18px" } }}
                InputLabelProps={{ style: { fontSize: "20px" } }}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Địa chỉ"
                variant="filled"
                style={{ marginRight: "35px" }}
                inputProps={{ style: { fontSize: "18px" } }}
                InputLabelProps={{ style: { fontSize: "20px" } }}
                onChange={(e) => setAddress(e.target.value)}
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
            onClick={() => handleSearch(name, address, starttime, endtime)}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Tìm kiếm phiếu thu
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {tableHeadName.map((column, index) => (
                    <TableCell key={index}>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        {column.name}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {residenceReceipts &&
                  residenceReceipts.map(
                    (residenceReceipt, index) =>
                      residenceReceipt && (
                        <TableRow>
                          <TableCell style={{ fontSize: "18px" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            {residenceReceipt.name}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            {residenceReceipt.address}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            {residenceReceipt.amount}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            {new Date(
                              residenceReceipt.dateCreated
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            <NavLink to="/ChiTietPhieuThu">
                              <Typography style={{ fontSize: "18px" }}>
                                Chi tiết
                              </Typography>
                            </NavLink>
                          </TableCell>
                        </TableRow>
                      )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
         
            <TablePagination
              rowsPerPageOptions={[5, 8]}
              component="div"
              count={residenceReceipts.length}
              rowsPerPage={rowsperpage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
