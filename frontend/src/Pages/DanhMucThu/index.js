import React from "react";
import { Grid, Button, Typography, colors } from "@mui/material";
import { TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableFooter,
} from "@mui/material";
import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import PlusCircle from "../../Icons/PlusCircle.png";
import { styled } from "@mui/system"

export default function DanhMucThu() {
  const CustomizedTableCell = styled(TableCell) `
    & .MuiTableCell-root	 { 
      backgroundColor: "#FBCCCC";
    }
  `;
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Tên khoản thu" },
    { name: "Số người đã đóng" },
    { name: "Tổng số tiền" },
    { name: "Ghi chú" },
  ];

  return (
    <Grid container spacing={2} style={{ padding: "50px" }}>
      <Grid item xs={12}>
        <div style={{ fontSize: "48px" }}> Danh mục thu </div>
      </Grid>
      <Grid item xs={6} style={{}}>
        <NavLink to="/taokhoanthu">
          <Button variant="contained" style={{ backgroundColor: "#79C9FF" }}>
            <Typography style={{ marginRight: "8px" }}>
              <img
                src={PlusCircle}
                style={{ width: "26px", height: "26px" }}
                alt=""
              />
            </Typography>
            <Typography variant="h4" style={{ color: "black" }}>
              Tạo khoản thu
            </Typography>
          </Button>
        </NavLink>
      </Grid>
      <Grid item container direction={"row"} xs={12} alignItems={"center"}>
        <TextField
          label={"Tên khoản thu"}
          variant="filled"
          style={{ marginRight: "35px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
        >
          <Typography variant="h4" style={{ color: "black" }}>
            Tìm kiếm khoản thu
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
              <TableRow>
                <TableCell style={{ fontSize: "18px" }}>1</TableCell>
                <TableCell style={{ fontSize: "18px" }}>Phí quản lí</TableCell>
                <TableCell style={{ fontSize: "18px" }}>10</TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  3.000.000 đồng
                </TableCell>
                <TableCell>
                  <NavLink to="/ChiTietKhoanThu">
                    <Typography style={{ fontSize: "18px" }}>
                      Chi Tiết
                    </Typography>
                  </NavLink>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell style={{ fontSize: "18px", backgroundColor: "#FBCCCC", fontWeight: "bolder" }}>Tổng số</TableCell>
                <TableCell style={{ fontSize: "18px", backgroundColor: "#FBCCCC", }}></TableCell>
                <TableCell style={{ fontSize: "18px", backgroundColor: "#FBCCCC", fontWeight: "bolder" }}>10</TableCell>
                <TableCell style={{ fontSize: "18px", backgroundColor: "#FBCCCC", fontWeight: "bolder" }}>3.000.000 đồng</TableCell>
                <TableCell style={{ fontSize: "18px", backgroundColor: "#FBCCCC" }}></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
