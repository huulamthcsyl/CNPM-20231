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
import ClassApi from "../../Api/Api";
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
function ThemCuDan() {

  const addPerson = () => {
    var gender = true;
    var radioElement = document.getElementById("radio1");
    if (radioElement.checked) {
    } else {
      gender = false
    }
    var dateBirthElement = document.getElementById('datebirth')
    var namePerson = document.getElementById('name')
    var identityCardNumber = document.getElementById('cccd')
    var phoneNumber = document.getElementById('phoneNumber')

    const person = {
      "residenceId": null, "name": namePerson.value,
      "dateOfBirth": dateBirthElement.value,
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
          <Grid item style={{ marginRight: "30px" }}>
            <Typography variant="h4">Ngày, tháng, năm sinh</Typography>
          </Grid>
          <Grid item>
            <input
              id="datebirth"
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
            <TextField id="cccd"></TextField>
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
            <TextField id='phoneNumber'></TextField>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <NavLink to="#">
            <ButtonSearch title="Xác nhận" border="none" onclick={addPerson}></ButtonSearch>
          </NavLink>
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}

export default ThemCuDan;
