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

  getUser() {
    return axios.get(API_BASE_URL + "/account/all", { headers: headers });
  }

  registerUser(username, password) {
    return axios.post(
      API_BASE_URL + "/account/register",
      { username: username, password: password },
      { headers: headers }
    );
  }

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
  GetResidenceReceipt(id) {
    return axios.get(API_BASE_URL + "/residencereceipt/" + id, { headers });
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
  FindResidenceReceiptByFeeId(
    name,
    address,
    starttime,
    endtime,
    residenceFeeId
  ) {
    return axios.get(
      API_BASE_URL +
      "/residencereceipt/feeid" +
      "?name=" +
      name +
      "&address=" +
      address +
      "&starttime=" +
      starttime +
      "&endtime=" +
      endtime +
      "&id=" +
      residenceFeeId,
      { headers }
    );
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
  GetResidenceFeeByName(name) {
    return axios.get(API_BASE_URL + "/residencefee/?name=" + name, { headers });
  }
  GetAllResidenceFee() {
    return axios.get(API_BASE_URL + "/residencefee/all", { headers });
  }
  PostResidenceFee(residenceFeeData) {
    return axios.post(API_BASE_URL + "/residencefee/", residenceFeeData, {
      headers,
    });
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
    return axios.get(
      API_BASE_URL + "/residence?name=" + name + "&address=" + address,
      { headers }
    );
  }
  PostResidence(residence) {
    return axios.post(API_BASE_URL + "/residence", residence, { headers });
  }
  PutResidence(residence, id) {
    return axios.put(API_BASE_URL + '/residence/' + id, residence, { headers })
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
  PutPerson(person) {
    return axios.put(API_BASE_URL + "/person/" + person.personId, person, {
      headers,
    });
  }
  //api tạm vắng
  GetAllAbsent() {
    return axios.get(API_BASE_URL + "/absent/all", { headers });
  }
  GetAbsentById(id) { return axios.get(API_BASE_URL + '/absent?id=' + id, { headers }) }
  //api postabsent 
  PostAbsent(absent) { return axios.post(API_BASE_URL + "/absent", absent, { headers }); }
  PutAbsent(absent, id) { return axios.put(API_BASE_URL + '/absent/' + id, absent, { headers }) }
  FindAbsent(name) {
    return axios.get(API_BASE_URL + "/absent/person?name=" + name, { headers });
  }
  //**
  //Api phuong tien
  //*** */

  GetAllVehicles() {
    return axios.get(API_BASE_URL + "/vehicle/all", { headers });
  }
  GetVehicleById(id) {
    return axios.get(API_BASE_URL + "/vehicle/id?id=" + id, { headers });
  }
  FindVehicle(licenseplate, ownerName, category) {
    return axios.get(
      API_BASE_URL +
      "/vehicle?licenseplate=" +
      licenseplate +
      "&ownerName=" +
      ownerName +
      "&category=" +
      category,
      { headers }
    );
  }
  GetVehicle(id) {
    return axios.get(API_BASE_URL + "/vehicle/" + id, { headers });
  }
  PostVehicle(vehicle) {
    return axios.post(API_BASE_URL + "/vehicle", vehicle, { headers });
  }

  PostVehicleFee(vehiclefee) {
    return axios.post(API_BASE_URL + "/vehiclefee", vehiclefee, { headers });
  }
  GetAllVehicleFees() {
    return axios.get(API_BASE_URL + "/vehiclefee/all", { headers });
  }
  GetVehicleFee(id) {
    return axios.get(API_BASE_URL + "/vehiclefee/" + id, { headers });
  }
  GetAllVehicleReceipt() {
    return axios.get(API_BASE_URL + "/vehiclereceipt/all", { headers });
  }
  GetVehicleFeeByName(name) {
    return axios.get(API_BASE_URL + "/vehiclefee/?name=" + name, { headers });
  }
  FindVehicleReceiptByFeeId(
    lisensePlate,
    name,
    starttime,
    endtime,
    vehicleFeeId,
  ) {
    return axios.get(
      API_BASE_URL +
      "/vehiclereceipt/feeid" +
      "?licenseplate=" +
      lisensePlate +
      "&name=" +
      name +
      "&starttime=" +
      starttime +
      "&endtime=" +
      endtime +
      "&id=" +
      vehicleFeeId,
      { headers }
    );
  }



  GetVehicleReceipt(id) {
    return axios.get(API_BASE_URL + "/vehiclereceipt/" + id, { headers });
  }
  PostVehicleReceipt(vehicleReceipt) {
    return axios.post(API_BASE_URL + "/vehiclereceipt", vehicleReceipt, { headers });
  }





  /***** */
  //Api doi mat khau
  PutPassword(id, pass) {
    return axios.put(API_BASE_URL + "/account/" + id, pass, { headers });
  }
  /****** */
}
export default new ClassApi();
