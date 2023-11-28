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
  //****** */

  /***** */
  //Api cu dan
  /****** */
  GetPerson(person) {
    return axios.get(API_BASE_URL + "/person?name=" + person, { headers });
  }
  GetAllPeople() {
    return axios.get(API_BASE_URL + "/person/all", { headers });
  }
  PostPerson(person) {
    return axios.post(API_BASE_URL + "/person", person, { headers });
  }

  //Api phuong tien
}
export default new ClassApi();
