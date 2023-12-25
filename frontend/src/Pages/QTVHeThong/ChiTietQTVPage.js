import { Container, TextField, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ClassApi from '../../Api/Api'

export default function ChiTietQTVPage() {

  const params = useParams();
  const userId = params.id;
  const [username, setUsername] = useState("");

  useEffect(() => {
    ClassApi.getUserById(userId)
    .then(res => setUsername(res.data.username))
    .catch(err => console.log(err));
  }, [])

  return (
    <Container>
      <h1 style={{marginBottom: 30}}>Chi tiết tài khoản ban quản trị</h1>
      <Grid container>
        <Grid item xs={6}>
          <p style={{fontSize: 24}}>Tên đăng nhập</p>
        </Grid>
        <Grid item xs={6}>
          <TextField inputProps={{style: {fontSize: 20}, readOnly: true}} value={username} onChange={e => setUsername(e.target.value)} style={{width: '100%'}} />
        </Grid>
      </Grid>
    </Container>
  )
}
