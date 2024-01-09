import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import ClassApi from "../../Api/Api";
import { toast } from "react-toastify";

export default function AdminAddPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] =
    useState(null);

  const handleSubmit = (e) => {
    console.log("RUN");
    e.preventDefault();
    setConfirmPasswordErrorText(null);

    if (password !== confirmPassword) {
      setConfirmPasswordErrorText("Mật khẩu không khớp!");
      return;
    }
    ClassApi.registerUser(username, password)
      .then((res) =>
        toast.success("Thêm tài khoản mới thành công", {
          position: "top-center",
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <Container style={{ paddingTop: 30 }}>
      <h1 style={{ marginBottom: 30 }}>Tạo tài khoản ban quản trị</h1>
      <form onSubmit={handleSubmit}>
        <Grid container style={{ width: 500 }} rowSpacing={2}>
          <Grid item xs={6}>
            <p style={{ fontSize: 24 }}>Tên đăng nhập</p>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              inputProps={{ style: { fontSize: 20 } }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <p style={{ fontSize: 24 }}>Mật khẩu</p>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              type="password"
              inputProps={{ style: { fontSize: 20 } }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <p style={{ fontSize: 24 }}>Xác nhận mật khẩu</p>
          </Grid>
          <Grid item xs={6}>
            <TextField
              FormHelperTextProps={{ style: { fontSize: 20 } }}
              error={confirmPasswordErrorText != null}
              helperText={confirmPasswordErrorText}
              required
              type="password"
              inputProps={{ style: { fontSize: 16 } }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
        <Container style={{ padding: 0 }}>
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#79C9FF",
              margin: "30px",
              marginLeft: "0px",
            }}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Xác nhận
            </Typography>
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#f48888", margin: "30px 0px" }}
            href="/admin"
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Quay lại
            </Typography>
          </Button>
        </Container>
      </form>
    </Container>
  );
}
