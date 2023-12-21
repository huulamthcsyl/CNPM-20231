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
      "absent": {
        "absentPersonId": "3f380bb3-a6c7-48be-9cf0-617b999e31e1",
        "personId": "dbbaf13c-def6-428d-bee9-ec2f00e93e4e",
        "startTime": "2023-12-20T17:00:00",
        "endTime": "2023-12-24T17:00:00",
        "reason": "abc"
      },
      "person": {
        "personId": "dbbaf13c-def6-428d-bee9-ec2f00e93e4e",
        "residenceId": null,
        "name": "Phùng Thanh Đăng",
        "dateOfBirth": "2023-12-01T10:00:00",
        "identityCardNumber": "123456789",
        "gender": false,
        "phoneNumber": "546321",
        "homeTown": "Xã Văn Tiến, Huyện Yên Lạc, Tỉnh Vĩnh Phúc",
        "ownerRelationship": null,
        "status": "Tạm Vắng"
      }
    },
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
                      <NavLink to={"/chitietcudan/" + peop.person.personId}>
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
