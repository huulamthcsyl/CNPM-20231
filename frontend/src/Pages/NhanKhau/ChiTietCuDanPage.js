import {
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import ButtonSearch from "../../Layout/component/ButtonSearch";
import { NavLink, useParams } from "react-router-dom";
import ClassApi from '../../Api/Api'
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import styled from "@emotion/styled";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { toast } from "react-toastify";

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
  .MuiInputLabel-root {
    font-size: 20px;
  }
`;
function ThemCuDan() {
  const [person, setPerson] = useState({
    name: "Nguyễn Văn A",
    gender: true,
    status: "Thường trú",
    dateOfBirth: "2021-05-04T00:00:00",
    province: "Hà Nội",
    district: "Quận Hai Bà Trưng",
    village: "Phường Bách Khoa",
    phoneNumber: '0123456789',
    identityCardNumber: '189931832'
  });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [status, setStatus] = useState(person.status);
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const [gender, setGender] = useState(person.gender);
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const [province, setProvince] = useState(person.province);
  const [birth, setBirth] = useState(dayjs('2021-05-04T00:00:00'))
  const [addr, setAddr] = useState('')
  const handleChange2 = (event) => {
    setProvince(event.target.value);
    setVillages([])
  };
  const [district, setDistrict] = useState(person.district);

  const handleChange3 = (event) => {
    setDistrict(event.target.value);

  };
  const [village, setVillage] = useState(person.village);

  const handleChange4 = (event) => {
    setVillage(event.target.value);
  };
  const [name, setName] = useState(person.name);
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const [phoneNumber, setPhoneNumber] = useState(person.phoneNumber)
  const [cccd, setCccd] = useState(person.identityCardNumber)
  const param = useParams()
  useEffect(() => {
    ClassApi.GetInfoPerson(param.id).then((response) => {
      setName(response.data.name)
      setGender(response.data.gender)
      setCccd(response.data.identityCardNumber)
      setStatus(response.data.status)
      setBirth(dayjs(response.data.dateOfBirth))
      setPhoneNumber(response.data.phoneNumber)
      let address = response.data.homeTown.split(',')
      setProvince(address[2].trim())
      setAddr(address)
    })
  }, [])
  const handleChangeInfo = () => {
    ClassApi.PutPerson({
      "personId": param.id,
      "name": name,
      "dateOfBirth": birth,
      "identityCardNumber": cccd,
      "gender": gender,
      "phoneNumber": phoneNumber,
      "homeTown": village + ', ' + district + ', ' + province,
      "status": status
    }).then(() => {
      toast.success('Sửa thông tin thành công')
    }).catch(() => {
      toast.error('Lỗi')
    })
  }
  useEffect(() => {

    axios.get(API_ADDRESS + "api/?depth=1")
      .then(response => {
        setProvinces(response.data);
      });
  }, []);
  useEffect(() => {
    if (province) {
      axios.get(API_ADDRESS + 'api/p/search/?q=' + province).then((res) => {
        // console.log(provin)
        axios.get(API_ADDRESS + "api/p/" + (res.data)[0].code + "?depth=2")
          .then(response => {
            setDistricts(response.data.districts);
            //  setDistrict(addr[1].trim())

          }).finally(() => {
            if (addr) {
              setDistrict(addr[1].trim())
            }
          })
      })
    }
  }, [province]);
  useEffect(() => {
    if (district) {
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.get(API_ADDRESS + 'api/d/search/?q=' + district).then((res) => {
        axios.get(API_ADDRESS + "api/d/" + (res.data)[0].code + "?depth=2")
          .then(response => {
            setVillages(response.data.wards);

          }).finally(() => {
            if (addr) {
              setVillage(addr[0].trim())
            }
          });
      })

    }
  }, [district]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={1} style={{ padding: "50px" }}>
        <ThemeProvider theme={theme}>
          <Grid item xs={12}>
            <Typography variant="h1" fontSize={48}>
              Chi tiết cư dân
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            wrap="wrap"
          //        columnSpacing={8}
          >
            <Grid item xs={2.5}>
              <Typography variant="h4">Họ và tên</Typography>
            </Grid>
            <Grid item>
              <TextField onChange={handleChangeName} value={name}></TextField>
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
            <Grid item container xs={6} wrap="nowrap" alignItems="center">
              <Grid item xs={5}>
                <Typography variant="h4">Giới tính</Typography>
              </Grid>
              <RadioGroup
                name="radio-buttons-group"
                value={gender}
                onChange={(e) => { setGender(e.target.value) }}
                style={{ display: "inline" }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label=<Typography variant="h4" fontWeight={400}>
                    Nam
                  </Typography>
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label=<Typography variant="h4" fontWeight={400}>
                    Nữ
                  </Typography>
                />
              </RadioGroup>
            </Grid>
            <Grid item container alignItems="center" xs={6} spacing={2}>
              <Grid item>
                <Typography variant="h4">Trạng thái cư trú</Typography>
              </Grid>
              <Grid item style={{ bottom: "7px", position: "relative" }}>
                <InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
                {status == 'Tạm Vắng' ?
                  <Select
                    labelId="demo-select-small-label"
                    value="Tạm Vắng"
                    style={{ width: "200px" }}
                    placeholder="trang thai"
                    onChange={handleChange}
                    disabled
                  >
                    <MenuItem value="Tạm Vắng">
                      <Typography variant="h5">Tạm vắng</Typography>
                    </MenuItem>

                  </Select> :
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

                  </Select>}

              </Grid>
            </Grid>
          </Grid>
          <Grid item container wrap="wrap" alignItems="center">
            <Grid item xs={2.5}>
              <Typography variant="h4">Ngày, tháng, năm sinh</Typography>
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
                onChange={(value) => { setBirth(value) }}

              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Quê quán </Typography>
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
                <Typography variant="h4">Tỉnh (Thành phố)</Typography>
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
                      <MenuItem value={provinc.name} key={index}>
                        <Typography variant="h5">{provinc.name}</Typography>
                      </MenuItem>
                    ))
                  }
                </Select>
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              container
              wrap="nowrap"
              alignItems="center"
              spacing={3}
            >
              <Grid item >
                <Typography variant="h4" >Huyện (Quận)</Typography>
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
                    <MenuItem value={distric.name} key={index}>
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
          //     spacing={3}
          >
            <Grid item xs={2.5}>
              <Typography variant="h4">Xã (Phường)</Typography>
            </Grid>
            <Grid item style={{ bottom: "7px", position: "relative" }}>
              <InputLabel id="select-village">Xã (phường)</InputLabel>
              <Select
                labelId="select-village"
                value={village}
                style={{ width: "280px" }}
                onChange={handleChange4}
              >
                {villages.map((villag, index) => (
                  <MenuItem value={villag.name} key={index}>
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
          //     columnSpacing={12}
          >
            <Grid item xs={2.5}>
              <Typography variant="h4">CCCD</Typography>
            </Grid>
            <Grid item>
              <TextField value={cccd} onChange={(e) => { setCccd(e.target.value) }}></TextField>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            wrap="wrap"
          //        columnSpacing={3}
          >
            <Grid item xs={2.5}>
              <Typography variant="h4">Số điện thoại</Typography>
            </Grid>
            <Grid item>
              <TextField value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }}></TextField>
            </Grid>
          </Grid>
          <Grid xs={2}>

            <ButtonSearch title="Xác nhận" border="none" onclick={handleChangeInfo}></ButtonSearch>

          </Grid>
          <Grid>
            <NavLink to="/nhankhau">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#f48888",
                  //  width: "120px",
                  margin: "30px 0px",
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

export default ThemCuDan;
