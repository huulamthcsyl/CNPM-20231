import { useEffect, useState } from "react";
import AutoComplete from "../../Layout/component/AutoCompleteSearch";
import { MenuItem, Select, TableCell, TableRow } from "@mui/material";
import { toast } from "react-toastify";
import ClassApi from '../../Api/Api'
import { NavLink } from "react-router-dom";
function CustomRow({ index, ondelete, handleAdd }) {
    const personShrinkList = [];
    const [name, setName] = useState()
    const [personList, setPersonList] = useState([])
    const [birth, setBirth] = useState('2003-02-11')
    const [identityCardNumber, setIdentityCardNumber] = useState('')
    const [relation, setRelation] = useState('Khác')
    const [id, setId] = useState('')
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
            birth: person.dateOfBirth,
            person: person
        });
    });

    // console.log(arr);
    const handleChangeName = (event, value) => {
        var personn = value.person
        personn.ownerRelationship = relation
        handleAdd(personn)
        setName(value.name)
        setBirth(value.birth ? value.birth.slice(0, 10) : birth)
        setIdentityCardNumber(value.code)
        setId(value.personId)
        console.log(value)
    };
    const handleChangeBirth = (event) => {
        setBirth(event.target.value);
    };
    return (
        <TableRow key={index}>

            <TableCell>

                <AutoComplete
                    optionList={personShrinkList}
                    onChange={handleChangeName}
                    width={250}
                ></AutoComplete>
            </TableCell>
            <TableCell style={{ fontSize: "18px" }}>
                <input
                    style={{ fontSize: "18px", border: "none" }}
                    type="date"
                    value={birth}
                    //     onChange={(e) => { setBirth(e.target.value) }}
                    disabled
                />
            </TableCell>
            <TableCell style={{ fontSize: "18px" }}>
                <input
                    style={{
                        fontSize: "18px",
                        border: "none",
                        width: "150px",
                    }}
                    type="text"
                    value={identityCardNumber}
                    disabled
                //   onChange={(e)=>setIdentityCardNumber(e.target.value)}
                ></input>
            </TableCell>
            <TableCell style={{ fontSize: "18px" }}>
                <Select style={{ fontSize: "18px", border: "none", width: '120px' }} value={relation} onChange={(e) => { setRelation(e.target.value) }}>
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
            <TableCell style={{ fontSize: "18px", cursor: "pointer" }}>
                <NavLink to={'/chitietcudan/' + id}>
                    <span style={{ color: "blue" }}>Chi tiết</span>|
                </NavLink>
                <button
                    style={{
                        backgroundColor: "transparent",
                        fontSize: "18px",
                    }}
                    onClick={() => {
                        ondelete(index)
                    }}
                >
                    <span style={{ color: "red" }}>Xóa</span>
                </button>
            </TableCell>
        </TableRow>
    );
}

export default CustomRow;