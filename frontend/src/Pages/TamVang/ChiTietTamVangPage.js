import {
    Button,
    Grid,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import ButtonSearch from "../../Layout/component/ButtonSearch";
import { NavLink, useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import styled from "@emotion/styled";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ClassApi from '../../Api/Api'
import { toast } from "react-toastify";
import AutoComplete from "../../Layout/component/AutoCompleteSearch";
import dayjs from "dayjs";
import axios from "axios";
const CustomizedDatePicker = styled(DatePicker)`
    & .MuiInputBase-input {
      font-size: 18px;
      width: 150px;
    }
    .MuiInputLabel-root {
      font-size: 20px;
    }
  `;
const theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontWeight: "500",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    //padding: "0px 30px",
                    width: "430px",
                    "& .MuiInputBase-input": {
                        fontSize: "20px",
                        padding: "15px",
                    },
                },
            },
        },
    },
});
function ChiTietTamVangPage() {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true)
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const [province, setProvince] = useState("");

    const handleChange2 = (event) => {
        setProvince(event.target.value);
    };
    const [district, setDistrict] = useState("");

    const handleChange3 = (event) => {
        setDistrict(event.target.value);
    };
    const [village, setVillage] = useState("");

    const handleChange4 = (event) => {
        setVillage(event.target.value);
    };
    const id = useParams().id
    const [personId, setPersonId] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('Nam')
    const [birth, setBirth] = useState()
    const [cccd, setCccd] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [timeFrom, setTimeFrom] = useState()
    const [timeTo, setTimeTo] = useState()
    const [reason, setReason] = useState('')
    const personShrinkList = [];
    const [personList, setPersonList] = useState([])
    useEffect(() => {
        ClassApi.GetAbsentById(id).then((response) => {
            var info = response.data
            setName(info.person.name)
            setGender(info.person.gender == true ? 'Nam' : 'Nữ')
            setCccd(info.person.identityCardNumber)
            setPhoneNumber(info.person.phoneNumber)
            setBirth(dayjs(info.person.dateOfBirth))
            //   setAddress1(info.absent.)
            setAddress2(info.absent.temporaryStay)
            setTimeFrom(dayjs(info.absent.startTime))
            setTimeTo(dayjs(info.absent.endTime))
            setReason(info.absent.reason)
            setAddress1(info.person.homeTown)
            setPersonId(info.person.personId)
            setLoading(false)
        })
    }, [])

    const handleAdd = () => {

        if (address2 == null || address2 == '') {
            toast.warn('Hãy nhập nơi tạm trú!')
            return
        }

        if (timeFrom.diff(timeTo, 'days') > 0) {
            toast.warn('Thời gian bắt đầu không thể lớn hơn thời gian kết thúc!')
            return
        }
        ClassApi.PutAbsent({
            "absentPersonId": id,
            "personId": personId,
            "startTime": timeFrom,
            "endTime": timeTo,
            "reason": reason,
            "temporaryStay": address2 ? address2 : ""
        }, id).then((resp) => {
            toast.success('Sửa thông tin tạm vắng  thành công')
        }).catch((error) => {
            toast.error('Sửa thông tin tạm vắng thất bại')
        })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {!loading && <Grid container spacing={1} style={{ padding: "50px" }} rowSpacing={2}>
                <ThemeProvider theme={theme}>
                    <Grid item xs={12}>
                        <Typography variant="h1" fontSize={48}>
                            Chi tiết tạm vắng
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        alignItems="center"
                        wrap="wrap"
                    //        columnSpacing={8}
                    >
                        <Grid item xs={2.8}>
                            <Typography variant="h4">Họ và tên<span style={{ color: 'red' }}> (*)</span></Typography>
                        </Grid>
                        <Grid item>
                            <TextField value={name}></TextField>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        direction="row"
                        wrap="wrap"
                        alignItems="center"
                    >
                        <Grid item container xs={8} wrap="nowrap">
                            <Grid item xs={4.3}>
                                <Typography variant="h4">Giới tính<span style={{ color: 'red' }}> (*)</span></Typography>
                            </Grid>
                            <Grid item alignItems="center">
                                <input
                                    disabled
                                    id="radio1"
                                    type="radio"
                                    name="gender"
                                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                                    value='Nam'
                                    checked={gender == 'Nam' ? true : false}
                                    onClick={() => { setGender('Nam') }}
                                ></input>
                                <label
                                    htmlFor="radio1"
                                    style={{ fontSize: "24px", margin: "0px 12px" }}
                                >
                                    Nam
                                </label>
                            </Grid>
                            <Grid item alignItems="center">
                                <input
                                    disabled
                                    id="radio2"
                                    type="radio"
                                    name="gender"
                                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                                    value='Nữ'
                                    checked={gender == 'Nam' ? false : true}
                                    onClick={() => { setGender('Nữ') }}

                                ></input>
                                <label
                                    htmlFor="radio2"
                                    style={{ fontSize: "24px", margin: "0px 12px" }}

                                >
                                    Nữ
                                </label>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container wrap="wrap" alignItems="center">
                        <Grid item xs={2.8}>
                            <Typography variant="h4">Ngày sinh<span style={{ color: 'red' }}> (*)</span></Typography>
                        </Grid>
                        <Grid item>
                            <CustomizedDatePicker
                                format="DD-MM-YYYY"
                                slotProps={{ textField: { variant: "outlined", height: '58px' } }}
                                sx={{
                                    marginRight: "35px",
                                    width: "200px",
                                    //              paddingTop: "10px",
                                }}
                                value={birth}
                                onChange={(value) => {
                                    setBirth(value)
                                }}
                                readOnly="true"
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        container
                        xs={12}
                        alignItems="center"
                        wrap="wrap"
                    //          columnSpacing={12}
                    >
                        <Grid item xs={2.8}>
                            <Typography variant="h4">CCCD</Typography>
                        </Grid>
                        <Grid item>
                            <TextField disabled value={cccd}></TextField>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        alignItems="center"
                        wrap="wrap"
                    //        columnSpacing={3}
                    >
                        <Grid item xs={2.8}>
                            <Typography variant="h4">Số điện thoại</Typography>
                        </Grid>
                        <Grid item>
                            <TextField disabled value={phoneNumber} ></TextField>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        alignItems="center"
                        wrap="wrap"
                    //         columnSpacing={3}
                    >
                        <Grid item xs={2.8}>
                            <Typography variant="h4">Nơi thường trú<span style={{ color: 'red' }}> (*)</span></Typography>
                        </Grid>
                        <Grid item>
                            <TextField readOnly="true" value={address1} onChange={(e) => { setAddress1(e.target.value) }}></TextField>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        alignItems="center"
                        wrap="wrap"
                    //         columnSpacing={3}
                    >
                        <Grid item xs={2.8}>
                            <Typography variant="h4">Nơi tạm trú<span style={{ color: 'red' }}> (*)</span></Typography>
                        </Grid>
                        <Grid item>
                            <TextField value={address2} onChange={(e) => { setAddress2(e.target.value) }}></TextField>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        alignItems="center"
                        wrap="wrap"
                    //   columnSpacing={3}
                    >
                        <Grid item xs={2.8}>
                            <Typography variant="h4">Thời gian<span style={{ color: 'red' }}> (*)</span></Typography>
                        </Grid>
                        <Grid item>
                            <CustomizedDatePicker
                                format="DD-MM-YYYY"
                                label="Từ ngày"
                                slotProps={{ textField: { variant: "standard" } }}
                                sx={{ marginRight: "35px", width: "200px" }}
                                value={timeFrom}
                                onChange={(e) => { setTimeFrom(e) }}
                            />
                        </Grid>
                        <Grid item>
                            <CustomizedDatePicker
                                format="DD-MM-YYYY"
                                label="Đến ngày"
                                slotProps={{ textField: { variant: "standard", height: '58px' } }}
                                sx={{
                                    marginRight: "35px",
                                    width: "200px",
                                    //       paddingTop: "10px",
                                }}
                                value={timeTo}
                                onChange={(e) => { setTimeTo(e) }}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        alignItems="center"
                        wrap="wrap"
                    //        columnSpacing={3}
                    >
                        <Grid item xs={2.8}>
                            <Typography variant="h4">Lý do</Typography>
                        </Grid>
                        <Grid item>
                            <TextField value={reason} onChange={(e) => { setReason(e.target.value) }}></TextField>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>

                        <ButtonSearch onclick={handleAdd} title="Xác nhận" border="none" ></ButtonSearch>
                        <NavLink to="/tamvang">
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: "#f48888",
                                    //  width: "120px",
                                    margin: "30px 20px",
                                }}
                            >
                                <Typography variant="h4" style={{ color: "black", fontWeight: "400" }}>
                                    Quay lại
                                </Typography>
                            </Button>
                        </NavLink>
                    </Grid>
                </ThemeProvider>
            </Grid>}

        </LocalizationProvider>
    );
}

export default ChiTietTamVangPage;
