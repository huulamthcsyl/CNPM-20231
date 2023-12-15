import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Select, MenuItem } from '@mui/material';
import { useState, useEffect } from "react";
import PlusCircle from "../../Icons/PlusCircle.png";
import ClassApi from "../../Api/Api"


function QuanLyPTPage() {
  //const fields = [{ label: "Biển kiểm soát" }, { label: "Chủ sở hữu" }, { label: "Loại xe" }];
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Biển kiểm soát" },
    { name: "Loại xe" },
    { name: "Chủ sở hữu" },
    { name: "Ghi chú" },
  ];

  const [allVehicle, setAllVehicles] = useState([])
  const [licenseplate, setLicenseplate] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [category, setCategory] = useState('')
  const search = () => {
    ClassApi.FindVehicle(licenseplate, ownerName, category).then((respone) => {
      setAllVehicles(respone.data)
    });
    console.log('clicked')
  }

  useEffect(() => {
    ClassApi.GetAllVehicles().then((response) => {
      setAllVehicles(response.data);




    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [])


  return (
    <Grid container spacing={2} style={{ padding: "50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "48px" }}> Quản lý phương tiện </h1>
      </Grid>

      <Grid item xs={12}>
        <NavLink to="/taophuongtien">
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

      {/* <Grid item xs={12}>
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
        </Grid> */}

      <Grid item xs={3} container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
          Biển kiểm soát
        </Typography>
        <TextField
          style={{ width: "250px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={licenseplate}
          onChange={(e) => { setLicenseplate(e.target.value) }}
        ></TextField>
      </Grid>

      <Grid item xs={3} container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "110px" }}>
          Loại xe
        </Typography>
        <Select
          style={{ width: "250px", fontSize: "18px" }}
          value={category}
          onChange={(e) => { setCategory(e.target.value) }}
        >
          <MenuItem value="" disabled>
            Chọn loại xe
          </MenuItem>
          <MenuItem value="Ô tô">Ô tô</MenuItem>
          <MenuItem value="Xe máy">Xe máy</MenuItem>
        </Select>
      </Grid>

      <Grid item xs={3} container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "65px" }}>
          Chủ sở hữu
        </Typography>
        <TextField
          style={{ width: "250px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={ownerName}
          onChange={(e) => { setOwnerName(e.target.value) }}
        ></TextField>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
          onClick={search}
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

              {allVehicle.map((column, index) => (
                <TableRow key={index}>
                  <TableCell style={{ fontSize: "18px" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    {column.vehicle?column.vehicle.licensePlate:''}
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    {column.vehicle?column.vehicle.category:''}
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    {column.name?column.name:''}
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>

                    <NavLink to="/chitietphuongtien">
                      Chi tiết
                    </NavLink>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

    </Grid>
  );
}
export default QuanLyPTPage;