import { Api, Password } from "@mui/icons-material";
import { Alert, Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassApi, { API_BASE_URL } from "../../Api/Api";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

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
  const navigate = useNavigate();
  const user = localStorage.getItem("user")

  useEffect(() => {
    if (user != "null") {
      navigate('/home')
    }
  }, [])
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const changeAccount = (e) => {
    setAccount(e.target.value)
  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    ClassApi.PostLogin(account, password).then((response) => {

      if (response.data.message === "Success") {
        toast.success(response.data.message, {
          onClose: () => {
            localStorage.setItem('user', response.data.data.id);
            localStorage.setItem('token', response.data.data.token);
            setTimeout(() => {
              navigate("/home");
            }, 1500);
          },
        });
      } else {
        toast.warning(response.data.message)
      }

    }).catch((error) => {
      toast.error("lỗi")
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
          <TextField margin="normal" sx={styles.input} size="small" value={account} onChange={e => changeAccount(e)} placeholder="admin" />
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
            placeholder="123"
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
