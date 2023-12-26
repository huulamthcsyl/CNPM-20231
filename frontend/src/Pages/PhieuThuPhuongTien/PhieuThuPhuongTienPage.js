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
import ThuPhi from "../../Icons/ThuPhi.png";

function PhieuThuPhuongTienPage() {
    const pathname = window.location.pathname;
    const nextPagePathname =
        pathname.substr(0, pathname.indexOf("/")) +
        "/chitietphieuthuphuongtien/?vehicleReceiptId=";

    const [vehicleReceipts, setVehicleReceipts] = useState([]);
    const [lisensePlate, setLisensePlate] = useState("");
    const [name, setName] = useState("");
    const [starttime, setStarttime] = useState();
    const [endtime, setEndtime] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const tableHeadName = [
        { name: "STT" },
        { name: "Biển Kiểm Soát" },
        { name: "Chủ sở hữu" },
        { name: "Tổng số tiền (đồng)" },
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

    const handleSearch = () => {
        setPage(0);
        var startTime, endTime;

        if (starttime === undefined || !starttime.isValid()) startTime = "";
        else {
            startTime = new Date(starttime);
            startTime.setDate(startTime.getDate() + 1);
            startTime = JSON.stringify(startTime);
            startTime = startTime.slice(1, startTime.length - 1);
        }
        if (endtime === undefined || !endtime.isValid()) endTime = "";
        else {
            endTime = new Date(endtime);
            endTime.setDate(endTime.getDate() + 1);
            endTime = JSON.stringify(endTime);
            endTime = endTime.slice(1, endTime.length - 1);
        }

        console.log(startTime, endTime);
        console.log(lisensePlate);
        console.log(name);

        ClassApi.FindVehicleReceipt(lisensePlate, name, startTime, endTime)
            .then((res) => {
                setVehicleReceipts(res.data);
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
        ClassApi.GetAllVehicleReceipt()
            .then((res) => {
                setVehicleReceipts(res.data);
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
                    <h1 style={{ fontSize: "48px" }}> Danh sách phiếu thu Phương tiện </h1>
                </Grid>
                <Grid item xs={12}>
                    <NavLink to="/taophieuthuphuongtien">
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
                                Tạo phiếu thu
                            </Typography>
                        </Button>
                    </NavLink>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                    <FormControl>
                        <FormGroup row>
                            <TextField
                                label="Biển Kiểm Soát"
                                variant="filled"
                                style={{ marginRight: "35px" }}
                                inputProps={{ style: { fontSize: "18px" } }}
                                InputLabelProps={{ style: { fontSize: "20px" } }}
                                onChange={(e) => setLisensePlate(e.target.value)}
                            />
                            <TextField
                                label="Chủ sở hữu"
                                variant="filled"
                                style={{ marginRight: "35px" }}
                                inputProps={{ style: { fontSize: "18px" } }}
                                InputLabelProps={{ style: { fontSize: "20px" } }}
                                onChange={(e) => setName(e.target.value)}
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
                        onClick={() => handleSearch()}
                    >
                        <Typography variant="h4" style={{ color: "black" }}>
                            Tìm kiếm Phiếu thu
                        </Typography>
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }}>
                            <thead>
                                <TableRow>
                                    {tableHeadName.map((column, index) => (
                                        // <TableCell key={index}>
                                        <TableCell key={index} style={index === 0 ? { width: "10%" } : undefined}>
                                            <Typography variant="h4" style={{ fontWeight: "bold" }}>
                                                {column.name}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </thead>
                            <tbody>
                                {vehicleReceipts &&
                                    (rowsPerPage > 0
                                        ? vehicleReceipts.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        : vehicleReceipts
                                    ).map(
                                        (vehicleReceipt, index) =>
                                            vehicleReceipt &&
                                            vehicleReceipt.vehicleReceiptId !== null && (
                                                <TableRow>
                                                    <TableCell style={{ fontSize: "18px" }}>
                                                        {page * rowsPerPage + index + 1}
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: "18px" }}>
                                                        {vehicleReceipt.licensePlate}
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: "18px" }}>
                                                        {vehicleReceipt.personName}
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: "18px" }}>
                                                        {vehicleReceipt.amount.toLocaleString("en-US", {
                                                            style: "decimal",
                                                            minimumFractionDigits: 0,
                                                        })}
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: "18px" }}>
                                                        {new Date(
                                                            vehicleReceipt.dateCreated
                                                        ).toLocaleDateString("en-GB")}
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: "18px" }}>
                                                        <a
                                                            href={`${nextPagePathname}${vehicleReceipt.vehicleReceiptId}`}
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
                                        count={vehicleReceipts.length}
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
        </LocalizationProvider >



    )
}
export default PhieuThuPhuongTienPage;