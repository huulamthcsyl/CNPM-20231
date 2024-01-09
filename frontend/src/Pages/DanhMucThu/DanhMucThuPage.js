import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { Paper } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import PlusCircle from "../../Icons/PlusCircle.png";
import ClassApi from "../../Api/Api";
import { toast } from "react-toastify";

export default function DanhMucThu() {
  const pathname = window.location.pathname;
  const nextPagePathName =
    pathname.substr(0, pathname.indexOf("/")) +
    "/residenceFee/detail/?residenceFeeId=";
  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Tên khoản thu" },
    { name: "Số phiếu thu đã nộp" },
    { name: "Số tiền đã thu" },
    { name: "Ghi chú" },
  ];
  const [payments, setPayments] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleSearchName = () => {
    setPage(0);
    ClassApi.GetResidenceFeeByName(name)
      .then((res) => {
        setPayments(res.data);
      })
      .catch((err) => {
        toast.error(err.name);
      });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  let receiptNumber = 0;
  let totalMoney = 0;
  useEffect(() => {
    ClassApi.GetAllResidenceFee()
      .then((res) => {
        setPayments(res.data);
      })
      .catch((err) => {
        toast.error(err.name);
      });
  }, []);
  // console.log(payments);
  payments.map((payment, index) => {
    receiptNumber += payment.paidQuantity;
    totalMoney += payment.total;
  });

  return (
    <Grid container spacing={2} style={{ padding: "50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "48px" }}> Danh mục thu </h1>
      </Grid>
      <Grid item xs={6} style={{}}>
        <NavLink to="/residenceFee/add">
          <Button variant="contained" style={{ backgroundColor: "#79C9FF" }}>
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
      <Grid item container direction={"row"} xs={12} alignItems={"center"}>
        <TextField
          label={"Tên khoản thu"}
          variant="filled"
          style={{ marginRight: "35px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
          onChange={(event) => setName(event.target.value)}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
          onClick={handleSearchName}
        >
          <Typography variant="h4" style={{ color: "black" }}>
            Tìm kiếm khoản thu
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
              {payments &&
                (rowsPerPage > 0
                  ? payments.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : payments
                ).map((payment, index) => (
                  <TableRow>
                    <TableCell style={{ fontSize: "18px" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {payment.name}
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {payment.paidQuantity}
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {payment.total.toLocaleString("en-US", {
                        style: "decimal",
                      })} đồng
                    </TableCell>
                    <TableCell>
                      <Link to={`${nextPagePathName}${payment.residenceFeeId}`}>
                        <Typography style={{ fontSize: "18px" }}>
                          Chi tiết
                        </Typography>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell
                  colSpan={2}
                  style={{
                    fontSize: "18px",
                    backgroundColor: "#FBCCCC",
                    fontWeight: "bolder",
                  }}
                >
                  Tổng
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "18px",
                    backgroundColor: "#FBCCCC",
                    fontWeight: "bolder",
                  }}
                >
                  {receiptNumber}
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "18px",
                    backgroundColor: "#FBCCCC",
                    fontWeight: "bolder",
                  }}
                >
                  {totalMoney.toLocaleString("en-US", {
                    style: "decimal",
                  })}{" "}
                  đồng
                </TableCell>
                <TableCell
                  style={{ fontSize: "18px", backgroundColor: "#FBCCCC" }}
                ></TableCell>
              </TableRow>
              <tr>
                <TablePagination
                  rowsPerPageOptions={[5, 8, 10, { label: "Tất cả", value: -1 }]}
                  colSpan={6}
                  count={payments.length}
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
    </Grid>
  );
}
