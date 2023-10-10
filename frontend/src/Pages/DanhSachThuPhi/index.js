import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { Paper, Link } from "@mui/material";
import { useLocation } from "react-router-dom"
import PlusCircle from "../../Icons/PlusCircle.png";

export default function DanhSachThu() {
  const pathArr = useLocation().pathname.split("/");
  const path = pathArr.slice(0, -1).join("/");
  const fields = [
    { label: "Tên" },
    { label: "Địa chỉ" },
    { label: "Từ ngày" },
    { label: "Đến ngày" },
  ];
  const tableHead = [
    { name: "Số thứ tự" },
    { name: "Họ và tên" },
    { name: "Địa chỉ" },
    { name: "Tổng số tiền" },
    { name: "Thời gian" },
    { name: "Ghi chú" },
  ];
  return (
    <container>
      <Grid container spacing={2} style={{ padding: "50px" }}>
        <Grid item xs={12}>
          <h1 style={{ fontSize: "48px" }}> Danh sách thu phí </h1>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" component={Link} href={`${path}/taophieuthu`}>
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
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormGroup row>
              {fields.map((field, index) => (
                <TextField
                  key={index}
                  label={field.label}
                  variant="outlined"
                  style={{ marginRight: "35px" }}
                  inputProps={{ style: { fontSize: "16px" } }}
                  InputLabelProps={{ style: { fontSize: "20px" } }}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained">
            <Typography variant="h4" style={{ color: "black" }}>
              Tìm kiếm
            </Typography>
          </Button>
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
                    Nguyễn Văn A
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>P10.04.10</TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    500.000 đồng
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>03/10/2023</TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <Link href="">Chi tiết</Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </container>
  );
}
