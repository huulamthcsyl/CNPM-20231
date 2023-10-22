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
function ChiTietHoDan({ Hodan }) {
  Hodan = {
    chuho: "Nguyễn Văn A",
    noithuongtru: "P10.02.10",
    thanhvien: [
      {
        hoten: "Nguyễn Văn A",
        sinhnhat: "01/01/1970",
        cccd: "0123456789",
        quanhe: "Chồng",
      },
      {
        hoten: "Lê Thị B",
        sinhnhat: "01/01/1974",
        cccd: "0123737379",
        quanhe: "Vợ",
      },
    ],
  };
  const [hodan, setHodan] = useState(Hodan);
  const [numberLine, setNumberLine] = useState(hodan.thanhvien.length);
  var arr = [...Array(numberLine).keys()].map((i) => i + 1);
  useEffect(() => {
    arr = [...Array(numberLine).keys()].map((i) => i + 1);
  }, [numberLine]);
  console.log(arr);
  return (
    <Grid container spacing={2} padding="50px">
      <Grid item xs={12}>
        <Grid item xs={12}>
          <h1 style={{ fontSize: "40px" }}>Chi tiết hộ {hodan.chuho}</h1>
        </Grid>
        <Grid
          item
          container
          xs={12}
          direction="row"
          style={{ alignItems: "center" }}
        >
          <Grid item style={{ marginTop: "30px" }}>
            <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
              Tên chủ hộ
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "300px" }}
              inputProps={{ style: { fontSize: "13px" } }}
              value={hodan.chuho}
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
          <Grid item>
            <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
              Nơi thường trú
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: "30px", marginBottom: "30px" }}>
            <TextField
              style={{ width: "500px" }}
              inputProps={{ style: { fontSize: "13px" } }}
              value={hodan.noithuongtru}
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
                      value={
                        hodan.thanhvien[index - 1] != undefined
                          ? hodan.thanhvien[index - 1].hoten
                          : ""
                      }
                    />
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <input
                      style={{ fontSize: "18px", border: "none" }}
                      type="date"
                      value={
                        hodan.thanhvien[index - 1] != undefined
                          ? hodan.thanhvien[index - 1].sinhnhat
                          : ""
                      }
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
                      value={
                        hodan.thanhvien[index - 1] != undefined
                          ? hodan.thanhvien[index - 1].cccd
                          : ""
                      }
                    ></input>
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <select
                      value={
                        hodan.thanhvien[index - 1] != undefined
                          ? hodan.thanhvien[index - 1].quanhe
                          : "Chủ hộ"
                      }
                      style={{ fontSize: "18px", border: "none" }}
                    >
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
                    <span style={{ color: "red" }}>Xóa</span>
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
      <Grid item xs={12}>
        <button style={{ backgroundColor: "transparent", cursor: "pointer" }}>
          <Typography variant="h4" style={{ color: "blue", cursor: "pointer" }}>
            Lịch sử thay đổi nhân khẩu
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

export default ChiTietHoDan;
