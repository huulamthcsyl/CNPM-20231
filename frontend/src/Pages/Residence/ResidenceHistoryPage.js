import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ClassApi from '../../Api/Api'
import { NavLink, useParams } from "react-router-dom";
const headers = [
    "STT",
    "Họ và tên",
    "Ngày sinh",
    "Số CCCD",
    "Quan hệ với chủ hộ",
    "Ngày thay đổi",
    "Hoạt động"
];
function ResidenceHistoryPage() {
    const id = useParams().id
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [listRecord, setListRecord] = useState([])
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
        ClassApi.GetRecord(id).then((response) => {
            setName(response.data.ownerName)
            setAddress(response.data.address)
            setListRecord(response.data.records)
            console.log(response.data.records)
        })
    }, [])
    return (
        <Grid container paddingLeft='50px' paddingTop='40px' rowSpacing={2}>
            <Grid item xs={12}>
                <Typography style={{fontWeight: "bold", fontSize: "40px"}}>Lịch sử thay đổi nhân khẩu hộ {name}</Typography>
            </Grid>
            <Grid item container xs={12} alignItems='center'>
                <Grid item xs={2.5}>
                    <Typography style={{ fontSize: '24px' }}>Tên chủ hộ</Typography>
                </Grid>
                <Grid item>
                    <TextField style={{ width: '400px' }} InputProps={{
                        style: {
                            fontSize: "18px", // Thiết lập kích thước chữ
                        },
                    }} value={name} readOnly="true"></TextField>
                </Grid>
            </Grid>
            <Grid item container xs={12} alignItems='center'>
                <Grid item xs={2.5}>
                    <Typography style={{ fontSize: '24px' }}>Nơi thường trú</Typography>
                </Grid>
                <Grid item>
                    <TextField style={{ width: '400px' }} InputProps={{
                        style: {
                            fontSize: "18px", // Thiết lập kích thước chữ
                        },
                    }} value={address} readOnly="true"></TextField>
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Typography style={{ fontSize: '24px' }}>Lịch sử thay đổi</Typography>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, maxWidth: 1100 }}>
                    <TableHead>
                        <TableRow>
                            {headers.map((column, index) => (
                                <TableCell key={index}>
                                    <Typography variant="h4" style={{ fontWeight: "bold" }}>
                                        {column}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listRecord &&
                            (rowsPerPage > 0
                                ? listRecord.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                : listRecord
                            ).map(
                                (item, index) =>
                                    item &&
                                    item.personName !== null && (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Typography style={{ fontSize: '18px' }}>{page * rowsPerPage + index + 1}</Typography>
                                            </TableCell>
                                            <TableCell style={{ width: '420px' }}>
                                                <Typography style={{ fontSize: '18px' }}>{item.personName}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography style={{ fontSize: '18px' }}>{item.dateOfBirth.substring(8, 10) + '/' + item.dateOfBirth.substring(5, 7) + '/' + item.dateOfBirth.substring(0, 4)}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography style={{ fontSize: '18px' }}>{item.identityCardNumber}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography style={{ fontSize: '18px' }}>{item.ownerRelationship}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography style={{ fontSize: '18px' }}>{item.datecreated.substring(8, 10) + '/' + item.datecreated.substring(5, 7) + '/' + item.datecreated.substring(0, 4)}</Typography>
                                            </TableCell>
                                            <TableCell style={{ width: '230px' }}>
                                                <Typography style={{ fontSize: '18px' }}>{item.action}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                    </TableBody>
                    <tfoot>
                        <tr>
                            <TablePagination
                                rowsPerPageOptions={[5, 8, 10, { label: "All", value: -1 }]}
                                // colSpan={6}
                                count={listRecord.length}
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
            <Grid item xs={12}>
                <NavLink to={'/residence/detail/' + id}>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}

                    >
                        <Typography variant="h4" style={{ color: "black" }}>
                            Xác nhận
                        </Typography>
                    </Button>
                </NavLink>
            </Grid>
        </Grid>
    );
}

export default ResidenceHistoryPage;