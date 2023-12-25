import { Container, TableCell, TableHead, TableRow, Table, TableContainer, Paper, TableBody } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ButtonAdd from '../../Layout/component/ButtonAdd'
import ClassApi from '../../Api/Api'

export default function QTVPage() {

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    ClassApi.getAllUser()
    .then(res => setAccounts(res.data))
    .catch(err => console.log(err));
  }, [])
  

  return (
    <Container style={{paddingTop: 30}}>
        <h1>Quản lý tài khoản quản trị viên</h1>
        <ButtonAdd title="Tạo tài khoản" to={"/themquantrivien"}/>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{fontSize: 18}}>STT</TableCell>
                <TableCell style={{fontSize: 18}}>Tên đăng nhập</TableCell>
                <TableCell style={{fontSize: 18}}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts && 
              accounts.map((data, index) => 
                <TableRow>
                  <TableCell style={{fontSize: 18}}>{index + 1}</TableCell>
                  <TableCell style={{fontSize: 18}}>{data.userName}</TableCell>
                  <TableCell style={{fontSize: 18}}><a href={'/chitietquantrivien/' + data.userId}>Chi tiết</a></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
    </Container>
  )
}
