import React from 'react'
import { Grid, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { Paper } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ClassApi from "../../Api/Api";
import { toast } from "react-toastify";

export default function ChiTietPhieuThuPhuongTienPage() {

    const searchParams = new URLSearchParams(window.location.search);
    const vehicleReceiptId = searchParams.get("vehicleReceiptId");
    const [vehicleReceipt, setVehicleReceipt] = useState({});
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        ClassApi.GetVehicleReceipt(vehicleReceiptId)
            .then((res) => {
                setVehicleReceipt(res.data);
                setPayments(res.data.listPayment);
            })
            .catch((error) => {
                toast.error(error.response.data);
                console.log(error);
            });
    }, []);
    const tableHeadName = [
        { name: "Số thứ tự" },
        { name: "Tên khoản thu" },
        { name: "Số tiền (đồng)" },

    ];

    return (

        <Grid container spacing={2} padding={"50px"}>
            <Grid item xs={12}>
                <h1 style={{ fontSize: "40px" }}>
                    Chi tiết Phiếu thu Phương tiện
                </h1>
            </Grid>

            <Grid item container direction="row" alignItems="center">
                <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
                    Biển kiểm soát
                </Typography>
                <TextField
                    style={{ width: "500px" }}
                    value={vehicleReceipt.licensePlate}
                    inputProps={{ style: { fontSize: "18px" } }}
                ></TextField>
            </Grid>
            <Grid item container direction="row" alignItems="center">
                <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
                    Ngày thu
                </Typography>
                <TextField
                    style={{ width: "500px", marginLeft: "65px" }}
                    value={new Date(vehicleReceipt.dateCreated).toLocaleDateString("en-GB")}
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
                            {payments &&
                                payments.map((payment, index) => (
                                    <TableRow>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {payment.feeName}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {payment.amount &&
                                                payment.amount.toLocaleString("en-US", {
                                                    style: "decimal",
                                                })}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <Typography style={{ fontSize: "24px" }}>
                    Tổng số tiền:{" "}
                    {vehicleReceipt.amount &&
                        vehicleReceipt.amount.toLocaleString("en-US", { style: "decimal" })}{" "} đồng
                </Typography>
            </Grid>
            <Grid item xs={12} container direction="row" alignItems="center">
                <Typography style={{ fontSize: "24px", marginRight: "42px" }}>
                    Ghi chú
                </Typography>
                <TextField
                    style={{ width: "500px" }}
                    inputProps={{ style: { fontSize: "18px" }, readOnly: true }}
                    value={vehicleReceipt.description}
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