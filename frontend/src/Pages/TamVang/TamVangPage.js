import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import ButtonAdd from "../../Layout/component/ButtonAdd";
import src from "../../Icons/HoSo.png";
import ButtonSearch from "../../Layout/component/ButtonSearch";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ClassApi from '../../Api/Api'
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

function TamVangPage() {
  const [name, setName] = useState('')
  const [people, setPeople] = useState([
    {
      "absentPersonId": "1441a1ca-a444-472b-b209-1c6fe13170c9",
      "personId": "821cec81-33c9-45d9-819e-536f9a8e32b2",
      "startTime": "2023-12-12T17:00:00",
      "endTime": "2023-12-24T17:00:00",
      "reason": "ốm",
      "person": {
        "personId": "821cec81-33c9-45d9-819e-536f9a8e32b2",
        "residenceId": null,
        "name": "hoang",
        "dateOfBirth": "2021-05-04T00:00:00",
        "identityCardNumber": "232342432",
        "gender": true,
        "phoneNumber": "432432423432",
        "homeTown": "Xã Ngam La, Huyện Yên Minh, Tỉnh Hà Giang",
        "ownerRelationship": null,
        "status": "Tạm Vắng"
      }
    },
    {},

  ]);
  useEffect(() => {
    ClassApi.GetAllAbsent().then((response) => {
      setPeople(response.data)
    })
  }, [])
  const handleFind = () => {
    if (name.length > 0) {
      ClassApi.FindAbsent(name).then((response) => {
        setPeople(response.data)
      })
    }
  }
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
          <TextField value={name} onChange={(e) => { setName(e.target.value) }}></TextField>
          <ButtonSearch title="Tìm kiếm" onclick={handleFind}></ButtonSearch>
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
                    <Typography variant="h5">{peop.person ? peop.person.name : ''}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">{peop.person ? peop.person.dateOfBirth : ''}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">{peop.person ? peop.person.identityCardNumber : ''}</Typography>
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

export default TamVangPage;
