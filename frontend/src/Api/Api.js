import axios from "axios";

const newLocal = 'http://localhost:5169/api';
export const API_BASE_URL = newLocal
let token = localStorage.getItem('token')
const headers = {
    'access-control-allow-origin': '*',
    'content-type': 'application/json; charset=utf-8 ',
    'Authorization': 'Bearer ' + token
}
class ClassApi {
    //****** ******/
    //Api Quan tri vien
    //********** */
    //Api dang nhap
    PostLogin(account, password) {
        return axios.post(API_BASE_URL + '/account/login', {
            "username": account,
            "password": password
        })
    }
    //Api thay mat khau
    ChangePassword(oldpassword, newpassword) {
        return axios.put(API_BASE_URL + '/account', {
            "oldpassword": oldpassword,
            "newpassword": newpassword
        }), { headers }
    }
    //Api ho so
    GetHoSo(id) {
        return axios.get(API_BASE_URL + '/user/' + id, { headers })
    }
    PutHoSo(id, admin) {
        return axios.put(API_BASE_URL + '/user/' + id, admin, { headers })
    }

    /******** */
    //Api quan ly thu
    //****** */




    /***** */
    //Api cu dan
    /****** */
    GetPerson(person) {
        return axios.get(API_BASE_URL + '/person?name=' + person, { headers });
    }
    GetAllPeople() {
        return axios.get(API_BASE_URL + "/person/all", { headers });
    }
    PostPerson(person) {
        return axios.post(API_BASE_URL + '/person', person, { headers });
    }





    //Api phuong tien
}
export default new ClassApi()