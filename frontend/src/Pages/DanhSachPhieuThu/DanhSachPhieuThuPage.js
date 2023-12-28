import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { TablePagination } from "@mui/material";
import { Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import PlusCircle from "../../Icons/PlusCircle.png";
import ClassApi from "../../Api/Api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";

export default function DanhSachPhieuThu() {
  const pathname = window.location.pathname;
  const nextPagePathname =
    pathname.substr(0, pathname.indexOf("/")) +
    "/ChiTietPhieuThu/?residenceReceiptId=";
  const [residenceReceipts, setResidenceReceipts] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [starttime, setStarttime] = useState();
  const [endtime, setEndtime] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Họ và tên" },
    { name: "Địa chỉ" },
    { name: "Tổng số tiền" },
    { name: "Thời gian" },
    { name: "Ghi chú" },
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (name, address, starttime, endtime) => {
    setPage(0);
    var startTime, endTime;

    if (starttime === undefined || !starttime.isValid()) startTime = "";
    else {
      startTime = new Date(starttime);
      startTime.setDate(startTime.getDate() + 1);
      startTime = startTime.toISOString();
    }
    if (endtime === undefined || !endtime.isValid()) endTime = "";
    else {
      endTime = new Date(endtime);
      endTime.setDate(endTime.getDate() + 1);
      endTime = endTime.toISOString();
    }

    console.log(startTime, endTime);
    ClassApi.FindResidenceReceipt(name, address, startTime, endTime)
      .then((res) => {
        setResidenceReceipts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err);
      });
  };

  const CustomizedDatePicker = styled(DatePicker)`
    & .MuiInputBase-input {
      font-size: 18px;
      width: 150px;
    }
    .MuiInputLabel-root {
      font-size: 20px;
    }
  `;
  useEffect(() => {
    ClassApi.GetAllResidenceReceipt()
      .then((res) => {
        setResidenceReceipts(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
        console.log(error);
      });
  }, []);

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
              <TextField
                label="Họ và tên"
                variant="filled"
                style={{ marginRight: "35px" }}
                inputProps={{ style: { fontSize: "18px" } }}
                InputLabelProps={{ style: { fontSize: "20px" } }}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Địa chỉ"
                variant="filled"
                style={{ marginRight: "35px" }}
                inputProps={{ style: { fontSize: "18px" } }}
                InputLabelProps={{ style: { fontSize: "20px" } }}
                onChange={(e) => setAddress(e.target.value)}
              />
              <CustomizedDatePicker
                label="Từ ngày"
                slotProps={{ textField: { variant: "filled" } }}
                sx={{ marginRight: "35px" }}
                value={starttime}
                onChange={(date) => {
                  setStarttime(date);
                }}
                format="DD-MM-YYYY"
              />
              <CustomizedDatePicker
                label="Đến ngày"
                slotProps={{ textField: { variant: "filled" } }}
                value={endtime}
                onChange={(date) => setEndtime(date)}
                format="DD-MM-YYYY"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
            onClick={() => handleSearch(name, address, starttime, endtime)}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Tìm kiếm phiếu thu
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <thead>
                <TableRow>
                  {tableHeadName.map((column, index) => (
                    <TableCell key={index}>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        {column.name}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </thead>
              <tbody>
                {residenceReceipts &&
                  (rowsPerPage > 0
                    ? residenceReceipts.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : residenceReceipts
                  ).map(
                    (residenceReceipt, index) =>
                      residenceReceipt &&
                      residenceReceipt.residenceReceiptId !== null && (
                        <TableRow>
                          <TableCell style={{ fontSize: "18px" }}>
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            {residenceReceipt.personName}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            {residenceReceipt.address}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            {residenceReceipt.amount.toLocaleString("en-US", {
                              style: "decimal",
                              minimumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            {new Date(
                              residenceReceipt.dateCreated
                            ).toLocaleDateString("en-GB")}
                          </TableCell>
                          <TableCell style={{ fontSize: "18px" }}>
                            <a
                              href={`${nextPagePathname}${residenceReceipt.residenceReceiptsId}`}
                              style={{ textDecoration: "underline" }}
                            >
                              Chi tiết
                            </a>
                          </TableCell>
                        </TableRow>
                      )
                  )}
              </tbody>
              <tfoot>
                <tr>
                  <TablePagination
                    rowsPerPageOptions={[5, 8, 10, { label: "All", value: -1 }]}
                    colSpan={6}
                    count={residenceReceipts.length}
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
    </LocalizationProvider>
  );
}
