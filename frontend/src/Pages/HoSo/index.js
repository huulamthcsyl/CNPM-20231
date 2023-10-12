import styled from "@emotion/styled";
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
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { NavLink } from "react-router-dom";

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
  const [value, setValue] = useState("Nam");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
                    <TextField></TextField>
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
                    <DatePicker />
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
                    <TextField></TextField>
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
                    <TextField></TextField>
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
                    <TextField></TextField>
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
                    <Typography variant="h4" fontWeight={400}>
                      Xác nhận mật khẩu mới
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField></TextField>
                  </Grid>
                </Grid>
              </FormGroup>
            </FormControl>
          </ThemeProvider>
          <NavLink to="./">
            <Button
              variant="contained"
              style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
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
