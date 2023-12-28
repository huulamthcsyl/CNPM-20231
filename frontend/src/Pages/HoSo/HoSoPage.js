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
import dayjs from "dayjs";
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
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cccd, setCccd] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [date, setDate] = useState();

  const CustomizedDatePicker = styled(DatePicker)`
  & .MuiInputBase-input {
    font-size: 18px;
    width: 445px;
  }
  & .MuiInputLabel-root {
    font-size: 20px;
  }
  margin-left: 30px;
`;

  useEffect(() => {
    ClassApi.GetHoSo(localStorage.getItem('user')).then((response) => {
      Admin = response.data
      console.log(Admin)
      setName(Admin.name)
      setAddress(Admin.address)
      setCccd(Admin.identityCardNumber)
      setPhoneNumber(Admin.phoneNumber)

      // const dateObj = new Date(Admin.dateOfBirth);
      // const day = dateObj.getDate().toString().padStart(2, '0');
      // const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      // const year = dateObj.getFullYear();

      // const formattedDate = `${day}/${month}/${year}`;
      // setDate(year + '-' + month + '-' + day);

      setDate(dayjs(Admin.dateOfBirth))
      const gender = (Admin.gender == true) ? 'Nam' : 'Nữ'
      setValue(gender)
    })
  }, []);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  // const handleDateChange = (e) => {
  //   setDate(e.target.value); // Cập nhật giá trị ngày khi người dùng chọn ngày mới
  // };
  const handleSend = () => {
    var dateCreatedJson = new Date(date);
    dateCreatedJson.setDate(dateCreatedJson.getDate() + 1);
    dateCreatedJson = dateCreatedJson.toISOString();

    ClassApi.PutHoSo(localStorage.getItem('user'),
      {
        userId: localStorage.getItem('user'), name: name, identityCardNumber: cccd,
        address: address, dateOfBirth: dateCreatedJson, gender: (value == 'Nam' ? true : false), phoneNumber: phoneNumber
      }).then(
        (response) => {
          toast.success('Sửa thông tin thành công')
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
                    <Typography variant="h4" fontWeight={400} style={{ marginRight: "50px" }}>
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
                  {/* <Grid item>
                    <Typography variant="h4" fontWeight={400}>
                      Ngày, tháng, năm sinh
                    </Typography>
                  </Grid>
                  <Grid item>
                    <input User
                      type="date"
                      value={date}
                      onChange={handleDateChange}
                      style={{ height: '30px', width: '150px' }}
                      pattern="\d{1,2}/\d{1,2}/\d{4}"
                    />
                  </Grid> */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item container direction="row" alignItems="center">
                      <Typography variant="h4" fontWeight={400}>
                        Ngày, tháng, năm sinh
                      </Typography>
                      <CustomizedDatePicker
                        style={{ height: '30px', width: '150px' }}
                        value={date}
                        //onChange={handleDateChange}
                        onChange={(date) => setDate(date)}
                        format="DD-MM-YYYY"
                      ></CustomizedDatePicker>
                    </Grid>
                  </LocalizationProvider>

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
        </Grid>

        <Grid item xs={2}>
          <NavLink to="/doimatkhau">
            <Button
              variant="contained"
              style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
            >
              <Typography
                variant="h5"
                fontWeight={500}
                style={{ color: "black" }}
              >
                Đổi mật khẩu
              </Typography>
            </Button>
          </NavLink>
        </Grid>

        <Grid item xs={2}>
          <NavLink to="./">
            <Button
              variant="contained"
              style={{ backgroundColor: "#79C9FF", margin: "30px 30px" }}
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
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default HoSoPage;
