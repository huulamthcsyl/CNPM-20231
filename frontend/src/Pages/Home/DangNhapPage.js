import { Password } from "@mui/icons-material";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../Api/Api";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    border: "1px solid black",
    width: "50vw",
    height: "50vh",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  input: {
    "& .MuiInputBase-input": { fontSize: 20 },
    "& .MuiInputLabel-root": { fontSize: 20 },

    width: "90%",
  },
  tk_mk: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
function DangNhapPage() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const changeAccount = (e) => {
    setAccount(e.target.value)
  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }
  const navigate = useNavigate();
  const handleLogin = () => {
    axios.get(API_BASE_URL + '/person/' + account).then((response) => {
      alert('dang nhap thanh cong')
      localStorage.setItem('user', account)
      navigate("/home");
    }).catch((error) => {
      alert('tai khoan khong ton tai')
      console.error('Error fetching data:', error);
    });

  };
  return (
    <Box sx={styles.root}>
      <Typography variant="h2">Đăng nhập</Typography>
      <Grid container spacing={1} alignItems="center" sx={styles.tk_mk} p={5}>
        <Grid item xs={3.5} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Tài khoản</Typography>
        </Grid>
        <Grid item xs={8.5} sx={{ justifyContent: "center" }}>
          <TextField margin="normal" sx={styles.input} size="small" value={account} onChange={e => changeAccount(e)} />
        </Grid>
        <Grid item xs={3.5} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Mật khẩu</Typography>
        </Grid>
        <Grid item xs={8.5}>
          <TextField
            type="password"
            margin="normal"
            sx={styles.input}
            size="small"
            value={password}
            onChange={e => changePassword(e)}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "200px", height: "40px", fontSize: "20px" }}
        onClick={handleLogin}
      >
        Đăng nhập
      </Button>
    </Box>
  );
}
export default DangNhapPage;
