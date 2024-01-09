import { Container, TableCell, TableHead, TableRow, Table, TableContainer, Paper, TableBody } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ButtonAdd from '../../Layout/component/ButtonAdd'
import ClassApi from '../../Api/Api'
import { Link } from 'react-router-dom';

export default function AdminPage() {

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    ClassApi.getAllUser()
    .then(res => setAccounts(res.data))
    .catch(err => console.log(err));
  }, [])
  

  return (
    <Container style={{paddingTop: 30}}>
        <h1 style={{marginBottom: 20}}>Quản lý tài khoản quản trị viên</h1>
        <ButtonAdd title="Tạo tài khoản" to={"/admin/add"}/>
        <TableContainer style={{marginTop: 20}} component={Paper}>
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
                  <TableCell style={{fontSize: 18}}><Link to={'/admin/detail/' + data.userId}>Chi tiết</Link></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
    </Container>
  )
}
