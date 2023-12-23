import {
  Button,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import ButtonSearch from "../../Layout/component/ButtonSearch";
import { NavLink } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import styled from "@emotion/styled";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import ClassApi from '../../Api/Api'
import { toast } from "react-toastify";
import AutoComplete from "../../Layout/component/AutoCompleteSearch";
import dayjs from "dayjs";
const CustomizedDatePicker = styled(DatePicker)`
  & .MuiInputBase-input {
    font-size: 18px;
    width: 150px;
    height: 40px;
  }
  .MuiInputLabel-root {
    font-size: 20px;
  }
`;
const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: "500",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          //padding: "0px 30px",
          width: "430px",
          "& .MuiInputBase-input": {
            fontSize: "20px",
            padding: "15px",
          },
        },
      },
    },
  },
});
function DangKyTamVangPage() {
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const [province, setProvince] = useState("");

  const handleChange2 = (event) => {
    setProvince(event.target.value);
  };
  const [district, setDistrict] = useState("");

  const handleChange3 = (event) => {
    setDistrict(event.target.value);
  };
  const [village, setVillage] = useState("");

  const handleChange4 = (event) => {
    setVillage(event.target.value);
  };
  const [personId, setPersonId] = useState('')
  const [name, setName] = useState('')
  const [gender, setGender] = useState('Nam')
  const [birth, setBirth] = useState()
  const [cccd, setCccd] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [timeFrom, setTimeFrom] = useState()
  const [timeTo, setTimeTo] = useState()
  const [reason, setReason] = useState('')
  const personShrinkList = [];
  const [personList, setPersonList] = useState([])
  useEffect(() => {
    ClassApi.GetAllPeople()
      .then((res) => {
        setPersonList(res.data);
      })
      .catch((err) => {
        toast.error("lỗi 1");
      });
  }, [name])
  personList.map((person, index) => {
    personShrinkList.push({
      label: person.name,
      code: person.identityCardNumber,
      personId: person.personId,
      residenceId: person.residenceId,
      address: person.homeTown,
      gender: person.gender,
      birth: person.dateOfBirth,
      phone: person.phoneNumber
    });
  });
  const handleAdd = () => {

    ClassApi.PostAbsent({
      "absentPersonId": "934a9ac4-42ef-4713-a9f7-88e9308b7ae4",
      "personId": personId,
      "startTime": timeFrom,
      "endTime": timeTo,
      "reason": reason,
      "temporaryStay": address2
    }).then((resp) => {
      toast.success('Đăng ký tạm vắng  thành công')
    }).catch((error) => {
      toast.error('Đăng ký tạm vắng thất bại')
    })
  }
  const handleChangeName = (e, value) => {
    if (e.target.value == null) {
      return
    }
    console.log(value)
    setName(value.label)
    setCccd(value.code)
    setGender(value.gender ? 'Nam' : 'Nữ')
    setBirth(dayjs(value.birth))
    setPhoneNumber(value.phone)
    setAddress1(value.address)
    setPersonId(value.personId)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={1} style={{ padding: "50px" }} rowSpacing={2}>
        <ThemeProvider theme={theme}>
          <Grid item xs={12}>
            <Typography variant="h1" fontSize={48}>
              Đăng ký tạm vắng
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            wrap="wrap"
          // columnSpacing={8}
          >
            <Grid item xs={2.8}>
              <Typography variant="h4">Họ và tên</Typography>
            </Grid>
            <Grid item>
              <AutoComplete
                optionList={personShrinkList}
                onChange={handleChangeName}
                padding='0px'
              ></AutoComplete>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            direction="row"
            wrap="wrap"
            alignItems="center"
          >
            <Grid item container xs={12} wrap="nowrap">
              <Grid item xs={2.8}>
                <Typography variant="h4">Giới tính</Typography>
              </Grid>
              <Grid item alignItems="center">
                <input
                  id="radio1"
                  type="radio"
                  name="gender"
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                  value='Nam'
                  checked={gender == 'Nam' ? true : false}
                  onClick={() => { setGender('Nam') }}
                  disabled
                ></input>
                <label
                  htmlFor="radio1"
                  style={{ fontSize: "24px", margin: "0px 12px" }}
                >
                  Nam
                </label>
              </Grid>
              <Grid item alignItems="center">
                <input
                  disabled
                  id="radio2"
                  type="radio"
                  name="gender"
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                  value='Nữ'
                  checked={gender == 'Nam' ? false : true}
                  onClick={() => { setGender('Nữ') }}

                ></input>
                <label
                  htmlFor="radio2"
                  style={{ fontSize: "24px", margin: "0px 12px" }}

                >
                  Nữ
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container wrap="wrap" alignItems="center">
            <Grid item xs={2.8}>
              <Typography variant="h4">Ngày, tháng, năm sinh</Typography>
            </Grid>
            <Grid item>
              <CustomizedDatePicker
                slotProps={{ textField: { variant: "filled" } }}
                sx={{
                  marginRight: "35px",
                  width: "200px",
                  paddingTop: "10px",
                }}
                value={birth}
                onChange={(value) => {
                  setBirth(value)
                }}
                disabled
              />
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            alignItems="center"
            wrap="wrap"
          // columnSpacing={12}
          >
            <Grid item xs={2.8}>
              <Typography variant="h4">CCCD</Typography>
            </Grid>
            <Grid item>
              <TextField value={cccd} disabled></TextField>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            wrap="wrap"
          //    columnSpacing={3}
          >
            <Grid item xs={2.8}>
              <Typography variant="h4">Số điện thoại</Typography>
            </Grid>
            <Grid item>
              <TextField value={phoneNumber} disabled onChange={(e) => { setPhoneNumber(e.target.value) }}></TextField>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            wrap="wrap"
          //     columnSpacing={3}
          >
            <Grid item xs={2.8}>
              <Typography variant="h4">Nơi thường trú</Typography>
            </Grid>
            <Grid item>
              <TextField value={address1} disabled></TextField>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            wrap="wrap"
          //   columnSpacing={3}
          >
            <Grid item xs={2.8}>
              <Typography variant="h4">Nơi tạm trú</Typography>
            </Grid>
            <Grid item>
              <TextField value={address2} onChange={(e) => { setAddress2(e.target.value) }}></TextField>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            wrap="wrap"
          //    columnSpacing={3}
          >
            <Grid item xs={2.8}>
              <Typography variant="h4">Thời gian</Typography>
            </Grid>
            <Grid item>
              <CustomizedDatePicker
                label="Từ ngày"
                slotProps={{ textField: { variant: "filled" } }}
                sx={{ marginRight: "35px", width: "200px", paddingTop: "10px" }}
                value={timeFrom}
                onChange={(e) => { setTimeFrom(e) }}
              />
            </Grid>
            <Grid item>
              <CustomizedDatePicker
                label="Đến ngày"
                slotProps={{ textField: { variant: "filled" } }}
                sx={{
                  marginRight: "35px",
                  width: "200px",
                  paddingTop: "10px",
                }}
                value={timeTo}
                onChange={(e) => { setTimeTo(e) }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            wrap="wrap"
          //      columnSpacing={3}
          >
            <Grid item xs={2.8}>
              <Typography variant="h4">Lý do</Typography>
            </Grid>
            <Grid item>
              <TextField value={reason} onChange={(e) => { setReason(e.target.value) }}></TextField>
            </Grid>
          </Grid>
          <Grid item xs={12}>

            <ButtonSearch onclick={handleAdd} title="Xác nhận" border="none"></ButtonSearch>
            <NavLink to="/tamvang">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#f48888",
                  //  width: "120px",
                  margin: "30px 20px",
                }}
              >
                <Typography variant="h4" style={{ color: "black" }}>
                  Quay lại
                </Typography>
              </Button>
            </NavLink>
          </Grid>
        </ThemeProvider>
      </Grid>
    </LocalizationProvider>
  );
}

export default DangKyTamVangPage;
