import React from "react";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableRow, TableHead, TableContainer } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ClassApi from "../../Api/Api";
import { Autocomplete, Box } from "@mui/material";
import { toast } from "react-toastify";
import { ResidenceReceipt } from "../../Models/ResidenceReceipt";

export default function ResidenceReceiptDetailPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const residenceReceiptId = searchParams.get("residenceReceiptId");
  const [residenceReceipt, setResidenceReceipt] = useState({});
  const [payments, setPayments] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const feeShrinkList = [];
  const listPayment = [];
  const [fees, setFees] = useState([]);
  const [description, setDescription] = useState("");
  const [personId, setPersonId] = useState("");
  const [address, setAddress] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  let isValid = true;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ClassApi.GetResidenceReceipt(residenceReceiptId)
      .then((res) => {
        setResidenceReceipt(res.data);
        setTotalCost(res.data.amount);
        setDescription(res.data.description);
        setPersonId(res.data.personId);
        setAddress(res.data.address);
        setDateCreated(res.data.dateCreated);
        if (listPayment.length === 0) {
          res.data.listPayment.map((payment) => {
            listPayment.push({
              label: payment.feeName,
              cost: payment.amount,
              residenceFeeId: payment.feeId,
            });
            // console.log(listPayment);
          });
          setPayments(listPayment);
        }
        //  console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data);
        console.log(error);
        setLoading(false);
      });
    ClassApi.GetAllResidenceFee()
      .then((res) => {
        setFees(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err);
        setLoading(false); 
      });
  }, []);

  if (loading) {
    // return <div>Loading...</div>;
    return null;
  }
  fees.map((fee, index) => {
    feeShrinkList.push({
      label: fee.name,
      cost: fee.cost,
      residenceFeeId: fee.residenceFeeId,
    });
  });
  const tableHeadName = [
    { id: 1, name: "Số thứ tự" },
    { id: 2, name: "Tên khoản thu" },
    { id: 3, name: "Số tiền (đồng)" },
    { id: 4, name: "" },
  ];
  const information = [
    {
      id: 1,
      name: "Họ và tên",
      marginRight: "23px",
      value: residenceReceipt.person,
    },
    {
      id: 2,
      name: "Địa chỉ",
      marginRight: "52px",
      value: residenceReceipt.address,
    },
    {
      id: 3,
      name: "Ngày thu",
      marginRight: "28px",
      value: new Date(residenceReceipt.dateCreated).toLocaleDateString("en-GB"),
    },
  ];

  const handleAddPayment = () => {
    setPayments([...payments, { label: "", cost: "", residenceFeeId: "" }]);
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
    payments.map((payment1, index1) => {
      payments.map((payment2, index2) => {
        if (
          payment1.residenceFeeId === payment2.residenceFeeId &&
          index1 !== index2
        ) {
          isValid = false;
        }
      });
    });
    if (!isValid) {
      toast.error("Tồn tại khoản thu lại lặp trong phiếu thu!");
      isValid = true;
      return;
    }

    let residencePayments = [];
    payments.map((payment) => {
      residencePayments.push({
        residenceFeeId: payment.residenceFeeId,
        amount: parseInt(payment.cost),
        residenceReceiptId: residenceReceiptId,
      });
    });
    
    console.log(residencePayments);
    const newResidenceReceipt = new ResidenceReceipt(
      dateCreated,
      totalCost,
      description,
      residencePayments,
      personId,
      address,
      residenceReceiptId
    );
    console.log(newResidenceReceipt);
    console.log("nam");
    ClassApi.PutResidenceReceipt(newResidenceReceipt, residenceReceiptId)
      .then((res) => {
        toast.success("Sửa phiếu thu thành công!");
      })
      .catch((error) => {
        toast.error(error.response.data);
        console.log(error);
      });
  };
  return (
    <Grid container spacing={2} padding={"50px"}>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <h1 style={{ fontSize: "40px" }}>Chi tiết phiếu thu</h1>
        </Grid>
        {information.map((Information, index) => (
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            sx={{ mt: 2 }}
          >
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
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="h3">Danh sách khoản thu</Typography>
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
                      <TableCell style={{ fontSize: "18px", width: "360px" }}>
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
          <NavLink onClick={() => window.history.back()}>
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
