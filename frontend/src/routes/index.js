import HomePage from "../Pages/Home/HomePage.js";
import ResidenceFeePage from "../Pages/ResidenceFee/ResidenceFeePage.js";
import ResidenceReceiptPage from "../Pages/ResidenceReceipt/ResidenceReceiptPage.js";
import ResidencePage from "../Pages/Residence/ResidencePage.js";
import PersonPage from "../Pages/Person/PersonPage.js";
import ResidenceReceiptAddPage from "../Pages/ResidenceReceipt/ResidenceReceiptAddPage.js";
import ResidenceFeeAddPage from "../Pages/ResidenceFee/ResidenceFeeAddPage.js";
import ResidenceAddPage from "../Pages/Residence/ResidenceAddPage.js";
import PersonAddPage from "../Pages/Person/PersonAddPage.js";
import AbsentPerson from "../Pages/AbsentPerson/AbsentPersonPage.js";
import LoginPage from "../Pages/Home/LoginPage.js";
import NoneLayout from "../Layout/NoneLayout.js";
import ProfilePage from "../Pages/Profile/ProfilePage.js";
import ResetPasswordPage from "../Pages/Profile/ResetPasswordPage.js";
import VehiclePage from "../Pages/Vehicle/VehiclePage.js";
import VehicleFeePage from "../Pages/VehicleFee/VehicleFeePage.js";
import VehicleAddPage from "../Pages/Vehicle/VehicleAddPage.js";
import ResidenceReceiptDetailPage from "../Pages/ResidenceReceipt/ResidenceReceiptDetailPage.js";
import ResidenceFeeDetailPage from "../Pages/ResidenceFee/ResidenceFeeDetailPage.js";
import ResidenceDetailPage from "../Pages/Residence/ResidenceDetailPage.js";
import VehicleDetailPage from "../Pages/Vehicle/VehicleDetailPage.js";
import VehicleFeeAddPage from "../Pages/VehicleFee/VehicleFeeAddPage.js";
import PersonDetailPage from "../Pages/Person/PersonDetailPage.js";
import AbsentPersonAddPage from "../Pages/AbsentPerson/AbsentPersonAddPage.js";
import VehicleReceiptDetailPage from "../Pages/VehicleReceipt/VehicleReceiptDetailPage.js";
import VehicleFeeDetailPage from "../Pages/VehicleFee/VehicleFeeDetailPage.js";
import VehicleReceiptAddPage from "../Pages/VehicleReceipt/VehicleReceiptAddPage.js";
import QTVLayout from "../Layout/QTVLayout.js";
import AdminPage from "../Pages/Admin/AdminPage.js";
import AdminAddPage from "../Pages/Admin/AdminAddPage.js";
import AbsentPersonDetailPage from "../Pages/AbsentPerson/AbsentPersonDetailPage.js";
import ResidenceHistoryPage from "../Pages/Residence/ResidenceHistoryPage.js";
import AdminDetailPage from "../Pages/Admin/AdminDetailPage.js";
import VehicleReceiptPage from "../Pages/VehicleReceipt/VehicleReceiptPage.js";
const publicRoutes = [
  { path: "/", component: LoginPage, layout: NoneLayout },
  { path: "/home", component: HomePage },

  // Residence Receipt
  { path: "/residenceReceipt", component: ResidenceReceiptPage },
  { path: "/residenceReceipt/add", component: ResidenceReceiptAddPage },
  { path: "/residenceReceipt/detail/:id", component: ResidenceReceiptDetailPage },

  // Residence Fee
  { path: "/residenceFee", component: ResidenceFeePage },
  { path: "/residenceFee/add", component: ResidenceFeeAddPage },
  { path: "/residenceFee/detail/:id", component: ResidenceFeeDetailPage },

  // Residence
  { path: "/residence", component: ResidencePage },
  { path: "/residence/add", component: ResidenceAddPage },
  { path: "/residence/detail/:id", component: ResidenceDetailPage },
  { path: "/residence/history/:id", component: ResidenceHistoryPage },

  // Person
  { path: "/person", component: PersonPage },
  { path: "/person/add", component: PersonAddPage },
  { path: "/person/detail/:id", component: PersonDetailPage },

  // Absent Person
  { path: "/absentPerson", component: AbsentPerson },
  { path: "/absentPerson/add", component: AbsentPersonAddPage },
  { path: '/absentPerson/detail/:id', component: AbsentPersonDetailPage },

  // Vehicle
  { path: "/vehicle", component: VehiclePage },
  { path: "/vehicle/add", component: VehicleAddPage },
  { path: "/vehicle/detail/:id", component: VehicleDetailPage },

  // Vehicle Fee
  { path: "/vehicleFee", component: VehicleFeePage },
  { path: "/vehicleFee/add", component: VehicleFeeAddPage },
  { path: "/vehicleFee/detail/:id", component: VehicleFeeDetailPage },

  // Vehicle Receipt
  { path: "/vehicleReceipt", component: VehicleReceiptPage },
  { path: "/vehicleReceipt/add", component: VehicleReceiptAddPage },
  { path: "/vehicleReceipt/detail/:id", component: VehicleReceiptDetailPage },

  // Profile
  { path: "/profile", component: ProfilePage },
  { path: "/profile/resetPassword", component: ResetPasswordPage },

  // Admin
  { path: '/admin', component: AdminPage, layout: QTVLayout },
  { path: '/admin/add', component: AdminAddPage, layout: QTVLayout },
  { path: '/admin/detail/:id', component: AdminDetailPage, layout: QTVLayout }
];

export { publicRoutes };  
