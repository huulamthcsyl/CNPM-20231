import React from "react";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function ChiTietPhieuThu() {
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Tên khoản thu" },
    { name: "Số tiền" },
  ];
  const information = [
    { name: "Họ và tên", marginRight: "25px" },
    { name: "Địa chỉ", marginRight: "52px" },
    { name: "Thời gian", marginRight: "25px" },
  ];
  return (
    <Grid container spacing={2} padding={"50px"}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "40px" }}>Chi tiết phiếu thu</h1>
      </Grid>
      {information.map((Information, index) => (
        <Grid item container direction="row" alignItems="center">
          <Typography
            style={{ fontSize: "24px", marginRight: Information.marginRight }}
          >
            {Information.name}
          </Typography>
          <TextField
            style={{ width: "500px" }}
            //value={}
            inputProps={{ style: { fontSize: "18px" }, readOnly: "true" }}
          ></TextField>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h3">Danh sách khoản thu</Typography>
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
              <TableRow>
                <TableCell style={{ fontSize: "18px" }}>1</TableCell>
                <TableCell style={{ fontSize: "18px" }}>Phí vệ sinh</TableCell>
                <TableCell style={{ fontSize: "18px" }}>100.000 đồng</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
        <Typography style={{ fontSize: "24px" }}>
          Tổng số tiền: 100.000 đồng
        </Typography>
      </Grid>
      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "48px" }}>
          Ghi chú
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" }, readOnly: true }}
        ></TextField>
      </Grid>
      <Grid item>
        <NavLink to="/" onClick={() => window.history.back()}>
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
    </Grid>
  );
}
