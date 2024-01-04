import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
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
import ClassAPi from '../../Api/Api'
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
function HoKhau() {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    ClassAPi.GetResidences().then((response) => {
      setInfo(response.data)
    })
  }, [])
  const [ownerName, setOwnerName] = useState('')
  const [address, setAddress] = useState('')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = () => {
    setPage(0)
    ClassAPi.FindResidence(ownerName, address).then((response) => {
      setInfo(response.data)
    })

  }
  return (
    <Grid container spacing={2} style={{ padding: "50px" }}>
      <ThemeProvider theme={theme}>
        <Grid xs={12}>
          <div style={{ fontSize: "48px", paddingLeft: "16px" }}>
            Danh sách hộ dân
          </div>
        </Grid>
        <Grid item xs={12}>
          <ButtonAdd to="/themhodan" title="Thêm hộ dân"></ButtonAdd>
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
            <TextField value={ownerName} onChange={(e) => { setOwnerName(e.target.value) }}></TextField>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Nơi thường trú</Typography>
              <TextField value={address} onChange={(e) => { setAddress(e.target.value) }}></TextField>
            </div>
            <ButtonSearch onclick={handleSearch} title="Tìm kiếm"></ButtonSearch>
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
              {info &&
                (rowsPerPage > 0
                  ? info.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : info
                ).map(
                  (colume, index) =>
                    colume &&
                    colume.ownerName !== null && (
                      <TableRow key={index}>
                        <TableCell >
                          <Typography
                            variant="h5"
                            style={{ fontWeight: "500" }}
                            padding={0}
                          >
                            {page * rowsPerPage + index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ fontSize: '17px', width: '260px' }}>{colume.ownerName}</TableCell>
                        <TableCell style={{ fontSize: '17px', width: '300px' }}>{colume.address}</TableCell>
                        <TableCell style={{ fontSize: '17px' }}>{colume.memberNumber}</TableCell>
                        <TableCell>
                          <NavLink to={"/chitiethodan/" + colume.residenceId}>
                            <button
                              style={{
                                backgroundColor: "transparent",
                                cursor: "pointer",
                              }}
                            >
                              <Typography
                                variant="h5"
                                style={{ fontWeight: "500" }}
                                padding={0}
                                color="#3454FC"
                              >
                                Chi tiết
                              </Typography>
                            </button>
                          </NavLink>
                        </TableCell>
                      </TableRow>
                    ))}
            </TableBody>
            <tfoot>
              <tr>
                <TablePagination
                  rowsPerPageOptions={[5, 8, 10, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={info.length}
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

export default HoKhau;
