import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { TextField, Box } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { Paper } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ClassApi from "../../Api/Api";
import { toast } from "react-toastify";
import { Autocomplete } from "@mui/material";
import { VehicleReceiptPut } from "../../Models/VehicleReceiptPut"

export default function VehicleReceiptDetailPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const vehicleReceiptId = searchParams.get("vehicleReceiptId");
  const [vehicleReceipt, setVehicleReceipt] = useState({});
  const [payments, setPayments] = useState([]);
  const [dateCreated, setDateCreated] = useState("");
  const [description, setDescription] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [vehicleId, setVehicleId] = useState("")
  const listPayment = [];
  const feeShrinkList = [];
  const [fees, setFees] = useState([]);
  let isValid = true;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ClassApi.GetVehicleReceipt(vehicleReceiptId)
      .then((res) => {
        setVehicleReceipt(res.data);
        setDateCreated(res.data.dateCreated);
        setTotalCost(res.data.amount);
        setDescription(res.data.description);
        setVehicleId(res.data.vehicleId);

        if (listPayment.length === 0) {
          res.data.listPayment.map((payment) => {
            listPayment.push({
              label: payment.feeName,
              cost: payment.amount,
              vehicleFeeId: payment.feeId,
            });
          });
          setPayments(listPayment);
        }

        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        toast.error(error.response.data);
        console.log(error);
        setLoading(false); // Set loading to false even if there's an error
      });

    ClassApi.GetAllVehicleFees()
      .then((res) => {
        setFees(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  // If loading, you can render a loading indicator or return null
  if (loading) {
    // return <div>Loading...</div>;
    return null;
  }

  // If no data is available, return null
  if (!vehicleReceipt || !fees || fees.length === 0) {
    //return <div>No data available</div>;
    return null;
  }


  fees.map((fee, index) => {
    feeShrinkList.push({
      label: fee.name,
      cost: fee.cost,
      vehicleFeeId: fee.vehicleFeeId,
    });
  });

  const handleAddPayment = () => {
    setPayments([...payments, { label: "", cost: "", vehicleFeeId: "" }]);
  };

  const handleDeletePayment = (event, id) => {
    event.preventDefault();
    const updatePayments = payments.filter((_, index) => index !== id);
    if (payments[id].cost !== "")
      setTotalCost(totalCost - parseInt(payments[id].cost));

    setPayments(updatePayments);
  };

  const handleChangeFee = (index) => (event, value) => {
    let newPayments = [...payments];
    if (value !== null) {
      newPayments[index] = {
        label: value.label,
        cost: value.cost === null ? "" : String(value.cost),
        vehicleFeeId: value.vehicleFeeId,
      };
      if (payments[index].cost !== "")
        setTotalCost(totalCost - parseInt(payments[index].cost) + value.cost);
      else setTotalCost(totalCost + value.cost);
    } else {
      newPayments[index] = { label: "", cost: "", vehicleFeeId: "" };
      setTotalCost(totalCost - parseInt(payments[index].cost));
    }
    setPayments(newPayments);
  };

  const handleChangeCost = (index) => (event, value) => {
    let newPayments = [...payments];
    let newCost = event.target.value === "" ? 0 : parseInt(event.target.value);

    if (newCost !== 0) {
      newPayments[index].cost = String(newCost);
    } else {
      newPayments[index].cost = "";
    }
    setPayments(newPayments);
    let newTotalCost = 0;
    if (payments.length > 0) {
      payments.map((payment, index) => {
        if (payment.cost !== "") newTotalCost += parseInt(payment.cost);
      });
      setTotalCost(newTotalCost);
    } else setTotalCost(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (totalCost === 0) {
      toast.error("Vui lòng thêm khoản thu!");
      return;
    }
    console.log(payments);
    payments.map((payment1, index1) => {
      payments.map((payment2, index2) => {
        if (
          payment1.vehicleFeeId === payment2.vehicleFeeId &&
          index1 !== index2
        ) {
          console.log(payment1.vehicleFeeId);
          console.log(payment2.vehicleFeeId);

          isValid = false;
        }
      });
    });
    if (!isValid) {
      toast.error("Tồn tại khoản thu lại lặp trong phiếu thu!");
      isValid = true;
      return;
    }

    let vehiclePayments = [];
    payments.map((payment) => {
      vehiclePayments.push({
        vehicleFeeId: payment.vehicleFeeId,
        amount: parseInt(payment.cost),
        vehicleReceiptId: vehicleReceiptId,
      });
    });

    const newVehicleReceipt = new VehicleReceiptPut(
      vehicleId,
      dateCreated,
      totalCost,
      description,
      vehiclePayments,
      vehicleReceiptId
    );
    console.log(newVehicleReceipt);
    ClassApi.PutVehicleReceipt(newVehicleReceipt, vehicleReceiptId)
      .then((res) => {
        toast.success("Sửa phiếu thu thành công!");
        console.log(newVehicleReceipt);
      })
      .catch((error) => {
        toast.error(error.response.data);
        console.log(error);
      });
  };

  const tableHeadName = [
    { name: "Số thứ tự" },
    { name: "Tên khoản thu" },
    { name: "Số tiền (đồng)" },
    { name: "" },
  ];

  return (
    <Grid container spacing={2} padding={"50px"}>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <h1 style={{ fontSize: "40px" }}>Chi tiết Phiếu thu Phương tiện</h1>
        </Grid>

        <Grid item container direction="row" alignItems="center" sx={{ mt: 2 }}>
          <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
            Biển kiểm soát
          </Typography>
          <TextField
            style={{ width: "500px" }}
            value={vehicleReceipt.licensePlate}
            inputProps={{ style: { fontSize: "18px" } }}
          ></TextField>
        </Grid>
        <Grid item container direction="row" alignItems="center" sx={{ mt: 2 }}>
          <Typography style={{ fontSize: "24px", marginRight: "88px" }}>
            Ngày thu
          </Typography>
          <TextField
            style={{ width: "500px" }}
            value={new Date(dateCreated).toLocaleDateString("en-GB")}
            inputProps={{ style: { fontSize: "18px" } }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography style={{ fontSize: "30px", marginRight: "25px" }}>
            Danh sách khoản thu
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
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
                        <Autocomplete
                          disablePortal
                          autoHighlight
                          options={feeShrinkList}
                          onChange={handleChangeFee(index)}
                          value={payment.label}
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
                            <TextField {...params} label="" required={true} />
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          inputProps={{
                            style: { fontSize: "18px" },
                            required: true,
                          }}
                          value={payment.cost}
                          onChange={handleChangeCost(index)}
                        ></TextField>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={(event) => handleDeletePayment(event, index)}
                          style={{ fontSize: "18px", color: "red" }}
                          type="button"
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
                    <TextField
                      inputProps={{
                        style: { fontSize: "18px" },
                        readOnly: true,
                      }}
                      value={totalCost.toLocaleString("en-US", {
                        style: "decimal",
                      })}
                    ></TextField>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography>
            <button
              onClick={() => handleAddPayment()}
              style={{ fontSize: "18px", color: "red" }}
              type="button"
            >
              Thêm
            </button>
          </Typography>
        </Grid>
        <Grid item container direction="row" alignItems="center" sx={{ mt: 2 }}>
          <Typography style={{ fontSize: "24px", marginRight: "42px" }}>
            Ghi chú
          </Typography>
          <TextField
            style={{ width: "500px" }}
            inputProps={{ style: { fontSize: "18px" } }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextField>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
            type="submit"
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Sửa phiếu thu
            </Typography>
          </Button>
          <NavLink to="/" onClick={() => window.history.back()}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#FA7070", marginLeft: "30px" }}
            >
              <Typography variant="h4" style={{ color: "black" }}>
                Quay lại
              </Typography>
            </Button>
          </NavLink>
        </Grid>
      </form>
    </Grid>
  );
}
