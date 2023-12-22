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

  const personShrinkList = [];

  useEffect(() => {
    ClassApi.GetAllPeople()
      .then((res) => {
        setPersonList(res.data)
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
  }, [])

  personList.map((person, index) => {
    personShrinkList.push({
      label: person.name,
      code: person.identityCardNumber,
      personId: person.personId,
      residenceId: person.residenceId,
    });
  });

  const handleChangeName = (e, value) => {
    if (value !== null) {
      setOwnerName(value.label)
      setPersonId(value.personId);
    } else {
      setOwnerName("");
    }

  }
  const handleAdd = (event) => {
    event.preventDefault();
    if (!lisensePlate) {
      toast.error("Chưa nhập Biển kiểm soát")
      return;
    }
    if (!category) {
      toast.error("Chưa chọn Loại xe")
      return;
    }
    if (!ownerName) {
      toast.error("Chưa nhập Chủ sở hữu")
      return;
    }
    ClassApi.PostVehicle(new Vehicle(personId, category, lisensePlate))
      .then(
        (response) => {
          toast.success('Tạo phương tiện thành công')
        }
      ).catch((err) => {
        toast.error(err.response.data)
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
        <AutoComplete
          optionList={personShrinkList}
          onChange={handleChangeName}>
        </AutoComplete>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
          onClick={handleAdd}
        >
          <Typography variant="h4" style={{ color: "black" }}>
            Xác nhận
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <NavLink to="/quanlyphuongtien">
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
  )
}
export default TaoPhuongTienPage