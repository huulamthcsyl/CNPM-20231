import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import ClassApi from '../../Api/Api'
import AutoComplete from "../../Layout/component/AutoCompleteSearch";
import { toast } from "react-toastify";
import CustomRow from "./Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ListMemberProvider, useListMember } from "./listMemberContext";
import ErrorIcon from '@mui/icons-material/Error';
const headers = [
  "STT",
  "Họ và tên",
  "Ngày, tháng, năm sinh",
  "Số CMT/CCCD",
  "Quan hệ với chủ hộ",
  " ",
];

function ThemHoDan() {
  const [owner, setOwner] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState()
  // const [listMember, setListMember] = useState([])
  const [listMember, setListMember] = useState([]);
  const [numberLine, setNumberLine] = useState(0);
  const [id, setId] = useState('')
  const [arr, setArr] = useState([1])
  const [personList, setPersonList] = useState([])
  const [identityCardNumber, setIdentityCardNumber] = useState('')
  const [birth, setBirth] = useState('')
  const personShrinkList = [];
  const [disabled, setDisabled] = useState(false)

  // const ListMemberContext = createContext();
  useEffect(() => {
    ClassApi.GetAllPeople()
      .then((res) => {
        setPersonList(res.data);
      })
      .catch((err) => {
        toast.error("lỗi 1");
      });
  }, [name]);

  personList.map((person, index) => {
    personShrinkList.push({
      label: person.name,
      code: person.identityCardNumber,
      personId: person.personId,
      residenceId: person.residenceId,
      birth: person.dateOfBirth.slice(0, 10),
      address: person.homeTown,
      person: person
    });
  });
  const handlePost = async () => {
    if (owner.personId == null) {
      toast.warn('Hãy thêm chủ nhà!')
      return
    }
    if (address == null || address == '') {
      toast.warn('Hãy nhập địa chỉ!')
      return
    }
    var chunha = owner
    chunha.ownerRelationship = "Chủ nhà"
    await setDisabled(true)
    await ClassApi.PostResidence({
      "residenceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "memberNumber": listMember.filter(obj => obj.hasOwnProperty('personId')).length + 1,
      "address": address,
      "ownerId": id,
      "people": listMember.length == 0 ? [chunha] : [chunha, ...listMember.filter(obj => obj.hasOwnProperty('personId'))]
    }).then((response) => {
      toast.info('Thành công')
    }).catch(error => {
      // Xử lý lỗi nếu có
      if (error.response && error.response.status === 400) {
        toast.warning(error.response.data)
      }
    })
  }
  var deleterow = (index) => {
    console.log(index)
    const updatedList = [...listMember];

    // Xóa phần tử tại vị trí index trong bản sao
    updatedList.splice(index, 1);

    // Cập nhật state với mảng mới đã xóa phần tử
    setListMember(updatedList);
    console.log(updatedList.length)

    //  setNumberLine(numberLine - 1)
  }
  const changeState = (list) => {
    // setListMember(list)
    setListMember((prev) => ({ value: list }))

  }
  useEffect(() => {

  }, [listMember])
  const handleAddRow = () => {
    //  setArr([...arr, arr.length + 1]); // Thêm một phần tử mới vào mảng arr với giá trị tăng dần
    if (!Array.isArray(listMember)) {
      setListMember([{}]); // Khởi tạo mảng với một phần tử rỗng
      console.log(listMember.length)
    } else {
      setListMember([...listMember, {}]); // Thêm một phần tử rỗng vào mảng
      console.log([...listMember, {}])
    }
  };
  //  useEffect(() => {
  // setArr(Array.from({ length: numberLine }, (_, index) => index + 1)); // Tạo mảng mới từ 1 đến numberLine
  // setListMember(...listMember, {})
  // }, [numberLine]);
  const changeRelation = (index, relaton) => {
    let newlist = listMember
    newlist[index].ownerRelationship = relaton
    setListMember(newlist)
  }
  const pushMember = (person) => {
    const foundObject = listMember.find(obj => obj.personId == person.personId);
    if (foundObject) {
      toast.warning('Người này đã có trong danh sách')
    } else {
      let newlist = [...listMember]
      newlist = [...newlist, person]
      setListMember(newlist)
    }
  }
  const handleChangeName2 = (event, value) => {
    if (value == null || value.person == null) {
      return
    } else {
      //     let newArray = listMember;
      //setPerson(person)
      const foundObject = listMember.find(obj => obj.personId == value.person.personId);
      if (foundObject) {
        toast.warning('Người này đã có trong danh sách')
      } else {
        setOwner(value.person)
        setName(value.label)
        setId(value.personId)
        //      setAddress(value.address)
        setIdentityCardNumber(value.code)
        setBirth(value.birth)
        console.log(value)
      }
    }
  };
  return (
    <ListMemberProvider>
      <Grid container spacing={2} padding="50px">
        <Grid item xs={12}>
          <Grid item xs={12}>
            <h1 style={{ fontSize: "40px" }}>Thêm hộ dân mới</h1>
          </Grid>
          <Grid
            item
            container
            xs={12}
            direction="row"
            style={{ alignItems: "center", alignContent: 'center  ' }}
          >
            <Grid item xs={5} sm={2.2}>
              <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
                Tên chủ hộ<span style={{ color: 'red' }}> *</span>
              </Typography>
            </Grid>
            <Grid item >
              <AutoComplete
                optionList={personShrinkList}
                onChange={handleChangeName2}
                width={400}
              ></AutoComplete>
            </Grid>

          </Grid>
          <Grid
            item
            container
            xs={12}
            direction="row"
            style={{ alignItems: "center" }}
          >
            <Grid item xs={5} sm={2.2}>
              <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
                Nơi thường trú<span style={{ color: 'red' }}> *</span>
              </Typography>
            </Grid>
            <Grid item style={{ marginTop: "10px", marginBottom: "10px" }}>
              <TextField
                style={{ width: "500px" }}
                inputProps={{ style: { fontSize: "15px" } }}
                value={address}
                onChange={(e) => { setAddress(e.target.value) }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
              Danh sách nhân khẩu
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {headers.map((column, index) => (
                    <TableCell key={index}>
                      <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        {column}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography style={{ fontSize: '20px' }}>1</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontSize: '20px' }}>{name}</Typography>
                  </TableCell>
                  <TableCell style={{ fontSize: "20px" }}>
                    <Typography style={{ fontSize: '20px' }}>{owner.dateOfBirth ? owner.dateOfBirth.substring(8, 10) + '/' + owner.dateOfBirth.substring(5, 7) + '/' + owner.dateOfBirth.substring(0, 4) : ''}</Typography>

                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <input
                      style={{
                        fontSize: "20px",
                        border: "none",
                        width: "150px",
                        backgroundColor: 'transparent'
                      }}
                      type="text"
                      value={identityCardNumber}
                      disabled
                    //   onChange={(e) => setIdentityCardNumber(e.target.value)}
                    ></input>
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    <Select style={{ fontSize: "18px", border: "none", width: '120px' }} value='Chủ hộ' >

                      <MenuItem value='Chủ hộ'>Chủ hộ</MenuItem>

                    </Select>
                  </TableCell>
                  <TableCell style={{ fontSize: "18px", cursor: "pointer" }}>
                    <NavLink to={'/chitietcudan/' + id} style={{ textDecoration: 'none' }}>
                      <span style={{ color: "blue" }}>Chi tiết</span>
                    </NavLink>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "18px",
                      }}

                    >
                    </button>
                  </TableCell>
                </TableRow>
                {listMember.length > 0 && listMember.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography style={{ fontSize: '20px' }}>{index + 2}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontSize: '20px' }}>{item.name}</Typography>
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      <Typography style={{ fontSize: '20px' }}>{item.dateOfBirth.substring(8, 10) + '/' + item.dateOfBirth.substring(5, 7) + '/' + item.dateOfBirth.substring(0, 4)}</Typography>

                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      <input
                        style={{
                          fontSize: "20px",
                          border: "none",
                          width: "150px", backgroundColor: 'transparent'
                        }}
                        type="text"
                        value={item.identityCardNumber}
                        disabled
                      //   onChange={(e)=>setIdentityCardNumber(e.target.value)}
                      ></input>
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      <Select style={{ fontSize: "18px", border: "none", width: '120px' }} defaultValue='Khác' onChange={(e) => { changeRelation(index, e.target.value) }} title="Khác">
                        <MenuItem value='Khác'>Khác</MenuItem>
                        <MenuItem value='Vợ'>Vợ</MenuItem>
                        <MenuItem value='Chồng'>Chồng</MenuItem>
                        <MenuItem value='Con'>Con</MenuItem>
                        <MenuItem value='Bố'>Bố</MenuItem>
                        <MenuItem value='Mẹ'>Mẹ</MenuItem>
                        <MenuItem value='Anh/chị/em'>Anh/chị/em</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell style={{ fontSize: "18px", cursor: "pointer" }}>
                      <NavLink to={'/chitietcudan/' + item.personId} style={{ textDecoration: 'none' }}>
                        <span style={{ color: "blue" }}>Chi tiết</span>|
                      </NavLink>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          fontSize: "18px",
                          color: 'red'
                        }}
                        onClick={() => deleterow(index)}
                      >
                        Xóa
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
                <CustomRow ondelete={deleterow} handleAdd={pushMember}
                  setListMember={setListMember} changeRelation={changeRelation}
                  listMember={listMember} personId={listMember.personId} ownerId={owner.personId} />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
            onClick={handlePost}
          //      disabled={disabled}
          >
            <Typography variant="h4" style={{ color: "black" }}>
              Xác nhận
            </Typography>
          </Button>
          <NavLink to="/hokhau">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#f48888",
                //  width: "120px",
                margin: "30px 20px",
              }}
            >
              <Typography variant="h4" style={{ color: "black" }}>
                Quay lại
              </Typography>
            </Button>
          </NavLink>
        </Grid>
      </Grid>
    </ListMemberProvider >
  );
}

export default ThemHoDan;
