import {
  Grid,
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
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ClassApi from "../../Api/Api"
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
    dateOfBirth
      : "01/01/1970",
    identityCardNumber: "0123456789",
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},

];


function NhanKhau() {
  const [allPeople, setAllPeople] = useState([])
  const [person, setPerson] = useState('')
  const searchPerson = () => {
    if (person.length > 0) {
      ClassApi.GetPerson(person).then((response) => {
        setAllPeople(response.data)
      })
    } else {
      ClassApi.GetAllPeople().then((respone) => {
        setAllPeople(respone.data);

      }).catch((error) => {
        console.error('Error fetching data:', error);
      });

    }

  }
  useEffect(() => {
    ClassApi.GetAllPeople().then((respone) => {
      setAllPeople(respone.data);

    }).catch((error) => {
      console.error('Error fetching data:', error);
    });

  }, [])
  return (
    <Grid container spacing={1} style={{ padding: "50px" }}>
      <ThemeProvider theme={theme}>
        <Grid item xs={12}>
          <Typography variant="h1" fontSize={48} fontWeight={600}>
            Danh sách cư dân
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonAdd to="/themcudan" title="Thêm cư dân"></ButtonAdd>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Tìm kiếm</Typography>
        </Grid>
        <Grid item container xs={12} alignContent="center" alignItems="center">
          <Grid item>
            <Typography variant="h4">Tên</Typography>
          </Grid>
          <TextField value={person} onChange={e => { setPerson(e.target.value) }}></TextField>
          <ButtonSearch title="Tìm kiếm" onclick={searchPerson}></ButtonSearch>
        </Grid>
      </ThemeProvider>
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
              {allPeople.map((peop, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="h5">{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">{peop.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">{new Date(peop.dateOfBirth).toLocaleDateString()}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">{peop.identityCardNumber}</Typography>
                  </TableCell>
                  <TableCell>
                    {
                      <NavLink to={"/chitietcudan/" + peop.personId}>
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

export default NhanKhau;
