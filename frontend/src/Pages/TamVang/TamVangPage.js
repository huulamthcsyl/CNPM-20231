import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
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
        "absentPersonId": "",
        "personId": "",
        "startTime": "",
        "endTime": "",
        "reason": ""
      },
      "person": {
        "personId": "",
        "residenceId": null,
        "name": "",
        "dateOfBirth": "",
        "identityCardNumber": "",
        "gender": false,
        "phoneNumber": "",
        "homeTown": "",
        "ownerRelationship": null,
        "status": ""
      }
    },
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    ClassApi.GetAllAbsent().then((response) => {
      setPeople(response.data)
    })
  }, [])
  const handleFind = () => {
    setPage(0)
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
              {people &&
                (rowsPerPage > 0
                  ? people.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : people
                ).map(
                  (peop, index) =>
                    peop &&
                    peop.personId !== null && (
                      <TableRow key={index}>
                        <TableCell >
                          <Typography variant="h5">{page * rowsPerPage + index + 1}</Typography>
                        </TableCell>
                        <TableCell style={{ width: '300px' }}>
                          <Typography variant="h5">{peop.person ? peop.person.name : ''}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h5" style={{ width: '200px' }}>{peop.person ? peop.person.dateOfBirth.substring(8, 10) + '/' + peop.person.dateOfBirth.substring(5, 7) + '/' + peop.person.dateOfBirth.substring(0, 4) : ''}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h5" style={{ width: '200px' }}>{peop.person ? peop.person.identityCardNumber : ''}</Typography>
                        </TableCell>
                        <TableCell>
                          {
                            <NavLink to={"/chitiettamvang/" + peop.absent.absentPersonId}>
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
            <tfoot>
              <tr>
                <TablePagination
                  rowsPerPageOptions={[5, 8, 10, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={people.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      "aria-label": "rows per page",
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    "& .MuiTablePagination-input": {
                      fontSize: "16px",
                    },
                    "& .MuiTablePagination-displayedRows": {
                      fontSize: "16px",
                    },
                    "& .MuiTablePagination-selectLabel": {
                      fontSize: "16px",
                    },
                  }}
                />
              </tr>
            </tfoot>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default TamVangPage;
