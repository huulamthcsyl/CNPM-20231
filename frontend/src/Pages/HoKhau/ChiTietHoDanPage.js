import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
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
import ClassApi from '../../Api/Api'
import { NavLink, useParams } from "react-router-dom";
const headers = [

  "Họ và tên",
  "Ngày, tháng, năm sinh",
  "Số CMT/CCCD",
  "Quan hệ với chủ hộ",
  " ",
];
function ChiTietHoDan({ Hodan }) {
  const id = useParams().id
  const [name, setName] = useState()
  const [idd, setIdd] = useState('')
  const [identityCardNumber, setIdentityCardNumber] = useState('')
  const [birth, setBirth] = useState()

  Hodan = {
    "residenceId": "76635a7e-2cc1-4428-8724-7f6fbbc57613",
    "memberNumber": 1,
    "address": "...",
    "ownerId": "",
    "people": [
      {
        "personId": "821cec81-33c9-45d9-819e-536f9a8e32b2",
        "residenceId": "76635a7e-2cc1-4428-8724-7f6fbbc57613",
        "name": "Hoàng",
        "dateOfBirth": "2003-02-11T20:00:00",
        "identityCardNumber": "232342432",
        "gender": true,
        "phoneNumber": "432432423432",
        "homeTown": "Xã Quỳnh Yên, Huyện Quỳnh Lưu, Tỉnh Nghệ An",
        "ownerRelationship": null,
        "status": "Tạm Vắng"
      }
    ]
  };
  useEffect(() => {
    ClassApi.GetInfoPerson(idd).then((response) => {
      setName(response.data.name)
      setBirth(response.data.dateOfBirth ? response.data.dateOfBirth.slice(0, 10) : '')
      setIdentityCardNumber(response.data.identityCardNumber)
    })
  }, [idd])
  const [hodan, setHodan] = useState(Hodan);
  const [numberLine, setNumberLine] = useState(hodan.people.length);
  var arr = [...Array(numberLine).keys()].map((i) => i + 1);
  useEffect(() => {
    arr = [...Array(numberLine).keys()].map((i) => i + 1);
  }, [numberLine]);
  console.log(arr);
  useEffect(() => {
    ClassApi.GetResidenceById(id).then((response) => {
      setHodan(response.data)
      setIdd(response.data.ownerId)
    })
  }, [])
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
              value={name}
              disabled
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
              value={hodan.address}
              disabled
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
              <TableRow>
                <TableCell>
                  <Typography style={{ fontSize: '20px' }}>{name}</Typography>
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  <input
                    style={{ fontSize: "18px", border: "none" }}
                    type="date"
                    value={birth}
                    //     onChange={(e) => { setBirth(e.target.value) }}
                    disabled
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
                    value={identityCardNumber}
                    disabled
                  //   onChange={(e)=>setIdentityCardNumber(e.target.value)}
                  ></input>
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  <Select style={{ fontSize: "18px", border: "none", width: '120px' }} value='Chủ hộ' >
                    <MenuItem value='Chủ hộ'>Chủ hộ</MenuItem>
                  </Select>
                </TableCell>
                <TableCell style={{ fontSize: "18px", cursor: "pointer" }}>
                  <NavLink to={'/chitietcudan/' + idd}>
                    <span style={{ color: "blue" }}>Chi tiết</span>|
                  </NavLink>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      fontSize: "18px",
                    }}

                  >

                  </button>
                </TableCell>
              </TableRow>
              {hodan.people.map((item, index) => (
                <TableRow key={index}>

                  <TableCell>
                    <input
                      style={{
                        fontSize: "18px",
                        border: "none",
                        width: "150px",
                      }}
                      type="text"
                      value={
                        item.name
                      }
                    />
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <input
                      style={{ fontSize: "18px", border: "none" }}
                      type="date"
                      value={
                        item.dateOfBirth.slice(0, 10)

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

                        item.identityCardNumber

                      }
                    ></input>
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <Select style={{ fontSize: "18px", border: "none", width: '120px' }} value={
                      item.ownerRelationship
                    } disabled>
                      <MenuItem value='Khác'>Khác</MenuItem>
                      <MenuItem value='Chủ hộ'>Chủ hộ</MenuItem>
                      <MenuItem value='Vợ'>Vợ</MenuItem>
                      <MenuItem value='Chồng'>Chồng</MenuItem>
                      <MenuItem value='Con'>Con</MenuItem>
                      <MenuItem value='Bố'>Bố</MenuItem>
                      <MenuItem value='Mẹ'>Mẹ</MenuItem>
                      <MenuItem value='Anh/chị/em'>Anh/chị/em</MenuItem>
                    </Select>
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
