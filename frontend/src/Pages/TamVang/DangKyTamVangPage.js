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
import { styled } from "@mui/system";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import ClassApi from '../../Api/Api'
import { toast } from "react-toastify";
import AutoComplete from "../../Layout/component/AutoCompleteSearch";
import dayjs from "dayjs";

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

const CustomizedDatePicker = styled(DatePicker)`
  & .MuiInputBase-input {
    font-size: 20px;
    width: 150px;
  }
  .MuiInputLabel-root {
    font-size: 20px;
  }
`;

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
    if (name == '' || name == null) {
      toast.warn('Hãy nhập họ tên!')
      return
    }
    if (address2 == null || address2 == '') {
      toast.warn('Hãy nhập nơi tạm trú!')
      return
    }
    if (timeFrom == null || timeTo == '' || timeTo == null || timeTo == '') {
      toast.warn('Hãy nhập thời gian!')
      return
    }
    if (!timeFrom.isValid() || !timeTo.isValid()) {
      toast.warn('Thời gian không hợp lệ!')
      return
    }
    if (timeFrom.diff(timeTo, 'days') > 0) {
      toast.warn('Thời gian bắt đầu không thể lớn hơn thời gian kết thúc!')
      return
    }
    ClassApi.PostAbsent({
      "absentPersonId": "934a9ac4-42ef-4713-a9f7-88e9308b7ae4",
      "personId": personId,
      "startTime": timeFrom.hour(12),
      "endTime": timeTo.hour(12),
      "reason": reason,
      "temporaryStay": address2
    }).then((resp) => {
      toast.success('Đăng ký tạm vắng thành công')
    }).catch((error) => {
      toast.error(error.response.data);
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
              <Typography variant="h4">Họ và tên <span style={{ color: 'red' }}>(*)</span></Typography>
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
            <Grid item container xs={12} wrap="nowrap" alignItems={"center"}>
              <Grid item xs={4.1}>
                <Typography variant="h4">Giới tính <span style={{ color: 'red' }}>(*)</span></Typography>
              </Grid>
              <Grid item container alignItems="center" xs={1.5}>
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
                  style={{ fontSize: "20px", margin: "0px 12px" }}
                >
                  Nam
                </label>
              </Grid>
              <Grid item container alignItems="center">
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
                  style={{ fontSize: "20px", margin: "0px 12px" }}

                >
                  Nữ
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container wrap="wrap" alignItems="center">
            <Grid item xs={2.8}>
              <Typography variant="h4">Ngày, tháng, năm sinh <span style={{ color: 'red' }}>(*)</span></Typography>
            </Grid>
            <Grid item>
              <CustomizedDatePicker
                format="DD-MM-YYYY"
                slotProps={{ textField: { variant: "outlined" } }}
                sx={{
                  marginRight: "35px",
                  width: "200px",
                  //      paddingTop: "10px",
                }}
                value={birth}
                onChange={(value) => {
                  setBirth(value)
                }}
                readOnly={true}
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
              <TextField value={cccd} readOnly="true"></TextField>
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
              <TextField value={phoneNumber} readOnly="true" onChange={(e) => { setPhoneNumber(e.target.value) }}></TextField>
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
              <Typography variant="h4">Nơi thường trú <span style={{ color: 'red' }}>(*)</span></Typography>
            </Grid>
            <Grid item>
              <TextField value={address1} readOnly="true"></TextField>
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
              <Typography variant="h4">Nơi tạm trú <span style={{ color: 'red' }}>(*)</span></Typography>
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
            <Grid item xs={2.8} paddingTop='10px'>
              <Typography variant="h4">Thời gian <span style={{ color: 'red' }}>(*)</span></Typography>
            </Grid>
            <Grid item>
              <CustomizedDatePicker
                format="DD-MM-YYYY"
                label="Từ ngày"
                slotProps={{ textField: { variant: "standard", } }}
                sx={{ marginRight: "35px", width: "200px" }}
                value={timeFrom}
                onChange={(e) => { setTimeFrom(e) }}
              />
            </Grid>
            <Grid item>
              <CustomizedDatePicker
                format="DD-MM-YYYY"
                label="Đến ngày"
                slotProps={{ textField: { variant: "standard" } }}
                sx={{
                  marginRight: "35px",
                  width: "200px",
                  //       paddingTop: "10px",
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
            <NavLink to="/absentPerson">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#f48888",
                  //  width: "120px",
                  margin: "30px 20px",
                }}
              >
                <Typography variant="h4" style={{ color: "black", fontWeight: "400" }}>
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
