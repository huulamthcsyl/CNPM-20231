import React from 'react'
import { Grid, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import ClassApi from '../../Api/Api'
import axios from 'axios';
import { toast } from "react-toastify";
import { useEffect, useState } from 'react'
function DoiMatKhauPage() {

    let MatKhau = {}
    const [oldPassWord, setOldPassWord] = useState('');
    const [newPassWord, setNewPassWord] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [printError, setPrintError] = useState(null);

    const handleChange = () => {
        const id = localStorage.getItem('user')
        if (newPassWord !== confirmPassword) {
            setPrintError("Mật khẩu không khớp!");
            return;
        }
        ClassApi.PutPassword(id, {
            'id': id,
            "oldPassWord": oldPassWord,
            "newPassWord": newPassWord,
        }).then(
            (response) => { toast.success('Đổi mật khẩu thành công') }
        ).catch(err => console.log(err));
    }
    return (
        <Grid container spacing={2} padding={"50px"}>
            <Grid item xs={12}>
                <h1 style={{ fontSize: "40px" }}>
                    ĐỔI MẬT KHẨU
                </h1>
            </Grid>
            <Grid item container direction="row" alignItems="center">
                <Typography style={{ fontSize: "24px", marginRight: "150px" }}>
                    Mật khẩu cũ
                </Typography>
                <TextField
                    required type="password"
                    style={{ width: "500px" }}
                    inputProps={{ style: { fontSize: "18px" } }}
                    value={oldPassWord}
                    onChange={(e) => { setOldPassWord(e.target.value) }}
                ></TextField>
            </Grid>
            <Grid item container direction="row" alignItems="center">
                <Typography style={{ fontSize: "24px", marginRight: "135px" }}>
                    Mật khẩu mới
                </Typography>
                <TextField
                    required type="password"
                    style={{ width: "500px" }}
                    inputProps={{ style: { fontSize: "18px" } }}
                    value={newPassWord}
                    onChange={(e) => { setNewPassWord(e.target.value) }}
                ></TextField>
            </Grid>
            <Grid item container direction="row" alignItems="center">
                <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
                    Xác nhận mật khẩu mới
                </Typography>
                <TextField
                    required type="password"
                    style={{ width: "500px" }}
                    inputProps={{ style: { fontSize: "18px" } }}
                    FormHelperTextProps={{ style: { fontSize: "18px" } }}
                    error={printError != null}
                    helperText={printError}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                ></TextField>
            </Grid>

            <Grid item xs={2}>
                <Button
                    variant="contained"
                    style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
                    onClick={handleChange}
                >
                    <Typography variant="h4" style={{ color: "black" }}>
                        Xác nhận
                    </Typography>
                </Button>
            </Grid>
            <Grid item xs={2}>
                <NavLink to="/hosoadmin">
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
                    >
                        <Typography variant="h4" style={{ color: "black" }}>
                            Hủy
                        </Typography>
                    </Button>
                </NavLink>
            </Grid>
        </Grid>
    );
}
export default DoiMatKhauPage;