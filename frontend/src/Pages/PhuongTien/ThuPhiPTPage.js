import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { FormControl, TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer, TableFooter } from "@mui/material";
import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import PlusCircle from "../../Icons/PlusCircle.png";
import ThuPhi from "../../Icons/ThuPhi.png";
function ThuPhiPTPage() {
  //  const fields = [{ label: "Tên phí thu" }];
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Tên khoản thu" },
    { name: "Số phương tiện đã đóng" },
    { name: "Tổng số tiền" },
    { name: "Ghi chú" },
  ];
  return (
    <Grid container spacing={2} style={{ padding: "50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "48px" }}> Quản lý Thu phí phương tiện </h1>
      </Grid>

      <Grid item xs={6}>
        <NavLink to="/taokhoanthuphuongtien">
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
              Tạo khoản thu
            </Typography>
          </Button>
        </NavLink>
      </Grid>

      <Grid item xs={6}>
        <NavLink to="/quanlythuphiphuongtien">
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
          >
            <Typography style={{ marginRight: "8px" }}>
              <img
                src={ThuPhi}
                style={{ width: "26px", height: "26px" }}
                alt=""
              />
            </Typography>
            <Typography variant="h4" style={{ color: "black" }}>
              Thu phí phương tiện
            </Typography>
          </Button>
        </NavLink>
      </Grid>

      <Grid item xs={12}>
        <FormControl>
          {/* <FormGroup row>
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
            </FormGroup> */}
          <Grid item container direction="row" alignItems="center">
            <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
              Tên phí thu
            </Typography>
            <TextField
              style={{ width: "500px" }}
              inputProps={{ style: { fontSize: "18px" } }}
            ></TextField>
          </Grid>

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
                  Phí gửi xe tháng 10
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  10
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  3.000.000 đồng
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>

                  <NavLink to="/chitietthuphiphuongtien">
                    Chi tiết
                  </NavLink>

                </TableCell>
              </TableRow>
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell style={{ fontSize: "18px", backgroundColor: "#FBCCCC", fontWeight: "bolder" }}>
                  Tổng số
                </TableCell>
                <TableCell style={{ fontSize: "18px", backgroundColor: "#FBCCCC", }}>

                </TableCell>
                <TableCell style={{ fontSize: "18px", backgroundColor: "#FBCCCC", fontWeight: "bolder" }}>
                  10
                </TableCell>
                <TableCell style={{ fontSize: "18px", backgroundColor: "#FBCCCC", fontWeight: "bolder" }}>
                  3.000.000 đồng
                </TableCell>
                <TableCell style={{ fontSize: "18px", backgroundColor: "#FBCCCC" }}>

                </TableCell>
              </TableRow>
            </TableFooter>

          </Table>
        </TableContainer>
      </Grid>

    </Grid>
  );
}

export default ThuPhiPTPage;
