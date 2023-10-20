import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { Paper, Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import PlusCircle from "../../Icons/PlusCircle.png";

function QuanLyPTPage() {
  const fields = [{ label: "Biển kiểm soát" }, { label: "Chủ sở hữu" }, { label: "Loại xe" }];
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Biển kiểm soát" },
    { name: "Loại xe" },
    { name: "Chủ sở hữu" },
    { name: "Ghi chú" },
  ];
  return (
      <Grid container spacing={2} style={{ padding: "50px" }}>
        <Grid item xs={12}>
          <h1 style={{ fontSize: "48px" }}> Quản lý phương tiện </h1>
        </Grid>
        <Grid item xs={6}>
          <NavLink to="/TaoPhuongTien">
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
                Thêm phương tiện
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
                    Ô tô
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    Nguyễn Văn A
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <Link href="">
                      Chi tiết
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
  );
}
export default QuanLyPTPage;