import React, { useEffect, useState } from 'react'
import { Grid, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import ClassApi from '../../Api/Api'
import { toast } from "react-toastify";
import { Select, MenuItem } from '@mui/material';
import { Autocomplete } from "@mui/material";
import { Vehicle } from '../../Models/Vehicle';

function TaoPhuongTienPage() {
  let PhuongTien = {}
  const [personId, setPersonId] = useState('');
  const [lisensePlate, setLisensePlate] = useState('');
  const [category, setCategory] = useState('');
  const [personList, setPersonList] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    ClassApi.GetAllPeople()
      .then((res) => {
        setPersonList(res.data)
      })
      .catch((err) => {
        toast.error(err.name);
      })
  }, [])
  const handleChangeName = (e, value) => {
    setSelectedPerson(value);
  }
  const handleAdd = () => {

    if (!selectedPerson || !category || !lisensePlate) {
      toast.error("Thêm phương tiện không thành công vì chưa nhập đủ thông tin");
      return;
    }


    const newVehicle = new Vehicle(selectedPerson.personId, category, lisensePlate);

    ClassApi.PostVehicle(newVehicle)
      .then(
        (response) => {
          toast.success('Thêm phương tiện thành công!')
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

        {/* <AutoComplete optionList={personShrinkList} onChange={handleChangeName}></AutoComplete> */}
        <Autocomplete
          disablePortal
          autoHighlight
          options={personList}
          getOptionLabel={(option) => option.name || ''}
          value={selectedPerson}
          onChange={handleChangeName}
          sx={{
            "& .MuiAutocomplete-input": {
              fontSize: 20,
            },
            width: 500,
          }}
          renderInput={(params) => (
            <TextField {...params} />
          )}
        />
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