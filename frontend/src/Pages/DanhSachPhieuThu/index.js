import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { Paper, Link } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import PlusCircle from "../../Icons/PlusCircle.png";

export default function DanhSachThu() {
  const fields = [{ label: "Tên" }, { label: "Địa chỉ" }];
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Họ và tên" },
    { name: "Địa chỉ" },
    { name: "Tổng số tiền" },
    { name: "Thời gian" },
    { name: "Ghi chú" },
  ];

  const CustomizedDatePicker = styled(DatePicker)`
    & .MuiInputBase-input {
      font-size: 18px;
      width: 150px;
    }
    .MuiInputLabel-root {
      font-size: 20px;
    }
  `;
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
              {fields.map((field, index) => (
                <TextField
                  key={index}
                  label={field.label}
                  variant="filled"
                  style={{ marginRight: "35px" }}
                  inputProps={{ style: { fontSize: "18px" } }}
                  InputLabelProps={{ style: { fontSize: "20px" } }}
                />
              ))}

              <CustomizedDatePicker
                label="Từ ngày"
                slotProps={{ textField: { variant: "filled" } }}
                sx={{marginRight: "35px"}}
              />
              <CustomizedDatePicker
                label="Đến ngày"
                slotProps={{ textField: { variant: "filled" } }}
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
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
                  <TableCell>
                    <NavLink to="/ChiTietPhieuThu">
                      <Typography style={{fontSize: "18px"}}>Chi Tiết</Typography>
                    </NavLink>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
