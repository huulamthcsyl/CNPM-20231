import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import ButtonAdd from "../../Layout/component/ButtonAdd";
import ButtonSearch from "../../Layout/component/ButtonSearch";

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
          padding: "0px 30px",
          width: "300px",
          "& .MuiInputBase-input": {
            fontSize: "20px",
            padding: "5px",
          },
        },
      },
    },
  },
});
const tableHead = [
  { name: "Số thứ tự" },
  { name: "Tên chủ hộ" },
  { name: "Nơi thường trú" },
  { name: "Số nhân khẩu" },
  { name: "Ghi chú" },
];
const info = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
function HoKhau() {
  return (
    <Grid container spacing={2} style={{ padding: "50px" }}>
      <ThemeProvider theme={theme}>
        <Grid xs={12}>
          <h1 style={{ fontSize: "48px", paddingLeft: "16px" }}>
            Danh sách hộ dân
          </h1>
        </Grid>
        <Grid item xs={12}>
          <ButtonAdd to="/themhodan" title="Thêm hộ dân"></ButtonAdd>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Tìm kiếm</Typography>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h4">Tên chủ hộ</Typography>
            <TextField></TextField>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Nơi thường trú</Typography>
              <TextField></TextField>
            </div>
            <ButtonSearch title="Tìm kiếm"></ButtonSearch>
          </div>
        </Grid>
      </ThemeProvider>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {tableHead.map((col, index) => (
                  <TableCell key={index}>
                    <Typography
                      variant="h4"
                      style={{ fontWeight: "bold" }}
                      padding={0}
                    >
                      {col.name}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {info.map((colume, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography
                      variant="h5"
                      style={{ fontWeight: "500" }}
                      padding={0}
                    >
                      {index}
                    </Typography>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Typography
                      variant="h5"
                      style={{ fontWeight: "500" }}
                      padding={0}
                      color="#3454FC"
                    >
                      Chi tiết
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default HoKhau;
