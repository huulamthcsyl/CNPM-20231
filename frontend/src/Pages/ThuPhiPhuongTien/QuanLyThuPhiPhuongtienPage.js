import React from 'react'
import { Grid, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
function QuanLyThuPhiPhuongtienPage() {
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Tên khoản thu" },
    { name: "Số tiền" },
    { name: "Ghi chú" },
  ];
  
  return (

    <Grid container spacing={2} padding={"50px"}>
        <Grid item xs={12}>
          <h1 style={{ fontSize: "40px" }}>
            Thu phí phương tiện
          </h1>
        </Grid>

        <Grid item container direction="row" alignItems="center">
          <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
            Biển kiểm soát
          </Typography>
          <TextField
            style={{ width: "500px" }}
            inputProps={{ style: { fontSize: "18px" } }}
          ></TextField>
    
        </Grid>

        <Grid item xs={12}>
          <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
            Danh sách khoản thu
          </Typography>
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
                    Phí trông giữ xe tháng 10
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    400.000 đồng
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <Link>
                      Xóa
                    </Link>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ fontSize: "18px" }}>
                    2
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    Phí lau rửa xe
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    100.000 đồng
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <Link>
                      Xóa
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
              
          
            </Table>
          </TableContainer>
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


  );
}

export default QuanLyThuPhiPhuongtienPage;
