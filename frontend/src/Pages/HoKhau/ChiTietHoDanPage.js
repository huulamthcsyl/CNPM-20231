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
import { Fragment, useEffect, useState } from "react";
import ClassApi from '../../Api/Api'
import { Link, NavLink, useParams } from "react-router-dom";
import CustomRow from "../ThemHoDan/Row";
import { toast } from "react-toastify";
const headers = [
  "STT",
  "Họ và tên",
  "Ngày sinh",
  "Số CMT/CCCD",
  "Quan hệ với chủ hộ",
  " ",
];
function ChiTietHoDan({ Hodan }) {
  const id = useParams().id
  const [name, setName] = useState()
  const [idd, setIdd] = useState('')
  const [identityCardNumber, setIdentityCardNumber] = useState('')
  const [birth, setBirth] = useState()
  const [loading, setLoading] = useState(true)
  Hodan = {
    "residenceId": "76635a7e-2cc1-4428-8724-7f6fbbc57613",
    "memberNumber": 1,
    "address": "...",
    "ownerId": "",
    "people": [
      {
        "personId": "821cec81-33c9-45d9-819e-536f9a8e32b2",
        "residenceId": "76635a7e-2cc1-4428-8724-7f6fbbc57613",
        "name": "Hoàng",
        "dateOfBirth": "2003-02-11T20:00:00",
        "identityCardNumber": "232342432",
        "gender": true,
        "phoneNumber": "432432423432",
        "homeTown": "Xã Quỳnh Yên, Huyện Quỳnh Lưu, Tỉnh Nghệ An",
        "ownerRelationship": null,
        "status": "Tạm Vắng"
      }
    ]
  };

  const [hodan, setHodan] = useState(Hodan);
  const [listMember, setListMember] = useState([])
  const [listMember2, setListMember2] = useState([])
  const [numberLine, setNumberLine] = useState(hodan.people.length);
  const [address, setAddress] = useState('')
  const [owner, setOwner] = useState({ personId: '' })
  useEffect(() => {
    //  ClassApi.GetInfoPerson(idd).then((response) => {
    setName(owner.name ? owner.name : '')
    setBirth(owner.dateOfBirth ? owner.dateOfBirth.slice(0, 10) : '')
    setIdentityCardNumber(owner.identityCardNumber ? owner.identityCardNumber : '')
    //   })
  }, [owner])
  var deleterow = (index) => {
    console.log(index)
    const updatedList = [...listMember2];

    // Xóa phần tử tại vị trí index trong bản sao
    updatedList.splice(index, 1);

    // Cập nhật state với mảng mới đã xóa phần tử
    setListMember2(updatedList);
    console.log(updatedList.length)

    //  setNumberLine(numberLine - 1)
  }
  const changeRelation = (index, relaton) => {
    let newlist = listMember2
    newlist[index].ownerRelationship = relaton
    setListMember2(newlist)
  }

  const handleDel = (index) => {
    let newlist = [...listMember]
    newlist.splice(index, 1)
    setListMember(newlist)
  }
  useEffect(() => {
    ClassApi.GetResidenceById(id).then((response) => {
      setHodan(response.data)
      var newlist = response.data.people.filter(item => item.ownerRelationship != 'Chủ nhà')
      var own = response.data.people.find(obj => obj.ownerRelationship == 'Chủ nhà')
      setOwner(own)
      setListMember(newlist)
      setIdd(own.personId)
      setAddress(response.data.address)
      setLoading(false)
    })
  }, [])
  const handlePut = () => {
    if (address == '') {
      toast.warn('Hãy điền địa chỉ!')
      return
    }
    const updatedList = listMember2.map(item => {
      if (item.ownerRelationship === '') {
        return { ...item, ownerRelationship: 'Khác' };
      }
      return item;
    });
    ClassApi.PutResidence({
      "residenceId": id,
      "memberNumber": [...listMember, ...listMember2].filter(obj => obj.hasOwnProperty('personId')).length + 1,
      "address": address,
      "ownerId": idd,
      "people": [owner, ...listMember, ...updatedList]
    }, id).then(
      (response) => {
        toast.success("Sửa hộ dân thành công!")
        //        window.location.reload()
      }
    ).catch((error) => {
      toast.warning(error.response.data)
    })
  }
  return (
    <Fragment>
      {!loading &&
        <Grid container spacing={1} padding="50px">

          <Grid item xs={12}>
            <Grid item xs={12}>
              <h1 style={{ fontSize: "40px" }}>Chi tiết hộ dân</h1>
            </Grid>
            <Grid
              item
              container
              xs={12}
              direction="row"
              style={{ alignItems: "center" }}
            >
              <Grid item xs={3.2}>
                <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
                  Tên chủ hộ<span style={{ color: 'red' }}> (*)</span>
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "400px" }}
                  inputProps={{ style: { fontSize: "18px" } }}
                  value={name}
                  //disabled
                  readOnly="true"
                ></TextField>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              direction="row"
              style={{ alignItems: "center", padding: '10px 0px' }}
            >
              <Grid item xs={3.2}>
                <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
                  Nơi thường trú<span style={{ color: 'red' }}> (*)</span>
                </Typography>
              </Grid>
              <Grid item >
                <TextField
                  style={{ width: "400px" }}
                  inputProps={{ style: { fontSize: "18px" } }}
                  value={address}
                  onChange={(e) => { setAddress(e.target.value) }}
                //        disabled
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
                        <Typography variant="h4" style={{ fontWeight: "bold" }}>
                          {column}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography style={{ fontSize: '18px' }}>1</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontSize: '18px' }}>{name}</Typography>
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      <Typography style={{ fontSize: '18px' }}>{owner.dateOfBirth ? owner.dateOfBirth.substring(8, 10) + '/' + owner.dateOfBirth.substring(5, 7) + '/' + owner.dateOfBirth.substring(0, 4) : ''}</Typography>
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      <input
                        style={{
                          fontSize: "18px",
                          border: "none",
                          width: "150px", backgroundColor: 'transparent'
                        }}
                        type="text"
                        value={identityCardNumber}
                        disabled
                      //   onChange={(e)=>setIdentityCardNumber(e.target.value)}
                      ></input>
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      <Select style={{ fontSize: "18px", border: "none", width: '120px' }} value='Chủ hộ' readOnly>
                        <MenuItem value='Chủ hộ'>Chủ hộ</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell style={{ fontSize: "18px", cursor: "pointer" }}>
                      <Link to={'/chitietcudan/' + idd}>
                        <Typography style={{ fontSize: "18px" }}>
                          Chi tiết
                        </Typography>
                      </Link>
                    </TableCell>
                  </TableRow>
                  {listMember.length > 0 && listMember.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography style={{ fontSize: '18px' }}>{index + 2}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: '18px' }}>{item.name}</Typography>
                      </TableCell>
                      <TableCell style={{ fontSize: "18px" }}>
                        <Typography style={{ fontSize: '18px' }}>{item.dateOfBirth.substring(8, 10) + '/' + item.dateOfBirth.substring(5, 7) + '/' + item.dateOfBirth.substring(0, 4)}</Typography>
                      </TableCell>
                      <TableCell style={{ fontSize: "18px" }}>
                        <input
                          style={{
                            fontSize: "18px",
                            border: "none",
                            width: "150px", backgroundColor: 'transparent'
                          }}
                          type="text"
                          disabled
                          value={

                            item.identityCardNumber

                          }
                        ></input>
                      </TableCell>
                      <TableCell style={{ fontSize: "18px" }}>
                        <Select style={{ fontSize: "18px", border: "none", width: '120px' }} value={
                          item.ownerRelationship
                        } readOnly>
                          <MenuItem value='Khác'>Khác</MenuItem>
                          <MenuItem value='Chủ hộ'>Chủ hộ</MenuItem>
                          <MenuItem value='Vợ'>Vợ</MenuItem>
                          <MenuItem value='Chồng'>Chồng</MenuItem>
                          <MenuItem value='Con'>Con</MenuItem>
                          <MenuItem value='Bố'>Bố</MenuItem>
                          <MenuItem value='Mẹ'>Mẹ</MenuItem>
                          <MenuItem value='Anh/chị/em'>Anh/chị/em</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Link to={'/chitietcudan/' + idd}>
                          <span style={{ fontSize: "18px", marginRight: 5 }}>
                            Chi tiết
                          </span>
                        </Link>
                        <button style={{ color: "red", backgroundColor: 'transparent', fontSize: '18px' }} onClick={() => { handleDel(index) }}>Xóa</button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {listMember2.length > 0 && listMember2.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography style={{ fontSize: '20px' }}>{index + listMember.length + 2}</Typography>
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
                        <Select defaultValue='Khác' style={{ fontSize: "18px", border: "none", width: '120px' }} onChange={(e) => { changeRelation(index, e.target.value) }}>
                          <MenuItem value='Khác'>Khác</MenuItem>
                          <MenuItem value='Vợ'>Vợ</MenuItem>
                          <MenuItem value='Chồng'>Chồng</MenuItem>
                          <MenuItem value='Con'>Con</MenuItem>
                          <MenuItem value='Bố'>Bố</MenuItem>
                          <MenuItem value='Mẹ'>Mẹ</MenuItem>
                          <MenuItem value='Anh/chị/em'>Anh/chị/em</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Link to={'/chitietcudan/' + idd}>
                          <span style={{ fontSize: "18px", marginRight: 5 }}>
                            Chi tiết
                          </span>
                        </Link>
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
                  <CustomRow listMember={listMember2} setListMember={setListMember2} ownerId={owner.personId} listMember2={listMember} />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>

          </Grid>
          <Grid item xs={12}>
            <NavLink to={"/lichsuthaydoi/" + id}>
              <button style={{ backgroundColor: "transparent", cursor: "pointer" }}>
                <Typography  style={{ color: "blue", cursor: "pointer", fontSize: "20px" }}>
                  Lịch sử thay đổi nhân khẩu
                </Typography>
              </button>
            </NavLink>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#79C9FF", margin: "30px 0px", marginRight: '30px' }}
              onClick={handlePut}
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
                  margin: "30px 0px",
                }}
              >
                <Typography variant="h4" style={{ color: "black" }}>
                  Quay lại
                </Typography>
              </Button>
            </NavLink>
          </Grid>
          <Grid>

          </Grid>
        </Grid>}
    </Fragment>
  );
}

export default ChiTietHoDan;
