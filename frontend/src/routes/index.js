import Home from "../Pages/Home";
import DanhMucThu from "../Pages/DanhMucThu/DanhMucThuPage";
import DanhSachPhieuThu from "../Pages/DanhSachPhieuThu/DanhSachPhieuThuPage";
import HoKhau from "../Pages/HoKhau/DanhSachHoDanPage";
import NhanKhau from "../Pages/NhanKhau/NhanKhauPage";
import TaoPhieuThu from "../Pages/TaoPhieuThu/TaoPhieuThuPage";
import TaoKhoanThu from "../Pages/TaoKhoanThu/TaoKhoanThuPage";
import ThemHoDan from "../Pages/ThemHoDan/ThemHoDanPage";
import ThemCuDan from "../Pages/ThemCuDan/ThemCuDanPage";
import TamVang from "../Pages/TamVang/TamVangPage.js";
import DangNhapPage from "../Pages/Home/DangNhapPage.js";
import NoneLayout from "../Layout/NoneLayout.js";
import HoSoPage from "../Pages/HoSo/HoSoPage";
import DoiMatKhauPage from "../Pages/HoSo/DoiMatKhauPage";
import QuanLyPhuongTienPage from "../Pages/QuanLyPhuongTien/QuanLyPhuongTienPage.js";
import KhoanThuPhuongTienPage from "../Pages/KhoanThuPhuongtien/KhoanThuPhuongTienPage.js";
import TaoPhuongTienPage from "../Pages/QuanLyPhuongTien/TaoPhuongTienPage.js";
import ChiTietPhieuThu from "../Pages/ChiTietPhieuThu/ChiTietPhieuThuPage";
import ChiTietKhoanThu from "../Pages/ChiTietKhoanThu/ChiTietKhoanThuPage";
import ChiTietHoDan from "../Pages/HoKhau/ChiTietHoDanPage";
import ChiTietPhuongTien from "../Pages/QuanLyPhuongTien/ChiTietPhuongTienPage.js";
import TaoKhoanThuPhuongTienPage from "../Pages/KhoanThuPhuongtien/TaoKhoanThuPhuongTienPage.js";
import ChiTietCuDanPage from "../Pages/NhanKhau/ChiTietCuDanPage";
import DangKyTamVangPage from "../Pages/TamVang/DangKyTamVangPage";
import ChiTietPhieuThuPhuongTienPage from "../Pages/ChiTietPhieuThuPhuongTien/ChiTietPhieuThuPhuongTienPage.js";
import ChiTietKhoanThuPhuongtienPage from "../Pages/ChiTietKhoanThuPhuongTien/ChiTietKhoanThuPhuongtienPage.js";
import TaoPhieuThuPhuongtienPage from "../Pages/PhieuThuPhuongTien/TaoPhieuThuPhuongtienPage.js";
import QTVLayout from "../Layout/QTVLayout.js";
import QTVPage from "../Pages/QTVHeThong/QTVPage.js";
import ThemQTVPage from "../Pages/QTVHeThong/ThemQTVPage.js";
import ChiTietTamVangPage from "../Pages/TamVang/ChiTietTamVangPage.js";
import LichSuPage from "../Pages/HoKhau/LishSuPage.js";
import ChiTietQTVPage from "../Pages/QTVHeThong/ChiTietQTVPage.js";
import PhieuThuPhuongTienPage from "../Pages/PhieuThuPhuongTien/PhieuThuPhuongTienPage.js";
const publicRoutes = [
  { path: "/", component: DangNhapPage, layout: NoneLayout },
  { path: "/home", component: Home },

  // Residence Receipt
  { path: "/residenceReceipt", component: DanhSachPhieuThu },
  { path: "/residenceReceipt/add", component: TaoPhieuThu },
  { path: "/residenceReceipt/detail", component: ChiTietPhieuThu },

  // Residence Fee
  { path: "/residenceFee", component: DanhMucThu },
  { path: "/residenceFee/add", component: TaoKhoanThu },
  { path: "/residenceFee/detail", component: ChiTietKhoanThu },

  // Residence
  { path: "/residence", component: HoKhau },
  { path: "/residence/add", component: ThemHoDan },
  { path: "/residence/detail/:id", component: ChiTietHoDan },
  { path: "/residence/history/:id", component: LichSuPage },

  // Person
  { path: "/person", component: NhanKhau },
  { path: "/person/add", component: ThemCuDan },
  { path: "/person/detail/:id", component: ChiTietCuDanPage },

  // Absent Person
  { path: "/absentPerson", component: TamVang },
  { path: "/absentPerson/add", component: DangKyTamVangPage },
  { path: '/absentPerson/detail/:id', component: ChiTietTamVangPage },

  // Vehicle
  { path: "/vehicle", component: QuanLyPhuongTienPage },
  { path: "/vehicle/add", component: TaoPhuongTienPage },
  { path: "/vehicle/detail/:id", component: ChiTietPhuongTien },

  // Vehicle Fee
  { path: "/vehicleFee", component: KhoanThuPhuongTienPage },
  { path: "/vehicleFee/add", component: TaoKhoanThuPhuongTienPage },
  { path: "/vehicleFee/detail", component: ChiTietKhoanThuPhuongtienPage },

  // Vehicle Receipt
  { path: "/vehicleReceipt", component: PhieuThuPhuongTienPage },
  { path: "/vehicleReceipt/add", component: TaoPhieuThuPhuongtienPage },
  { path: "/vehicleReceipt/detail", component: ChiTietPhieuThuPhuongTienPage },

  // Profile
  { path: "/profile", component: HoSoPage },
  { path: "/profile/resetPassword", component: DoiMatKhauPage },

  // Admin
  { path: '/admin', component: QTVPage, layout: QTVLayout },
  { path: '/admin/add', component: ThemQTVPage, layout: QTVLayout },
  { path: '/admin/detail/:id', component: ChiTietQTVPage, layout: QTVLayout }
];

export { publicRoutes };  
