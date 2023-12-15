import React, { useEffect } from "react";
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
  let residencePayments = [];

  useEffect(() => {
    ClassApi.GetAllPeople()
      .then((res) => {
        setPersonList(res.data);
      })
      .catch((err) => {
        toast.error("lỗi 1");
      });
    ClassApi.GetAllResidenceFee()
      .then((res) => {
        setFees(res.data);
      })
      .catch((err) => {
        toast.error("lỗi 3");
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
    setPayments([...payments, { label: "", cost: null, residenceFeeId: "" }]);
  };
  const handleDeletePayment = (id) => {
    const updatePayments = payments.filter((_, index) => index !== id);
    if (payments[id].name !== "") setTotalCost(totalCost - payments[id].cost);
    setPayments(updatePayments);
  };

  const handleChangeName = (event, value) => {
    console.log(value);

    if (value !== null) {
      if (value.residenceId) {
        ClassApi.GetResidenceById(value.residenceId)
          .then((res) => {
            setAddress(res.data.address);
          })
          .catch((err) => {
            toast.error("lỗi 2");
          });
      } else setAddress("");
      setFullName(value.label);
      setPersonId(value.personId);
    } else {
      setAddress("");
      setFullName("");
    }
  };

  const handleChangeFee = (index) => (event, value) => {
    let newPayments = [...payments];
    if (value !== null) {
      newPayments[index] = value;
      setTotalCost(totalCost - payments[index].cost + value.cost);
    } else {
      newPayments[index] = { label: "", cost: "" };
      setTotalCost(totalCost - payments[index].cost);
    }
    setPayments(newPayments);
  };
  const handleSubmit = () => {
    console.log(fullName);
    if (fullName === "") toast.error("Tên không hợp lệ!");
    else {
      if (dateCreated === undefined || !dateCreated.isValid())
        toast.error("Ngày thu không hợp lệ!");
      else {
        setIsValid(true);
        residencePayments = [];
        payments.map((payment1, index1) => {
          residencePayments.push({
            residenceFeeId: payment1.residenceFeeId,
            amount: payment1.cost,
          });
          payments.map((payment2, index2) => {
            if (
              payment1.label !== "" &&
              payment2.label !== "" &&
              payment1.label === payment2.label &&
              index1 !== index2
            )
              setIsValid(false);
          });
        });
        if (residencePayments.length === 0)
          toast.error("Vui lồng thêm khoản thu!");
        else {
          if (!isValid) toast.error("Có khoản thu lặp lại trong phiếu thu");
          else {
            var dateCreatedJson = new Date(dateCreated);
            dateCreatedJson.setDate(dateCreatedJson.getDate() + 1);
            dateCreatedJson = JSON.stringify(dateCreatedJson);
            dateCreatedJson = dateCreatedJson.slice(
              1,
              dateCreatedJson.length - 1
            );
            ClassApi.PostResidenceReceipt(
              new ResidenceReceipt(
                dateCreated,
                totalCost,
                description,
                residencePayments,
                personId
              )
            )
              .then((res) => {
                if (res.status < 300 && res.status > 199)
                  toast.success("Tạo phiếu thu thành công");
                else {
                  toast.error("Tạo phiếu thu không thành công");
                  console.log(res.data);
                }
              })
              .catch((error) => {
                toast.error("Tạo phiếu thu không thành công");
              });
          }
        }
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} padding={"50px"}>
        <Grid item xs={12}>
          <div style={{ fontSize: "40px" }}>Tạo phiếu thu</div>
        </Grid>
        <Grid item container direction="row" alignItems="center">
          <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
            Họ và tên
          </Typography>

          <AutoComplete
            optionList={personShrinkList}
            onChange={handleChangeName}
          ></AutoComplete>
        </Grid>
        <Grid item container direction="row" alignItems="center">
          <Typography style={{ fontSize: "24px", marginRight: "54px" }}>
            Địa chỉ
          </Typography>
          <TextField
            style={{ width: "500px" }}
            value={address}
            inputProps={{ style: { fontSize: "18px" } }}
          ></TextField>
        </Grid>
        <Grid item container direction="row" alignItems="center">
          <Typography style={{ fontSize: "24px", marginRight: "28px" }}>
            Ngày thu
          </Typography>
          <CustomizedDatePicker
            sx={{ marginLeft: "4px" }}
            value={dateCreated}
            onChange={(date) => setDateCreated(date)}
            format="DD-MM-YYYY"
          ></CustomizedDatePicker>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Danh sách khoản thu</Typography>
        </Grid>
        <Grid item xs={12}>
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
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        {name}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment, index) => (
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
                          <TextField {...params} label="" />
                        )}
                      />
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {payment.cost &&
                        payment.cost.toLocaleString("en-US", {
                          style: "decimal",
                        })}
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
                    {totalCost.toLocaleString("en-US", {
                      style: "decimal",
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <button
              onClick={() => handleAddPayment()}
              style={{ fontSize: "18px", color: "red" }}
            >
              Thêm
            </button>
          </Typography>
        </Grid>
        <Grid item container direction="row" alignItems="center">
          <Typography style={{ fontSize: "24px", marginRight: "48px" }}>
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
          {/* <NavLink to="/danhsachphieuthu"> */}
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
          >
            <Typography
              variant="h4"
              style={{ color: "black" }}
              onClick={handleSubmit}
            >
              Xác nhận
            </Typography>
          </Button>
          {/* </NavLink> */}
          <NavLink to="/danhsachphieuthu">
            <Button
              variant="contained"
              style={{ backgroundColor: "#79C9FF", margin: "30px 30px" }}
            >
              <Typography variant="h4" style={{ color: "black" }}>
                Hủy
              </Typography>
            </Button>
          </NavLink>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
