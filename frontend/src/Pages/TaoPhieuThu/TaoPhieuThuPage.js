import React, { useEffect, useMemo } from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  colors,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { Table, TableBody, TableCell, Box } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ClassApi from "../../Api/Api";
import { toast } from "react-toastify";
import { Autocomplete } from "@mui/material";
import AutoComplete from "../../Layout/component/AutoCompleteSearch";
import { ResidenceReceipt } from "../../Models/ResidenceReceipt";

export default function TaoPhieuThu() {
  const CustomizedDatePicker = styled(DatePicker)`
    & .MuiInputBase-input {
      font-size: 18px;
      width: 445px;
    }
    .MuiInputLabel-root {
      font-size: 20px;
    }
  `;
  const columnNames = ["Số thứ tự", "Tên khoản thu", "Số tiền (đồng)", ""];
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [dateCreated, setDateCreated] = useState();
  const [description, setDescription] = useState("");
  const [personId, setPersonId] = useState("");
  const [payments, setPayments] = useState([]);
  const [fees, setFees] = useState([]);
  const feeShrinkList = [];
  const [totalCost, setTotalCost] = useState(0);
  const [personList, setPersonList] = useState([]);
  const personShrinkList = [];
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    ClassApi.GetAllPeople()
      .then((res) => {
        setPersonList(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
    ClassApi.GetAllResidenceFee()
      .then((res) => {
        setFees(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }, []);
  personList.map((person, index) => {
    personShrinkList.push({
      label: person.name,
      code: person.identityCardNumber,
      personId: person.personId,
      residenceId: person.residenceId,
    });
  });
  fees.map((fee, index) => {
    feeShrinkList.push({
      label: fee.name,
      cost: fee.cost,
      residenceFeeId: fee.residenceFeeId,
    });
  });

  const handleAddPayment = () => {
    setPayments([...payments, { label: "", cost: "", residenceFeeId: "" }]);
  };
  const handleDeletePayment = (id) => {
    // console.log(payments);
    const updatePayments = payments.filter((_, index) => index !== id);
    // console.log(updatePayments);
    if (payments[id].cost !== "")
      setTotalCost(totalCost - parseInt(payments[id].cost));

    setPayments(updatePayments);
  };

  const handleChangeName = (event, value) => {
    if (value !== null) {
      if (value.residenceId) {
        ClassApi.GetResidenceById(value.residenceId)
          .then((res) => {
            setAddress(res.data.address);
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
      }
      setFullName(value.label);
      setPersonId(value.personId);
    } else {
      setFullName("");
    }
  };

  const handleChangeFee = (index) => (event, value) => {
    let newPayments = [...payments];
    if (value !== null) {
      newPayments[index] = {
        label: value.label,
        cost: value.cost === null ? "" : String(value.cost),
        residenceFeeId: value.residenceFeeId,
      };
      if (payments[index].cost !== "")
        setTotalCost(totalCost - parseInt(payments[index].cost) + value.cost);
      else setTotalCost(totalCost + value.cost);
    } else {
      newPayments[index] = { label: "", cost: "", residenceFeeId: "" };
      setTotalCost(totalCost - parseInt(payments[index].cost));
    }
    setPayments(newPayments);
  };
  const handleChangeCost = (index) => (event, value) => {
    let newPayments = [...payments];
    // console.log(event.target.value);
    // console.log(parseInt(event.target.value));
    let newCost = event.target.value === "" ? 0 : parseInt(event.target.value);

    if (newCost !== 0) {
      newPayments[index].cost = String(newCost);
    } else {
      newPayments[index].cost = "";
    }
    setPayments(newPayments);
    // console.log(payments);
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
    if (dateCreated === undefined || !dateCreated.isValid()) {
      toast.error("Ngày thu không hợp lệ!");
      return;
    }
    if (totalCost === 0) {
      toast.error("Vui lòng thêm khoản thu!");
      return;
    }
    payments.map((payment1, index1) => {
      payments.map((payment2, index2) => {
        if (
          payment1.label !== "" &&
          payment2.label !== "" &&
          payment1.label === payment2.label &&
          index1 !== index2
        ) {
          setIsValid(false);
        }
      });
    });
    if (!isValid) {
      toast.error("Tồn tại khoản thu lại lặp trong phiếu thu!");
      return;
    }

    var dateCreatedJson = new Date(dateCreated);
    dateCreatedJson.setDate(dateCreatedJson.getDate() + 1);
    dateCreatedJson = JSON.stringify(dateCreatedJson);
    dateCreatedJson = dateCreatedJson.slice(1, dateCreatedJson.length - 1);
    let residencePayments = [];
    payments.map((payment) => {
      residencePayments.push({
        residenceFeeId: payment.residenceFeeId,
        amount: parseInt(payment.cost),
      });
    });
    const newResidenceReceipt = new ResidenceReceipt(
      dateCreated,
      totalCost,
      description,
      residencePayments,
      personId,
      address
    );
    console.log(newResidenceReceipt);
    ClassApi.PostResidenceReceipt(newResidenceReceipt)
      .then((res) => {
        toast.success("Tạo phiếu thu thành công!");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} padding={"50px"}>
        <Grid item xs={12}>
          <div style={{ fontSize: "40px" }}>Tạo phiếu thu</div>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <Grid item container direction="row" alignItems="center">
              <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
                Họ và tên
              </Typography>

              <AutoComplete
                optionList={personShrinkList}
                onChange={handleChangeName}
              ></AutoComplete>
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Typography style={{ fontSize: "24px", marginRight: "54px" }}>
                Địa chỉ
              </Typography>
              <TextField
                style={{ width: "500px" }}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  // console.log(e.target.value);
                }}
                inputProps={{ style: { fontSize: "18px" }, required: true }}
              ></TextField>
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Typography style={{ fontSize: "24px", marginRight: "28px" }}>
                Ngày thu
              </Typography>
              <CustomizedDatePicker
                sx={{ marginLeft: "4px", required: true }}
                value={dateCreated}
                onChange={(date) => setDateCreated(date)}
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    required: true,
                  },
                }}
              ></CustomizedDatePicker>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h3">Danh sách khoản thu</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TableContainer component={Paper}>
                <Table
                  sx={{
                    minWidth: 650,
                    "& .MuiTableCell-root": {
                      border: "1px solid black",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      {columnNames.map((name, index) => (
                        <TableCell key={index}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: "bold" }}
                          >
                            {name}
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
                                <TextField
                                  {...params}
                                  label=""
                                  required={true}
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell
                            style={{ fontSize: "18px", width: "360px" }}
                          >
                            <TextField
                              inputProps={{
                                style: { fontSize: "18px" },
                                required: true,
                              }}
                              value={
                                payment.cost &&
                                payment.cost
                              }
                              onChange={handleChangeCost(index)}
                            ></TextField>
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() => handleDeletePayment(index)}
                              style={{ fontSize: "18px", color: "red" }}
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
                >
                  Thêm
                </button>
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Typography style={{ fontSize: "24px", marginRight: "46px" }}>
                Ghi chú
              </Typography>
              <TextField
                style={{ width: "500px" }}
                inputProps={{ style: { fontSize: "18px" } }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item sx={{ mt: 2 }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#79C9FF",
                  margin: "30px 0px",
                  fontSize: "20px",
                  color: "black",
                }}
                type="submit"
                size="large"
              >
                Xác nhận
              </Button>
              <NavLink to="/danhsachphieuthu">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#79C9FF",
                    marginLeft: "30px",
                    fontSize: "20px",
                    color: "black",
                  }}
                  size="large"
                >
                  Hủy
                </Button>
              </NavLink>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
