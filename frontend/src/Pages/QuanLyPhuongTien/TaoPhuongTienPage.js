import React, { useEffect, useState } from 'react'
import { Grid, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import ClassApi from '../../Api/Api'
import { toast } from "react-toastify";
import { Select, MenuItem } from '@mui/material';
import AutoComplete from '../../Layout/component/AutoCompleteSearch';
import { Vehicle } from '../../Models/Vehicle';

function TaoPhuongTienPage() {
  let PhuongTien = {}
  const [personId, setPersonId] = useState('');
  const [lisensePlate, setLisensePlate] = useState('');
  const [category, setCategory] = useState('');
  const [ownerName, setOwnerName] = useState("");
  const [personList, setPersonList] = useState([]);

  const [isValid, setIsValid] = useState(true);

  const personShrinkList = [];

  useEffect(() => {
    ClassApi.GetAllPeople()
      .then((res) => {
        setPersonList(res.data)
      })
      .catch((err) => {
        toast.error(err.name);
      })
  }, [])
  personList.map((person, index) => {
    personShrinkList.push({ label: person.name, code: person.identityCard, personId: person.personId });
  });
  const handleChangeName = (e, value) => {
    setPersonId(value.personId);
  }
  const handleAdd = () => {

    // Cần thêm chức năng kiểm tra nếu phương tiện đã bị trùng thì không cho thêm phương tiện mới


    ClassApi.PostVehicle(new Vehicle(personId, category, lisensePlate))
      .then(
        (response) => {
          toast.success('Thành công')
        }
      ).catch((err) => {
        toast.error(err.name)
      })
  }

  return (
    <Grid container spacing={2} padding={"50px"}>
      <Grid item xs={12}>
        <h1 style={{ fontSize: "40px" }}>Thêm phương tiện mới</h1>
      </Grid>
      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
          Biển kiểm soát
        </Typography>
        <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={lisensePlate}
          onChange={(e) => { setLisensePlate(e.target.value) }}
        ></TextField>
      </Grid>

      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "110px" }}>
          Loại xe
        </Typography>
        <Select
          style={{ width: "500px", fontSize: "18px" }}
          value={category}
          onChange={(e) => { setCategory(e.target.value) }}
        >
          <MenuItem value="" disabled>
            Chọn loại xe
          </MenuItem>
          <MenuItem value="Ô tô">Ô tô</MenuItem>
          <MenuItem value="Xe máy">Xe máy</MenuItem>
        </Select>
      </Grid>



      <Grid item container direction="row" alignItems="center">
        <Typography style={{ fontSize: "24px", marginRight: "65px" }}>
          Chủ sở hữu
        </Typography>
        {/* <TextField
          style={{ width: "500px" }}
          inputProps={{ style: { fontSize: "18px" } }}
          value={PersionId}
          onChange={(e) => { setPersonId(e.target.value) }}
        ></TextField> */}
        <AutoComplete optionList={personShrinkList} onChange={handleChangeName}></AutoComplete>
      </Grid>

      <Grid item>
        <NavLink to="/quanlyphuongtien">
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
            onClick={handleAdd}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Xác nhận
            </Typography>
          </Button>
        </NavLink>
      </Grid>
    </Grid>
  )
}
export default TaoPhuongTienPage