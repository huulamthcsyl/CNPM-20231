import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { styled } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function ChiTietThuPhiPhuongtienPage() {
  const fields = [{ label: "Biển kiểm soát" }]
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Biển kiểm soát" },
    { name: "Chủ sở hữu" },
    { name: "Số tiền đã đóng" },
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
                sx={{ marginRight: "35px" }}
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
              Tìm kiếm
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
                  <TableCell style={{ fontSize: "18px" }}>
                    1
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    30A-88888
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    Nguyễn Văn A
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    100.000 đồng
                  </TableCell>
                  <TableCell>
                    <NavLink to="/chitietphieuthuphuongtien">
                      <Typography style={{ fontSize: "18px" }}>Chi Tiết</Typography>
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

export default ChiTietThuPhiPhuongtienPage;
