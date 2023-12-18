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
import ClassApi from '../../Api/Api'
import AutoComplete from "../../Layout/component/AutoCompleteSearch";
import { toast } from "react-toastify";
import CustomRow from "./Row";
const headers = [
  "Họ và tên",
  "Ngày, tháng, năm sinh",
  "Số CMT/CCCD",
  "Quan hệ với chủ hộ",
  " ",
];
function ThemHoDan() {
  const [ownerName, setOwnerName] = useState('')
  const [address, setAddress] = useState('')
  const [listMember, setListMember] = useState([])
  const [numberLine, setNumberLine] = useState(1);
  const [arr, setArr] = useState([1])
  const handlePost = () => {
    ClassApi.PostResidence({
      "residenceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "memberNumber": listMember.length,
      "address": address,
      "ownerName": ownerName,
      "people": listMember
    }).then((response) => {
      toast.info('Thành công')
    })
  }
  var deleterow = (index) => {
    const newArr = arr.filter((_, idx) => idx !== index - 1);
    setArr(newArr)
    const updatedList = listMember.filter((_, i) => i !== index);
    setListMember(updatedList);
    //  setNumberLine(numberLine - 1)
  }
  const handleAddRow = () => {
    setArr([...arr, arr.length + 1]); // Thêm một phần tử mới vào mảng arr với giá trị tăng dần
  };
  useEffect(() => {
    setArr(Array.from({ length: numberLine }, (_, index) => index + 1)); // Tạo mảng mới từ 1 đến numberLine
  }, [numberLine]);
  const pushMember = (person) => {
    setListMember([...listMember, person])
    console.log([...listMember, person])
  }

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
                <CustomRow key={index} index={index} ondelete={deleterow} handleAdd={pushMember} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <button
          style={{ backgroundColor: "transparent", cursor: "pointer" }}
          onClick={() => {
            handleAddRow()
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
          onClick={handlePost}
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
