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
import { useState } from "react";

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
  return (
    <Grid container spacing={1} style={{ padding: "50px" }}>
      <ThemeProvider theme={theme}>
        <Grid item xs={12}>
          <Typography variant="h1" fontSize={48}>
            Thêm cư dân mới
          </Typography>
        </Grid>
        <Grid item container xs={12} alignItems="center" wrap="wrap">
          <Grid item xs={2.5}>
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
          <Grid item container xs={6}>
            <Grid item>
              <Typography variant="h4">Giới tính</Typography>
            </Grid>
            <Grid item></Grid>
            <Grid item></Grid>
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
                onChange={handleChange}
              >
                <MenuItem value={1}>
                  <Typography variant="h5">Ở</Typography>
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
      </ThemeProvider>
    </Grid>
  );
}

export default ThemCuDan;
