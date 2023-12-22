import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ClassApi from '../../Api/Api'
import { useParams } from "react-router-dom";
const headers = [
    "STT",
    "Họ và tên",
    "Ngày, tháng, năm sinh",
    "Số CCCD",
    "Quan hệ với chủ hộ",
    "Ngày thay đổi",
    "Hoạt động"
];
function LichSuPage() {
    const id = useParams().id
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [listRecord, setListRecord] = useState([])
    useEffect(() => {
        ClassApi.GetResidenceById(id).then((response) => {
            const own = response.data.people.find(item => item.ownerRelationship == "Chủ nhà")
            setAddress(response.data.address)
            if (own) {
                setName(own.name)
            }
        })
        ClassApi.GetRecord(id).then((response) => {
            setListRecord(response.data)
            console.log(response.data)
        })
    }, [])
    return (
        <Grid container paddingLeft='50px' paddingTop='40px' rowSpacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2">Lịch sử thay đổi nhân khẩu hộ Nguyễn Văn A</Typography>
            </Grid>
            <Grid item container xs={12} alignItems='center'>
                <Grid item xs={2.5}>
                    <Typography style={{ fontSize: '22px' }}>Tên chủ hộ</Typography>
                </Grid>
                <Grid item>
                    <TextField style={{ width: '400px' }} InputProps={{
                        style: {
                            fontSize: "18px", // Thiết lập kích thước chữ
                        },
                    }} value={name} disabled>Nguyễn văn a</TextField>
                </Grid>
            </Grid>
            <Grid item container xs={12} alignItems='center'>
                <Grid item xs={2.5}>
                    <Typography style={{ fontSize: '22px' }}>Nơi thường trú</Typography>
                </Grid>
                <Grid item>
                    <TextField style={{ width: '500px' }} InputProps={{
                        style: {
                            fontSize: "18px", // Thiết lập kích thước chữ
                        },
                    }} value={address} disabled>P01.02.10</TextField>
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Typography style={{ fontSize: '22px' }}>Lịch sử thay đổi</Typography>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, maxWidth: 1100 }}>
                    <TableHead>
                        <TableRow>
                            {headers.map((column, index) => (
                                <TableCell key={index}>
                                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                                        {column}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography style={{ fontSize: '20px' }}></Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '20px' }}></Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '20px' }}></Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '20px' }}></Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '20px' }}></Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '20px' }}></Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '20px' }}></Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}

export default LichSuPage;