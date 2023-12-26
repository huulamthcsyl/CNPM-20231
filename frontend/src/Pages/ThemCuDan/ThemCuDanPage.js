import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import ButtonSearch from "../../Layout/component/ButtonSearch";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ClassApi from "../../Api/Api";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { startOfDay } from "date-fns";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import './date.css'
const API_ADDRESS = 'https://provinces.open-api.vn/';
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
            padding: "5px",
          },
        },
      },
    },
  },
});
const CustomizedDatePicker = styled(DatePicker)`
  & .MuiInputBase-input {
    font-size: 18px;
    width: 150px;
    height: 40px;
  }
  & .MuiInputLabel-root {
    font-size: 20px;
  },
  & .MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-dayWithMargin.css-1u23akw-MuiButtonBase-root-MuiPickersDay-root {
    font-size:14px;
  },
 
`;
function ThemCuDan() {
  const [birth, setBirth] = useState()
  const addPerson = () => {
    var gender = true;

    var radioElement = document.getElementById("radio1");
    var radioElement2 = document.getElementById("radio2");

    if (radioElement.checked) {
    } else {
      gender = false
    }
    var dateBirthElement = document.getElementById('datebirth')
    var namePerson = document.getElementById('name')
    var identityCardNumber = document.getElementById('cccd')
    var phoneNumber = document.getElementById('phoneNumber')
    if (namePerson.value == null || namePerson.value == '') {
      toast.warn('Hãy nhập họ và tên!')
      return
    }
    if (!radioElement.checked && !radioElement2.checked) {
      toast.warn('Hãy chọn giới tính!')
      return
    }
    if (status == null || status == '') {
      toast.warn('Hãy chọn trạng thái cư trú!')
      return
    }
    if (birth == null || birth == '') {
      toast.warn('Hãy chọn ngày sinh!')
      return
    }
    if (province == null || province == '') {
      toast.warn('Hãy chọn tỉnh thành!')
      return
    }
    if (district == null || district == '') {
      toast.warn('Hãy chọn quận huyện!')
      return
    }
    if (village == null || village == '') {
      toast.warn('Hãy chọn xã-phường!')
      return
    }
    // const updatedDate = dayjs(birth).add(7, 'hour');
    const person = {
      "residenceId": null, "name": namePerson.value,
      "dateOfBirth": dayjs(birth).add(7, 'hour'),
      "identityCardNumber": identityCardNumber.value,
      "gender": gender,
      "phoneNumber": phoneNumber.value,
      "homeTown": village.name + ', ' + district.name + ', ' + province.name,
      "ownerRelationship": null,
      "status": status
    }
    // console.log(person)
    const headers = {
      'access-control-allow-origin': '*',
      'content-type': 'application/json; charset=utf-8 '
    }
    ClassApi.PostPerson(person).then((response) => {
      console.log(person)
      toast.success('thêm thành công')
      // console.log(response.data)
    }).catch((error) => {
      toast.error('thêm thất bại')
      console.error('Error fetching data:', error);
    });
  }
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const [province, setProvince] = useState("");

  const handleChange2 = (event) => {
    setProvince(event.target.value);
    setVillages([])
  };
  const [district, setDistrict] = useState(null);

  const handleChange3 = (event) => {
    setDistrict(event.target.value);
  };
  const [village, setVillage] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const headers = {
    'Access-Control-Allow-Origin': '*'
  };
  useEffect(() => {

    axios.get(API_ADDRESS + "api/?depth=1")
      .then(response => {
        setProvinces(response.data);
      });
  }, []);
  useEffect(() => {
    if (province) {

      axios.get(API_ADDRESS + "api/p/" + province.code + "?depth=2")
        .then(response => {
          setDistricts(response.data.districts);
        });
    }
  }, [province]);
  const handleChange4 = (event) => {
    setVillage(event.target.value);
  };
  useEffect(() => {
    if (district) {
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.get(API_ADDRESS + "api/d/" + district.code + "?depth=2")
        .then(response => {
          setVillages(response.data.wards);
        });
    }
  }, [district]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DemoContainer components={['DateField', 'DatePicker']}>
        <Grid container spacing={1} style={{ padding: "50px" }}>
          <ThemeProvider theme={theme}>
            <Grid item xs={12}>
              <Typography variant="h1" fontSize={48}>
                Thêm cư dân mới
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={12}
              alignItems="center"
              wrap="wrap"
            //   columnSpacing={8}
            >
              <Grid item xs={2.5}>
                <Typography variant="h4">Họ và tên<span style={{ color: 'red' }}> *</span></Typography>
              </Grid>
              <Grid item>
                <TextField id='name'></TextField>
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
              <Grid item container xs={6} wrap="nowrap">
                <Grid item xs={5}>
                  <Typography variant="h4">Giới tính<span style={{ color: 'red' }}> *</span></Typography>
                </Grid>
                <Grid item alignItems="center">
                  <input
                    id="radio1"
                    type="radio"
                    name="gender"
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
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
                    id="radio2"
                    type="radio"
                    name="gender"
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                  ></input>
                  <label
                    htmlFor="radio2"
                    style={{ fontSize: "24px", margin: "0px 12px" }}
                  >
                    Nữ
                  </label>
                </Grid>
              </Grid>
              <Grid item container alignItems="center" xs={6} spacing={2}>
                <Grid item>
                  <Typography variant="h4">Trạng thái cư trú<span style={{ color: 'red' }}> *</span></Typography>
                </Grid>
                <Grid item style={{ bottom: "7px", position: "relative" }}>
                  <InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    value={status}
                    style={{ width: "200px" }}
                    placeholder="trang thai"
                    onChange={handleChange}
                  >
                    <MenuItem value="Thường trú">
                      <Typography variant="h5">Thường trú</Typography>
                    </MenuItem>
                    <MenuItem value="Tạm trú">
                      <Typography variant="h5">Tạm trú</Typography>
                    </MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container wrap="wrap" alignItems="center">
              <Grid item xs={2.5}>
                <Typography variant="h4">Ngày, tháng, năm sinh<span style={{ color: 'red' }}> *</span></Typography>
              </Grid>
              <Grid item>
                <CustomizedDatePicker
                  // slotProps={{ textField: { variant: "filled" } }}

                  sx={{
                    marginRight: "35px",
                    width: "200px",
                    paddingTop: "10px",

                  }}
                  value={birth}
                  onChange={(value) => {

                    setBirth(value); console.log(value);
                  }}
                  format="DD-MM-YYYY"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">Quê quán <span style={{ color: 'red' }}> *</span></Typography>
            </Grid>
            <Grid item container wrap="wrap" >
              <Grid
                item
                container
                xs={6}
                wrap="nowrap"
                alignItems="center"
              //  spacing={3}
              >
                <Grid item xs={5}>
                  <Typography variant="h4">Tỉnh (Thành phố)<span style={{ color: 'red' }}> *</span></Typography>
                </Grid>
                <Grid item style={{ bottom: "7px", position: "relative" }}>
                  <InputLabel id="select-province">Tỉnh (thành phố)</InputLabel>
                  <Select
                    labelId="select-province"
                    value={province}
                    style={{ width: "150px" }}
                    onChange={handleChange2}
                  >
                    {
                      provinces.map((provinc, index) => (
                        <MenuItem value={provinc} key={index}>
                          <Typography variant="h5">{provinc.name}</Typography>
                        </MenuItem>
                      ))
                    }


                  </Select>
                </Grid>
              </Grid>
              <Grid
                item
                xs="auto"
                container
                wrap="nowrap"
                alignItems="center"
                spacing={3}
              >
                <Grid item>
                  <Typography variant="h4">Huyện (Quận)<span style={{ color: 'red' }}> *</span></Typography>
                </Grid>
                <Grid item style={{ bottom: "7px", position: "relative" }}>
                  <InputLabel id="select-district">Huyện (quận)</InputLabel>
                  <Select
                    labelId="select-district"
                    value={district}
                    style={{ width: "250px" }}
                    onChange={handleChange3}
                  >
                    {districts.map((distric, index) => (
                      <MenuItem value={distric} key={index}>
                        <Typography variant="h5">{distric.name}</Typography>
                      </MenuItem>
                    ))}


                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              wrap="nowrap"
              alignItems="center"
            //    spacing={3}
            >
              <Grid item xs={2.5}>
                <Typography variant="h4">Xã (Phường)<span style={{ color: 'red' }}> *</span></Typography>
              </Grid>
              <Grid item style={{ bottom: "7px", position: "relative" }} >
                <InputLabel id="select-village">Xã (phường)</InputLabel>
                <Select
                  labelId="select-village"
                  value={village}
                  style={{ width: "280px" }}
                  onChange={handleChange4}
                >
                  {villages.map((villag, index) => (
                    <MenuItem value={villag} key={index}>
                      <Typography variant="h5">{villag.name}</Typography>
                    </MenuItem>
                  ))}


                </Select>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              alignItems="center"
              wrap="wrap"
            //    columnSpacing={12}
            >
              <Grid item xs={2.5}>
                <Typography variant="h4">CCCD</Typography>
              </Grid>
              <Grid item>
                <TextField id="cccd"></TextField>
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
              <Grid item xs={2.5}>
                <Typography variant="h4">Số điện thoại</Typography>
              </Grid>
              <Grid item>
                <TextField id='phoneNumber'></TextField>
              </Grid>
            </Grid>
            <Grid item xs={12}>

              <ButtonSearch title="Xác nhận" border="none" onclick={addPerson}></ButtonSearch>
              <NavLink to="/nhankhau">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#f48888",
                    //  width: "120px",
                    margin: "30px 30px",
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
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default ThemCuDan;
