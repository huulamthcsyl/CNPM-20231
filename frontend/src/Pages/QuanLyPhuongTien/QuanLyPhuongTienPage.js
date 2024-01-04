import React from "react";
import { Grid, Button, Typography, InputLabel } from "@mui/material";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { Table, TableBody, TableCell, TablePagination } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Select, MenuItem } from '@mui/material';
import { useState, useEffect } from "react";
import PlusCircle from "../../Icons/PlusCircle.png";
import ClassApi from "../../Api/Api"
import { all } from "axios";


function QuanLyPhuongTienPage() {

  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Biển kiểm soát" },
    { name: "Loại xe" },
    { name: "Chủ sở hữu" },
    { name: "Ghi chú" },
  ];

  const [allVehicle, setAllVehicles] = useState([])
  const [licensePlate, setLicensePlate] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [category, setCategory] = useState('')

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const search = () => {
    setPage(0);
    ClassApi.FindVehicle(licensePlate, ownerName, category).then((respone) => {
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
        <h1 style={{ fontSize: "48px" }}> Quản lý Phương tiện </h1>
      </Grid>
      <Grid item xs={12}>
        <NavLink to="/taophuongtien">
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", marginBottom: 30 }}
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
        <TextField
          label="Biển kiểm soát"
          variant="filled"
          style={{ marginRight: "35px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
          onChange={(e) => setLicensePlate(e.target.value)}
        />
        <FormControl style={{ marginRight: "35px" }}>
          <InputLabel style={{fontSize: 18}} id="type">Loại xe</InputLabel>
          <Select
            labelId="type"
            label="Loại xe"
            style={{ width: "250px", fontSize: "18px" }}
            value={category}
            onChange={(e) => { setCategory(e.target.value) }}
          >
            <MenuItem value="" disabled>
              Chọn loại xe
            </MenuItem>
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="Ô tô">Ô tô</MenuItem>
            <MenuItem value="Xe máy">Xe máy</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Chủ sở hữu"
          variant="filled"
          style={{ marginRight: "35px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
          onChange={(e) => setOwnerName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
          onClick={search}
        >
          <Typography variant="h4" style={{ color: "black" }}>
            Tìm kiếm phương tiện
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

              {allVehicle &&
                (rowsPerPage > 0
                  ? allVehicle.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : allVehicle
                ).map((column, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontSize: "18px" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {column.licensePlate ? column.licensePlate : ''}
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {column.category ? column.category : ''}
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {column.ownerName ? column.ownerName : ''}
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>

                      <NavLink to={"/chitietphuongtien/" + column.vehicleId}>
                        Chi tiết
                      </NavLink>

                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <tfoot>
              <tr>
                <TablePagination
                  rowsPerPageOptions={[5, 8, 10, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={allVehicle.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      "aria-label": "rows per page",
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    "& .MuiTablePagination-input": {
                      fontSize: "16px",
                    },
                    "& .MuiTablePagination-displayedRows": {
                      fontSize: "16px",
                    },
                    "& .MuiTablePagination-selectLabel": {
                      fontSize: "16px",
                    },
                  }}
                />
              </tr>
            </tfoot>
          </Table>
        </TableContainer>
      </Grid>

    </Grid>
  );
}
export default QuanLyPhuongTienPage;