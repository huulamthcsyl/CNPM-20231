import styled from "@emotion/styled";
import ClassApi from '../../Api/Api'
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "400px",
          "& .MuiInputBase-input": {
            fontSize: "20px",
            padding: "5px",
          },
          padding: "0px",
        },
      },
    },
  },
});
const theme2 = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "250px",
          "& .MuiInputBase-input": {
            fontSize: "20px",
            padding: "5px",
          },
          padding: "0px",
        },
      },
    },
  },
});

function HoSoPage() {
  let Admin = {}
  const [value, setValue] = useState('');
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [cccd, setCccd] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [date, setDate] = useState()
  useEffect(() => {
    ClassApi.GetHoSo(localStorage.getItem('user')).then((response) => {
      Admin = response.data
      console.log(Admin)
      setName(Admin.name)
      setAddress(Admin.address)
      setCccd(Admin.identityCardNumber)
      setPhoneNumber(Admin.phoneNumber)
      const dateObj = new Date(Admin.dateOfBirth);
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObj.getFullYear();

      const formattedDate = '${day}/${month}/${year}';
      setDate(year + '-' + month + '-' + day);
      const gender = (Admin.gender == true) ? 'Nam' : 'Nữ'
      setValue(gender)
    })
  }, []);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value); // Cập nhật giá trị ngày khi người dùng chọn ngày mới
  };
  const handleSend = () => {
    ClassApi.PutHoSo(localStorage.getItem('user'),
      {
        userId: localStorage.getItem('user'), name: name, identityCardNumber: cccd,
        address: address, dateOfBirth: date, gender: (value == 'Nam' ? true : false), phoneNumber: phoneNumber
      }).then(
        (response) => {
          toast.success('thành công')
        }
      ).catch(() => {
        toast.error('lỗi')
      })
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container style={{ padding: "60px ", marginTop: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h2" fontWeight={700}>
            Hồ sơ quản trị viên
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
            <FormControl>
              <FormGroup>
                <Grid
                  container
                  direction="row"
                  wrap="wrap"
                  alignItems="center"
                  paddingTop={2}
                  columnSpacing={10}
                  rowSpacing={1}
                >
                  <Grid item>
                    <Typography variant="h4" fontWeight={400}>
                      Họ và tên
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField value={name} onChange={(e) => { setName(e.target.value) }}></TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  wrap="wrap"
                  alignItems="center"
                  paddingTop={2}
                  columnSpacing={5}
                  rowSpacing={1}
                >
                  <Grid item>
                    <Typography variant="h4" fontWeight={400}>
                      Giới tính
                    </Typography>
                  </Grid>
                  <Grid item>
                    <RadioGroup
                      name="radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                      style={{ display: "inline" }}
                    >
                      <FormControlLabel
                        value="Nam"
                        control={<Radio />}
                        label=<Typography variant="h4" fontWeight={400}>
                          Nam
                        </Typography>
                      />
                      <FormControlLabel
                        value="Nữ"
                        control={<Radio />}
                        label=<Typography variant="h4" fontWeight={400}>
                          Nữ
                        </Typography>
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" fontWeight={400}>
                      Ngày, tháng, năm sinh
                    </Typography>
                  </Grid>
                  <Grid item>

                    <input type="date" value={date} onChange={handleDateChange} style={{ height: '30px', width: '150px' }} />

                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  wrap="wrap"
                  alignItems="center"
                  paddingTop={2}
                  columnSpacing={10}
                  rowSpacing={1}
                >
                  <Grid item>
                    <Typography variant="h4" fontWeight={400}>
                      Địa chỉ&emsp;&ensp;
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField value={address} onChange={(e) => { setAddress(e.target.value) }}></TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  wrap="wrap"
                  alignItems="center"
                  paddingTop={2}
                  columnSpacing={10}
                  rowSpacing={1}
                >
                  <Grid item>
                    <Typography variant="h4" fontWeight={400}>
                      CCCD&emsp;&ensp;&nbsp;
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField value={cccd} onChange={(e) => { setCccd(e.target.value) }}></TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  wrap="wrap"
                  alignItems="center"
                  paddingTop={2}
                  columnSpacing={10}
                  rowSpacing={1}
                >
                  <Grid item>
                    <Typography variant="h4" fontWeight={400}>
                      Điện thoại
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }}></TextField>
                  </Grid>
                </Grid>
              </FormGroup>
            </FormControl>
          </ThemeProvider>
          <Divider style={{ margin: "30px 0px", backgroundColor: "black" }} />
          <ThemeProvider theme={theme2}>
            <FormControl>
              <FormGroup>
                <Typography variant="h4" fontWeight={600}>
                  Đổi mật khẩu
                </Typography>
                <Grid
                  container
                  direction="row"
                  wrap="wrap"
                  alignItems="center"
                  paddingTop={2}
                  columnSpacing={10}
                  rowSpacing={2}
                >
                  <Grid item>
                    <Typography variant="h4" fontWeight={400}>
                      Mật khẩu cũ
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField></TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  wrap="wrap"
                  alignItems="center"
                  paddingTop={2}
                  columnSpacing={8.4}
                  rowSpacing={2}
                >
                  <Grid item>
                    <Typography variant="h4" fontWeight={400}>
                      Mật khẩu mới
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField></TextField>
                  </Grid>

                  <Grid item>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        fontWeight={400}
                        marginRight="30px"
                      >
                        Xác nhận mật khẩu mới
                      </Typography>

                      <TextField></TextField>
                    </div>
                  </Grid>
                </Grid>
                <NavLink to="./">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
                    onClick={handleSend}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={500}
                      style={{ color: "black" }}
                    >
                      Xác nhận
                    </Typography>
                  </Button>
                </NavLink>
              </FormGroup>
            </FormControl>
          </ThemeProvider>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default HoSoPage;
