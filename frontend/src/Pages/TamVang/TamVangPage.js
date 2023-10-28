import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import ButtonAdd from "../../Layout/component/ButtonAdd";
import src from "../../Icons/HoSo.png";
import ButtonSearch from "../../Layout/component/ButtonSearch";
import { NavLink } from "react-router-dom";
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
const headTable = [
  "Số thứ tự",
  "Họ và tên",
  "Ngày, tháng, năm sinh",
  "Số CCCD",
  "",
];
const people = [
  {
    name: "Nguyen Van A",
    datebirth: "01/01/1970",
    cccd: "0123456789",
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];
function TamVangPage() {
  return (
    <Grid container spacing={1} style={{ padding: "50px" }}>
      <ThemeProvider theme={theme}>
        <Grid item xs={12}>
          <Typography variant="h1" fontSize={48} fontWeight="600">
            Danh sách tạm vắng
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonAdd
            title="Đăng ký tạm vắng"
            icon={src}
            to="/dangkytamvang"
          ></ButtonAdd>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Tìm kiếm</Typography>
        </Grid>
        <Grid item container xs={12} alignContent="center" alignItems="center">
          <Grid item>
            <Typography variant="h4">Tên</Typography>
          </Grid>
          <TextField></TextField>
          <ButtonSearch title="Tìm kiếm"></ButtonSearch>
        </Grid></ThemeProvider>
      <Grid item xs={12}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {headTable.map((item, index) => (
                  <TableCell key={index}>
                    <Typography variant="h5">{item}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {people.map((peop, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="h5">{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">{peop.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">{peop.datebirth}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">{peop.cccd}</Typography>
                  </TableCell>
                  <TableCell>
                    {
                      <NavLink to="/chitietcudan">
                        <button
                          style={{
                            backgroundColor: "transparent",
                            color: "blue",
                            textDecoration: "underline",
                          }}
                        >
                          Chi tiết
                        </button>
                      </NavLink>
                    }
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

export default TamVangPage;
