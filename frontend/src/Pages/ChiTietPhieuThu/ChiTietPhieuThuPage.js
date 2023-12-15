import React from "react";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ClassApi from "../../Api/Api";
import { toast } from "react-toastify";

export default function ChiTietPhieuThu() {
  const searchParams = new URLSearchParams(window.location.search);
  const residenceReceiptId = searchParams.get("residenceReceiptId");
  const [residenceReceipt, setResidenceReceipt] = useState({});
  const [paymentList, setPaymentList] = useState([])
  let feeNames = [];

  useEffect(() => {
    ClassApi.GetResidenceReceipt(residenceReceiptId)
      .then((res) => {
        setResidenceReceipt(res.data);
        setPaymentList(res.data.residencePayments);        
        
      })
      .catch((error) => {
         toast.error("lỗi 1");
         console.log(error);
      });
      
  }, []);
  paymentList.map((payment) => {
    ClassApi.GetResidenceFee(payment.residenceFeeId)
    .then((res) => {
      feeNames.push(res.data.name);
      console.log(feeNames);
    })
    .catch((error) => {
      toast.error("lỗi 2");
      console.log(error);
    })
  })
  console.log(feeNames);
  const tableHeadName = [
    { id: 1, name: "Số thứ tự" },
    { id: 2, name: "Tên khoản thu" },
    { id: 3, name: "Số tiền (đồng)" },
  ];
  const information = [
    { id: 1, name: "Họ và tên", marginRight: "25px", value: residenceReceipt.name },
    { id: 2, name: "Địa chỉ", marginRight: "52px", value: residenceReceipt.address },
    { id: 3,
      name: "Ngày thu",
      marginRight: "28px",
      value: new Date(residenceReceipt.dateCreated).toLocaleDateString('en-GB'),
    },
  ];
  return (
    <Grid container spacing={2} padding={"50px"}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "40px" }}>Chi tiết phiếu thu</h1>
      </Grid>
      {information.map((Information, index) => (
        <Grid item container direction="row" alignItems="center">
          <Typography
            style={{ fontSize: "24px", marginRight: Information.marginRight }}
          >
            {Information.name}
          </Typography>
          <TextField
            style={{ width: "500px" }}
            value={information[index].value}
            inputProps={{ style: { fontSize: "18px" }, readOnly: "true" }}
          ></TextField>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h3">Danh sách khoản thu</Typography>
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
              {paymentList && paymentList.map((payment, index) => (
                <TableRow>
                  <TableCell style={{ fontSize: "18px" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    {feeNames && feeNames[index]}
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    {payment.amount && payment.amount.toLocaleString("en-US", {
                      style: "decimal",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
        <Typography style={{ fontSize: "24px" }}>
          Tổng số tiền: {residenceReceipt.amount && residenceReceipt.amount.toLocaleString("en-US", {
            style: "decimal",
          })} đồng
        </Typography>
      </Grid>
      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "42px" }}>
          Ghi chú
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" }, readOnly: true }}
          value={residenceReceipt.description}
        ></TextField>
      </Grid>
      <Grid item>
        <NavLink to="/" onClick={() => window.history.back()}>
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

/* eslint-disable react-hooks/rules-of-hooks */
