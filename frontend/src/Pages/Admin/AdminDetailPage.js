import { Container, TextField, Grid, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassApi from "../../Api/Api";

export default function AdminDetailPage() {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState(null);

  useEffect(() => {
    ClassApi.getUserById(userId)
      .then((res) => setUsername(res.data.userName))
      .catch((err) => console.log(err));
  }, []);

  const handleResetPassword = () => {
    ClassApi.resetPassword(userId)
      .then((res) => setNewPassword(res.data))
      .catch((err) => console.log(err));
  };

  const handleDeleteAccount = () => {
    ClassApi.deleteUser(userId)
      .then((res) => navigate("/admin"))
      .catch((err) => console.log(err));
  };

  return (
    <Container style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 30 }}>Chi tiết tài khoản ban quản trị</h1>
      <Grid container rowGap={2}>
        <Grid item xs={6}>
          <p style={{ fontSize: 24, marginTop: 10 }}>Tên đăng nhập</p>
        </Grid>
        <Grid item xs={6}>
          <TextField
            inputProps={{ style: { fontSize: 20 }, readOnly: true }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%" }}
          />
        </Grid>
      </Grid>
      <div>
        <h3
          style={{ color: "blue", cursor: "pointer", marginBottom: 10 }}
          onClick={handleResetPassword}
        >
          Khôi phục mật khẩu
        </h3>
      </div>
      {newPassword && (
        <div item xs={12}>
          <h3>Mật khẩu mới: {newPassword}</h3>
        </div>
      )}
      <Button
        variant="contained"
        style={{ backgroundColor: "#f48888" }}
        onClick={handleDeleteAccount}
      >
        <Typography variant="h4" style={{ color: "black" }}>Xoá tài khoản</Typography>
      </Button>
    </Container>
  );
}
