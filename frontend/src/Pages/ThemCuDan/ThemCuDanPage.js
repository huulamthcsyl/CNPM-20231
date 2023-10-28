import {
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
const API_ADDRESS = 'https://vn-public-apis.fpo.vn/';
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
function ThemCuDan() {
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const [province, setProvince] = useState("");

  const handleChange2 = (event) => {
    setProvince(event.target.value);
  };
  const [district, setDistrict] = useState(null);

  const handleChange3 = (event) => {
    setDistrict(event.target.value);
  };
  const [village, setVillage] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  useEffect(() => {
    axios.get(API_ADDRESS + "provinces/getAll?limit=-1")
      .then(response => {
        setProvinces(response.data.data.data);
      });
  }, []);
  useEffect(() => {
    if (province) {
      axios.get(API_ADDRESS + "districts/getByProvince?provinceCode=" + province.code + "&limit=-1")
        .then(response => {
          setDistricts(response.data.data.data);
        });
    }
  }, [province]);
  const handleChange4 = (event) => {
    setVillage(event.target.value);
  };
  useEffect(() => {
    if (district) {
      axios.get(API_ADDRESS + "wards/getByDistrict?districtCode=" + district.code + "&limit=-1")
        .then(response => {
          setVillages(response.data.data.data);
        });
    }
  }, [district]);
  return (
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
          columnSpacing={8}
        >
          <Grid item xs="auto">
            <Typography variant="h4">Họ và tên</Typography>
          </Grid>
          <Grid item>
            <TextField></TextField>
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
            <Grid item xs={3}>
              <Typography variant="h4">Giới tính</Typography>
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
              <Typography variant="h4">Trạng thái cư trú</Typography>
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
                <MenuItem value={1}>
                  <Typography variant="h5">Thường trú</Typography>
                </MenuItem>
                <MenuItem value={2}>
                  <Typography variant="h5">Tạm vắng</Typography>
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container wrap="wrap" alignItems="center">
          <Grid item style={{ marginRight: "30px" }}>
            <Typography variant="h4">Ngày, tháng, năm sinh</Typography>
          </Grid>
          <Grid item>
            <input
              type="date"
              style={{ width: "200px", height: "35px" }}
            ></input>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Quê quán </Typography>
        </Grid>
        <Grid item container wrap="wrap" columnSpacing={8}>
          <Grid
            item
            container
            xs="auto"
            wrap="nowrap"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
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
              <Typography variant="h4">Huyện (Quận)</Typography>
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
          xs="auto"
          container
          wrap="nowrap"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
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
          columnSpacing={12}
        >
          <Grid item xs="auto">
            <Typography variant="h4">CCCD</Typography>
          </Grid>
          <Grid item>
            <TextField></TextField>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          wrap="wrap"
          columnSpacing={3}
        >
          <Grid item xs="auto">
            <Typography variant="h4">Số điện thoại</Typography>
          </Grid>
          <Grid item>
            <TextField></TextField>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <NavLink to="/nhankhau">
            <ButtonSearch title="Xác nhận" border="none"></ButtonSearch>
          </NavLink>
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}

export default ThemCuDan;
