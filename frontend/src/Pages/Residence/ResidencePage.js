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
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ClassAPi from '../../Api/Api'

const tableHead = [
  { name: "Số thứ tự" },
  { name: "Tên chủ hộ" },
  { name: "Nơi thường trú" },
  { name: "Số nhân khẩu" },
  { name: "Ghi chú" },
];
function ResidencePage() {
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
      <Grid item xs={12}>
        <h1 style={{ fontSize: "48px" }}>
          Danh sách hộ dân
        </h1>
      </Grid>
      <Grid item xs={12} style={{ marginBottom: 30 }}>
        <ButtonAdd to="/residence/add" title="Thêm hộ dân"></ButtonAdd>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Tên chủ hộ"
          variant="filled"
          style={{ marginRight: "35px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
          onChange={(e) => setOwnerName(e.target.value)}
        />
        <TextField
          label="Nơi thường trú"
          variant="filled"
          style={{ marginRight: "35px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonSearch onclick={handleSearch} title="Tìm kiếm hộ dân"></ButtonSearch>
      </Grid>
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
                        <TableCell style={{ fontSize: '18px', width: '260px' }}>{colume.ownerName}</TableCell>
                        <TableCell style={{ fontSize: '18px', width: '300px' }}>{colume.address}</TableCell>
                        <TableCell style={{ fontSize: '18px' }}>{colume.memberNumber}</TableCell>
                        <TableCell>
                          <Link to={"/residence/detail/" + colume.residenceId}>
                            <Typography style={{ fontSize: "18px" }}>
                              Chi tiết
                            </Typography>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
            </TableBody>
            <tfoot>
              <tr>
                <TablePagination
                  rowsPerPageOptions={[5, 8, 10, { label: "Tất cả", value: -1 }]}
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
                  labelDisplayedRows={(page) => { return `${page.from} - ${page.to} trên ${page.count}` }}
                  labelRowsPerPage={"Dòng mỗi trang:"}
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

export default ResidencePage;
