import {
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import ButtonSearch from "../../Layout/component/ButtonSearch";
import { NavLink } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import styled from "@emotion/styled";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
            padding: "5px",
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
            columnSpacing={8}
          >
            <Grid item xs={2}>
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
          </Grid>
          <Grid item container wrap="wrap" alignItems="center">
            <Grid item style={{ marginRight: "30px" }}>
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
              />
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
            <Grid item xs={1.8}>
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
            <Grid item xs={2}>
              <Typography variant="h4">Số điện thoại</Typography>
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
            <Grid item xs={2}>
              <Typography variant="h4">Nơi thường trú</Typography>
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
            <Grid item xs={2}>
              <Typography variant="h4">Nơi tạm trú</Typography>
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
            <Grid item xs={2}>
              <Typography variant="h4">Thời gian</Typography>
            </Grid>
            <Grid item>
              <CustomizedDatePicker
                label="Từ ngày"
                slotProps={{ textField: { variant: "filled" } }}
                sx={{ marginRight: "35px", width: "200px", paddingTop: "10px" }}
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
              />
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
            <Grid item xs={2}>
              <Typography variant="h4">Lý do</Typography>
            </Grid>
            <Grid item>
              <TextField></TextField>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <NavLink to="/tamvang">
              <ButtonSearch title="Xác nhận" border="none"></ButtonSearch>
            </NavLink>
          </Grid>
        </ThemeProvider>
      </Grid>
    </LocalizationProvider>
  );
}

export default DangKyTamVangPage;
