import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, TextField, Paper, Link } from "@mui/material";
import { Table, TableBody, TableCell, TableRow, TableHead, TableContainer } from "@mui/material";
import { NavLink } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from "@mui/system";
import { DatePicker } from '@mui/x-date-pickers';
import { Autocomplete } from "@mui/material";
import ClassApi from "../../Api/Api";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

function QuanLyThuPhiPhuongtienPage() {
  const columnNames = ["Số thứ tự", "Tên khoản thu", "Số tiền (đồng)", "Ghi chú"];

  const [vehicleID, setVehicleID] = useState('');
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [dateCreated, setDateCreated] = useState();
  const [payments, setPayments] = useState([]);
  const [fees, setFees] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const feeShrinkList = [];

  const CustomizedDatePicker = styled(DatePicker)`
    & .MuiInputBase-input {
      font-size: 18px;
      width: 445px;
    }
    .MuiInputLabel-root {
      font-size: 20px;
    }
  `;

  useEffect(() => {
    ClassApi.GetAllVehicles()
      .then((res) => {
        setVehicleList(res.data);
      })
      .catch((err) => {
        toast.error("Lỗi 1");
      });
    ClassApi.GetAllVehicleFees()
      .then((res) => {
        setFees(res.data);
      })
      .catch((err) => {
        toast.error("Lỗi 2");
      });
  }, []);

  fees.map((fee, index) => {
    feeShrinkList.push({
      label: fee.name,
      cost: fee.cost,
      residenceFeeId: fee.residenceFeeId,
    });
  });
  const handleChangeVehicle = (event, value) => {
    setSelectedVehicle(value);
  };

  const handleAddPayment = () => {
    setPayments([...payments, { label: "", cost: null, residenceFeeId: "" }]);
  };
  const handleDeletePayment = (id) => {
    const updatePayments = payments.filter((_, index) => index !== id);
    if (payments[id].name !== "") setTotalCost(totalCost - payments[id].cost);
    setPayments(updatePayments);
  };

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
        <Autocomplete
          disablePortal
          autoHighlight
          options={vehicleList}
          getOptionLabel={(option) => option.licensePlate || ''}
          value={selectedVehicle}
          onChange={handleChangeVehicle}
          sx={{
            "& .MuiAutocomplete-input": {
              fontSize: 20,
            },
            width: 500,
          }}
          renderInput={(params) => (
            <TextField {...params} />
          )}
        />
      </Grid>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item container direction="row" alignItems="center">
          <Typography style={{ fontSize: "24px", marginRight: "28px" }}>
            Ngày thu
          </Typography>
          <CustomizedDatePicker
            sx={{ marginLeft: "60px" }}
            value={dateCreated}
            onChange={(date) => setDateCreated(date)}
            format="DD-MM-YYYY"
          ></CustomizedDatePicker>
        </Grid>
      </LocalizationProvider>

      <Grid item xs={12}>
        <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
          Danh sách khoản thu
        </Typography>
      </Grid>

      {/* <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {columnNames.map((name, index) => (
                  <TableCell key={index}>
                    <Typography variant="h4" style={{ fontWeight: "bold" }}>
                      {name}
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
      </Grid> */}


      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 650,
              "& .MuiTableCell-root": {
                border: "1px solid black",
              },
            }}
          >
            <TableHead>
              <TableRow>
                {columnNames.map((name, index) => (
                  <TableCell key={index}>
                    <Typography variant="h4" style={{ fontWeight: "bold" }}>
                      {name}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment, index) => (
                <TableRow>
                  <TableCell style={{ fontSize: "18px" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <Autocomplete
                      disablePortal
                      autoHighlight
                      options={feeShrinkList}
                      //onChange={handleChangeFee(index)}
                      sx={{
                        "& .MuiAutocomplete-input": {
                          fontSize: 20,
                        },
                        width: 500,
                      }}
                      renderOption={(props, option) => (
                        <Box component="li" {...props}>
                          {option.label}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="" />
                      )}
                    />
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    {payment.cost &&
                      payment.cost.toLocaleString("en-US", {
                        style: "decimal",
                      })}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDeletePayment(index)}
                      style={{ fontSize: "18px", color: "red" }}
                    >
                      Xóa
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell
                  colSpan={2}
                  style={{ color: "red", fontSize: "24px" }}
                >
                  Tổng số tiền
                </TableCell>
                <TableCell colSpan={2} style={{ fontSize: "20px" }}>
                  {totalCost.toLocaleString("en-US", {
                    style: "decimal",
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <button
            onClick={() => handleAddPayment()}
            style={{ fontSize: "18px", color: "red" }}
          >
            Thêm
          </button>
        </Typography>
      </Grid>











      <Grid item>
        <NavLink to="/thuphiphuongtien">
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

export default QuanLyThuPhiPhuongtienPage;
