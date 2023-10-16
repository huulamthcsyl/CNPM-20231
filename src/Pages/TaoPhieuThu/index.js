import React from "react";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import createNameTextField from "./createNameTextField";

export default function TaoPhieuThu() {
  const CustomizedDatePicker = styled(DatePicker)`
    & .MuiInputBase-input {
      font-size: 18px;
      width: 445px;
    }
    .MuiInputLabel-root {
      font-size: 20px;
    }
  `;
  const tableHead = [
    { name: "Số thứ tự" },
    { name: "Tên khoản thu" },
    { name: "Số tiền" },
    { name: "" },
  ];
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} padding={"50px"}>
        <Grid item xs={12}>
          <h1 style={{ fontSize: "40px" }}>Tạo phiếu thu</h1>
        </Grid>
        <Grid item container direction="row" alignItems="center">
          <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
            Họ và tên
          </Typography>
          <TextField
            style={{ width: "500px" }}
            inputProps={{ style: { fontSize: "18px" } }}
          ></TextField>
        </Grid>
        <Grid item container direction="row" alignItems="center">
          <Typography style={{ fontSize: "24px", marginRight: "54px" }}>
            Địa chỉ
          </Typography>
          <TextField
            style={{ width: "500px" }}
            inputProps={{ style: { fontSize: "18px" } }}
          ></TextField>
        </Grid>
        <Grid item container direction="row" alignItems="center">
          <Typography style={{ fontSize: "24px", marginRight: "28px" }}>
            Thời gian
          </Typography>
          <CustomizedDatePicker></CustomizedDatePicker>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Danh sách khoản thu</Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {tableHead.map((column, index) => (
                    <TableCell key={index}>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        {column.name}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ fontSize: "18px" }}>1</TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    Phí vệ sinh
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    100.000 đồng
                  </TableCell>
                  <TableCell style={{ fontSize: "18px", color: "red" }}>
                    Xóa
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ color: "red" }}>
            Thêm
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ fontSize: "24px" }}>Tổng số tiền: 100.000 đồng</Typography>
        </Grid>
        <Grid item container direction="row" alignItems="center">
          <Typography style={{ fontSize: "24px", marginRight: "48px" }}>
            Ghi chú
          </Typography>
          <TextField
            style={{ width: "500px" }}
            inputProps={{ style: { fontSize: "18px" } }}
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Xác nhận
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
