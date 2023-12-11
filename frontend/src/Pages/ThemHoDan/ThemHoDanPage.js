import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
const headers = [
  "STT",
  "Họ và tên",
  "Ngày, tháng, năm sinh",
  "Số CMT/CCCD",
  "Quan hệ với chủ hộ",
  " ",
];
function ThemHoDan() {
  const [ownerName, setOwnerName] = useState('')
  const [address, setAddress] = useState('')
  const [numberMember, setNumberMember] = useState(1)
  const [numberLine, setNumberLine] = useState(1);
  var arr = [...Array(numberLine).keys()].map((i) => i + 1);
  useEffect(() => {
    arr = [...Array(numberLine).keys()].map((i) => i + 1);
  }, [numberLine]);
  console.log(arr);
  return (
    <Grid container spacing={2} padding="50px">
      <Grid item xs={12}>
        <Grid item xs={12}>
          <h1 style={{ fontSize: "40px" }}>Thêm hộ dân mới</h1>
        </Grid>
        <Grid
          item
          container
          xs={12}
          direction="row"
          style={{ alignItems: "center", alignContent: 'center  ' }}
        >
          <Grid item xs={5} sm={2.2}>
            <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
              Tên chủ hộ
            </Typography>
          </Grid>
          <Grid item >
            <TextField
              style={{ width: "300px" }}
              inputProps={{ style: { fontSize: "15px" } }}
              value={ownerName}
              onChange={(e) => { setOwnerName(e.target.value) }}
            ></TextField>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          direction="row"
          style={{ alignItems: "center" }}
        >
          <Grid item xs={5} sm={2.2}>
            <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
              Nơi thường trú
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: "30px", marginBottom: "30px" }}>
            <TextField
              style={{ width: "500px" }}
              inputProps={{ style: { fontSize: "15px" } }}
              value={address}
              onChange={(e) => { setAddress(e.target.value) }}
            ></TextField>
          </Grid>
        </Grid>
        <Grid item>
          <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
            Danh sách nhân khẩu
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {headers.map((column, index) => (
                  <TableCell key={index}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                      {column}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {arr.map((index) => (
                <TableRow key={index}>
                  <TableCell style={{ fontSize: "18px" }}>{index}</TableCell>
                  <TableCell>
                    <input
                      style={{
                        fontSize: "18px",
                        border: "none",
                        width: "150px",
                      }}
                      type="text"
                    />
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <input
                      style={{ fontSize: "18px", border: "none" }}
                      type="date"
                    />
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <input
                      style={{
                        fontSize: "18px",
                        border: "none",
                        width: "150px",
                      }}
                      type="text"
                    ></input>
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <select style={{ fontSize: "18px", border: "none" }}>
                      <option>Chủ hộ</option>
                      <option>Vợ</option>
                      <option>Chồng</option>
                      <option>Con</option>
                      <option>Bố</option>
                      <option>Mẹ</option>
                      <option>Anh/chị/em</option>
                    </select>
                  </TableCell>
                  <TableCell style={{ fontSize: "18px", cursor: "pointer" }}>
                    <span style={{ color: "blue" }}>Chi tiết</span>|
                    <button
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "18px",
                      }}
                      onClick={() => {
                        setNumberLine(numberLine - 1);
                      }}
                    >
                      <span style={{ color: "red" }}>Xóa</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <button
          style={{ backgroundColor: "transparent", cursor: "pointer" }}
          onClick={() => {
            setNumberLine(numberLine + 1);
          }}
        >
          <Typography variant="h4" style={{ color: "red", cursor: "pointer" }}>
            Thêm
          </Typography>
        </button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
        >
          <Typography variant="h4" style={{ color: "black" }}>
            Xác nhận
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

export default ThemHoDan;
