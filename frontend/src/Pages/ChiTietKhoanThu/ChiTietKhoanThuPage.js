import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, TableFooter } from "@mui/material";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { Paper, TablePagination } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import ClassApi from "../../Api/Api";
import { toast } from "react-toastify";

const CustomizedDatePicker = styled(DatePicker)`
    & .MuiInputBase-input {
      font-size: 18px;
      width: 150px;
    }
    .MuiInputLabel-root {
      font-size: 20px;
    }
  `;

export default function ChiTietKhoanThu() {
  const searchParams = new URLSearchParams(window.location.search);
  const residenceFeeId = searchParams.get("residenceFeeId");
  const pathname = window.location.pathname;
  const nextPagePathname =
    pathname.substr(0, pathname.indexOf("/")) +
    "/ChiTietPhieuThu/?residenceReceiptId=";
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [starttime, setStarttime] = useState(null);
  const [endtime, setEndtime] = useState(null);
  const [fee, setFee] = useState({});
  const [residenceReceipts, setResidenceReceipts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalFeeAmount, setTotalFeeAmount] = useState(0);
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Họ và tên" },
    { name: "Địa chỉ" },
    { name: "Tổng số tiền" },
    { name: "Thời gian" },
    { name: "" },
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  

  useEffect(() => {
    ClassApi.GetResidenceFee(residenceFeeId)
      .then((res) => {
        setFee(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err);
      });
    ClassApi.FindResidenceReceiptByFeeId("", "", "", "", residenceFeeId)
      .then((res) => {
        setResidenceReceipts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err);
      });
  }, [residenceFeeId]);

  useEffect(() => {
    setTotalFeeAmount(0);
    residenceReceipts.forEach(data => setTotalFeeAmount(totalFeeAmount => totalFeeAmount + data.amount));
  }, [residenceReceipts]);

  const handleSearch = (name, address, starttime, endtime, residenceFeeId) => {
    setPage(0);
    var startTime, endTime;

    if (starttime === null || !starttime.isValid()) startTime = "";
    else {
      startTime = new Date(starttime);
      startTime.setDate(startTime.getDate() + 1);
      startTime = JSON.stringify(startTime);
      startTime = startTime.slice(1, startTime.length - 1);
    }
    if (endtime === null || !endtime.isValid()) endTime = "";
    else {
      endTime = new Date(endtime);
      endTime.setDate(endTime.getDate() + 1);
      endTime = JSON.stringify(endTime);
      endTime = endTime.slice(1, endTime.length - 1);
    }
    ClassApi.FindResidenceReceiptByFeeId(
      name,
      address,
      startTime,
      endTime,
      residenceFeeId
    )
      .then((res) => {
        setResidenceReceipts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err);
      });
  };
  return (
    residenceReceipts.length > 0 &&
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} style={{ padding: "50px" }}>
        <Grid item xs={12}>
          <div style={{ fontSize: "48px" }}> Chi tiết {fee.name} </div>
        </Grid>
        <Grid item xs={12}>
          <span style={{ fontSize: "22px" }}><b>Số người đã đóng: </b></span>
          <span style={{ fontSize: "22px" }}>
            {fee.paidQuantity}
          </span>
        </Grid>
        <Grid item xs={12}>
          <div style={{ fontSize: "22px" }}>
            <span style={{ fontSize: "22px" }}><b>Tổng số tiền: </b></span>
            {fee.total &&
              fee.total.toLocaleString("en-US", { style: "decimal" })}{" "}
            đồng
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ fontSize: "22px" }}>
            <span style={{ fontSize: "22px" }}><b>Bắt buộc: </b></span>
            {fee.isObligatory === true ? "Có" : "Không"}
          </div>
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
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF" }}
            onClick={() =>
              handleSearch(name, address, starttime, endtime, residenceFeeId)
            }
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Tìm kiếm phiếu thu
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <div style={{ fontSize: "26px" }}>Danh sách đã thu</div>
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
                {residenceReceipts &&
                  (rowsPerPage > 0
                    ? residenceReceipts.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : residenceReceipts
                  ).map((residenceReceipt, index) => (
                    <TableRow>
                      <TableCell style={{ fontSize: "18px" }}>
                        {index + 1}
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
                        })}{" "}
                        đồng
                      </TableCell>
                      <TableCell style={{ fontSize: "18px" }}>
                        {new Date(
                          residenceReceipt.dateCreated
                        ).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell style={{ fontSize: "18px" }}>
                        <Link
                          to={`${nextPagePathname}${residenceReceipt.residenceReceiptsId}`}
                          style={{ textDecoration: "underline" }}
                        >
                          Chi tiết
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableCell colSpan={3} style={{fontSize: 18}}>Tổng</TableCell>
                <TableCell colSpan={3} style={{fontSize: 18}}>{totalFeeAmount.toLocaleString("en-US", {style: "decimal",})} đồng</TableCell>
                <tr>
                  <TablePagination
                    rowsPerPageOptions={[5, 8, 10, { label: "Tất cả", value: -1 }]}
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
                    labelDisplayedRows={(page) => { return `${page.from} - ${page.to} trên ${page.count}` }}
                    labelRowsPerPage={"Dòng mỗi trang:"}
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
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item>
          <NavLink to="/residenceFee">
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
    </LocalizationProvider>
  );
}
