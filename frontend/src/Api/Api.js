import axios from "axios";

const newLocal = "https://localhost:7030/api";
export const API_BASE_URL = newLocal;
let token = localStorage.getItem("token");
const headers = {
  "access-control-allow-origin": "*",
  "content-type": "application/json; charset=utf-8 ",
  Authorization: "Bearer " + token,
};
class ClassApi {
  //****** ******/
  //Api Quan tri vien
  //********** */
  //Api dang nhap
  PostLogin(account, password) {
    return axios.post(API_BASE_URL + "/account/login", {
      username: account,
      password: password,
    });
  }
  ChangePassword(oldpassword, newpassword) {
    return axios.put(
      API_BASE_URL + "/account",
      {
        oldpassword: oldpassword,
        newpassword: newpassword,
      },
      { headers }
    );
  }

  /***** */
  //Api ho so
  GetHoSo(id) {
    return axios.get(API_BASE_URL + "/user/" + id, { headers });
  }
  PutHoSo(id, admin) {
    return axios.put(API_BASE_URL + "/user/" + id, admin, { headers });
  }
  /****** */

  /******** */
  //Api quan ly thu
  GetAllResidenceReceipt() {
    return axios.get(API_BASE_URL + "/residencereceipt/all", { headers });
  }
  FindResidenceReceipt(name, address, starttime, endtime) {
    return axios.get(
      API_BASE_URL +
      "/residencereceipt?name=" +
      name +
      "&address=" +
      address +
      "&starttime=" +
      starttime +
      "&endtime=" +
      endtime,
      { headers }
    );
  }
  GetResidenceReceipt(id) {
    return axios.get(API_BASE_URL + "/residencereceipt/" + id, { headers });
  }
  PostResidenceReceipt(residenceReceiptData) {
    return axios.post(
      API_BASE_URL + "/residencereceipt",
      residenceReceiptData,
      { headers }
    );
  }
  GetResidenceFee(id) {
    return axios.get(API_BASE_URL + "/residencefee/" + id, { headers });
  }
  GetAllResidenceFee() {
    return axios.get(API_BASE_URL + "/residencefee/all", { headers });
  }

  //****** */

  /***** */
  //Api cu dan
  /****** */
  //api ho khau
  GetResidences() {
    return axios.get(API_BASE_URL + "/residence/all", { headers });
  }
  GetResidenceById(id) {
    return axios.get(API_BASE_URL + "/residence/" + id, { headers });
  }
  FindResidence(name, address) {
    return axios.get(API_BASE_URL + "/residence?name=" + name + '&address=' + address, { headers })
  }
  PostResidence(residence) {
    return axios.post(API_BASE_URL + "/residence", residence, { headers });
  }
  //api nhan khau
  GetInfoPerson(id) {
    return axios.get(API_BASE_URL + "/person/" + id, { headers });
  }
  GetPerson(person) {
    return axios.get(API_BASE_URL + "/person?name=" + person, { headers });
  }
  GetAllPeople() {
    return axios.get(API_BASE_URL + "/person/all", { headers });
  }
  PostPerson(person) {
    return axios.post(API_BASE_URL + "/person", person, { headers });
  }

  //api tạm vắng
  GetAllAbsent() {
    return axios.get(API_BASE_URL + "/absent/all", { headers });
  }
  //api postabsent
  PostAbsent(absent) {
    return axios.post(API_BASE_URL + '/absent', absent, { headers })
  }
  FindAbsent(name) {
    return axios.get(API_BASE_URL + '/absent/person?name=' + name, { headers })
  }
  //**
  //Api phuong tien
  //*** */
  GetAllVehicles() {
    return axios.get(API_BASE_URL + "/vehicle/all", { headers });
  }
  GetVehicle(id) {
    return axios.get(API_BASE_URL + '/vehicle/' + id, { headers });
  }
  PostVehicle(vehicle) {
    return axios.post(API_BASE_URL + '/vehicle', vehicle, { headers });
  }

  PostVehicleFee(vehiclefee) {
    return axios.post(API_BASE_URL + '/vehiclefee', vehiclefee, { headers });
  }
  g
  /***** */
  //Api doi mat khau
  PutPassword(id, pass) {
    return axios.put(API_BASE_URL + "/account/" + id, pass, { headers });
  }
  /****** */
}
export default new ClassApi();
