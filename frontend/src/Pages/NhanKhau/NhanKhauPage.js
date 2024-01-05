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
import { TablePagination } from "@mui/material";
import ButtonSearch from "../../Layout/component/ButtonSearch";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ClassApi from "../../Api/Api";
const headTable = ["Số thứ tự", "Họ và tên", "Ngày sinh", "Số CMT/CCCD", ""];
const people = [];

function NhanKhau() {
  const [allPeople, setAllPeople] = useState([]);
  const [person, setPerson] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const searchPerson = () => {
    setPage(0);
    if (person.length > 0) {
      ClassApi.GetPerson(person).then((response) => {
        setAllPeople(response.data);
      });
    } else {
      ClassApi.GetAllPeople()
        .then((respone) => {
          setAllPeople(respone.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };
  useEffect(() => {
    ClassApi.GetAllPeople()
      .then((respone) => {
        setAllPeople(respone.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Grid container spacing={2} style={{ padding: "50px" }}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "48px" }}> Danh sách cư dân </h1>
      </Grid>
      <Grid item xs={12} style={{marginBottom: 30}}>
        <ButtonAdd to="/themcudan" title="Thêm cư dân"></ButtonAdd>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Tên cư dân"
          variant="filled"
          style={{ marginRight: "35px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
          onChange={(e) => setPerson(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonSearch
          title="Tìm kiếm cư dân"
          onclick={searchPerson}
        ></ButtonSearch>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {headTable.map((item, index) => (
                  <TableCell key={index}>
                    <Typography variant="h4" style={{ fontWeight: "bold" }}>
                      {item}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allPeople &&
                (rowsPerPage > 0
                  ? allPeople.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : allPeople
                ).map(
                  (peop, index) =>
                    peop &&
                    peop.personId !== null && (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography fontSize={"18px"}>
                            {" "}
                            {page * rowsPerPage + index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ width: "300px" }}>
                          <Typography fontSize={"18px"}>{peop.name}</Typography>
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          <Typography fontSize={"18px"}>
                            {peop.dateOfBirth.substring(8, 10) +
                              "/" +
                              peop.dateOfBirth.substring(5, 7) +
                              "/" +
                              peop.dateOfBirth.substring(0, 4)}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          <Typography fontSize={"18px"}>
                            {peop.identityCardNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {
                            <NavLink to={"/chitietcudan/" + peop.personId}>
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  color: "blue",
                                  textDecoration: "underline",
                                  fontSize: "18px"
                                }}
                              >
                                Chi tiết
                              </button>
                            </NavLink>
                          }
                        </TableCell>
                      </TableRow>
                    )
                )}
            </TableBody>
            <tfoot>
              <tr>
                <TablePagination
                  rowsPerPageOptions={[5, 8, 10, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={allPeople.length}
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

export default NhanKhau;
