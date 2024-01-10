import React from "react";
import {
  Grid,
  Button,
  Typography,
  collapseClasses,
  TableFooter,
} from "@mui/material";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { TablePagination } from "@mui/material";
import { Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import PlusCircle from "../../Icons/PlusCircle.png";
import ClassApi from "../../Api/Api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";

const CustomizedDatePicker = styled(DatePicker)`
  & .MuiInputBase-input {
    font-size: 18px;
    width: 150px;
  }
  .MuiInputLabel-root {
    font-size: 20px;
  }
`;

function VehicleFeeDetailPage() {
  const navigate = useNavigate();
  const vehicleFeeId = useParams().id;
  const pathname = window.location.pathname;
  const nextPagePathname =
    pathname.substr(0, pathname.indexOf("/")) +
    "/vehicleReceipt/detail/?vehicleReceiptId=";

  const [fee, setFee] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [vehicleReceipts, setVehicleReceipts] = useState([]);
  const [lisensePlate, setLisensePlate] = useState("");
  const [name, setName] = useState("");
  const [starttime, setStarttime] = useState(null);
  const [endtime, setEndtime] = useState(null);
  const [totalFeeAmount, setTotalFeeAmount] = useState(0);

  const fields = [{ label: "Biển kiểm soát" }];
  const columnNames = [
    "Số thứ tự",
    "Biển kiểm soát",
    "Chủ sở hữu",
    "Tổng số tiền",
    "Ngày thu",
    "Ghi chú",
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    ClassApi.GetVehicleFee(vehicleFeeId)
      .then((res) => {
        setFee(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err);
      });
    ClassApi.FindVehicleReceiptByFeeId("", "", "", "", vehicleFeeId)
      .then((res) => {
        setVehicleReceipts(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err);
      });
  }, [vehicleFeeId]);

  useEffect(() => {
    setTotalFeeAmount(0);
    vehicleReceipts.forEach((data) =>
      setTotalFeeAmount((totalFeeAmount) => totalFeeAmount + data.amount)
    );
  }, [vehicleReceipts]);

  const handleSearch = () => {
    console.log(starttime, endtime);
    setPage(0);
    var startTime, endTime;

    if (starttime === null || !starttime.isValid()) startTime = "";
    else {
      startTime = new Date(starttime);
      startTime.setDate(startTime.getDate() + 1);
      startTime = startTime.toISOString();
    }
    if (endtime === null || !endtime.isValid()) endTime = "";
    else {
      endTime = new Date(endtime);
      endTime.setDate(endTime.getDate() + 1);
      endTime = endTime.toISOString();
    }

    // console.log(startTime, endTime);
    console.log(lisensePlate);
    ClassApi.FindVehicleReceiptByFeeId(
      lisensePlate,
      name,
      startTime,
      endTime,
      vehicleFeeId
    )
      .then((res) => {
        setVehicleReceipts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err);
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} padding={"50px"}>
        <Grid item xs={12}>
          <h1 style={{ fontSize: "40px" }}>Chi tiết {fee.name}</h1>
        </Grid>
        <Grid item xs={12}>
          <span style={{ fontSize: "24px" }}>
            <b>Số phương tiện đã đóng: </b>
          </span>
          <span style={{ fontSize: "24px", marginRight: "50px" }}>
            {fee.paidQuantity}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span style={{ fontSize: "24px" }}>
            <b>Tổng số tiền: </b>
          </span>
          <span style={{ fontSize: "24px", marginRight: "50px" }}>
            {fee.total &&
              fee.total.toLocaleString("en-US", { style: "decimal" })}{" "}
            đồng
          </span>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormGroup row>
              <TextField
                label="Biển kiểm soát"
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

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF" }}
            onClick={() => handleSearch()}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Tìm kiếm phiếu thu
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }}>
          <h2 style={{ fontSize: "24px" }}>Danh sách phiếu thu</h2>
        </Grid>
        <Grid item xs={12}>
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
                {vehicleReceipts &&
                  (rowsPerPage > 0
                    ? vehicleReceipts.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    : vehicleReceipts
                  ).map((vehicleReceipt, index) => (
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
                        })}{" "}
                        đồng
                      </TableCell>
                      <TableCell style={{ fontSize: "18px" }}>
                        {new Date(
                          vehicleReceipt.dateCreated
                        ).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            navigate(
                              `/vehicleReceipt/detail/${vehicleReceipt.vehicleReceiptId}`
                            )
                          }
                          style={{
                            fontSize: "18px",
                            color: "#0000EE",
                            textTransform: "none",
                          }}
                        >
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableCell colSpan={3} style={{ fontSize: 18 }}>
                  Tổng
                </TableCell>
                <TableCell colSpan={3} style={{ fontSize: 18 }}>
                  {totalFeeAmount.toLocaleString("en-US", {
                    style: "decimal",
                  })}{" "}
                  đồng
                </TableCell>
                <tr>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      8,
                      10,
                      { label: "Tất cả", value: -1 },
                    ]}
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
                    labelDisplayedRows={(page) => {
                      return `${page.from} - ${page.to} trên ${page.count}`;
                    }}
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
          <NavLink to="/vehicleFee">
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

export default VehicleFeeDetailPage;
