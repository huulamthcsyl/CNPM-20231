import { Label } from "@mui/icons-material";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  const handleLogin = () => {
    navigate("/home");
  };
  return (
    <Box sx={styles.root}>
      <Typography variant="h2">Đăng nhập</Typography>
      <Grid container spacing={1} alignItems="center" sx={styles.tk_mk} p={5}>
        <Grid item xs={3.5} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Tài khoản</Typography>
        </Grid>
        <Grid item xs={8.5} sx={{ justifyContent: "center" }}>
          <TextField margin="normal" sx={styles.input} size="small" />
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
