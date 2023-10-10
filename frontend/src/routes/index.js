import Home from "../Pages/Home";
import DanhMucThu from "../Pages/DanhMucThu";
import DanhMucThuPhi from "../Pages/DanhSachThuPhi";
import HoKhau from "../Pages/HoKhau";
import NhanKhau from "../Pages/NhanKhau";
import TaoPhieuThu from "../Pages/TaoPhieuThu";
import TaoKhoanThu from "../Pages/TaoKhoanThu";
import ThemHoDan from "../Pages/ThemHoDan";
import ThemCuDan from "../Pages/ThemCuDan";
import TamVang from "../Pages/TamVang/TamVangPage.js";
import DangNhapPage from "../Pages/Home/DangNhapPage.js";
import NoneLayout from "../Layout/NoneLayout.js";
const publicRoutes = [
  { path: "/", component: DangNhapPage, layout: NoneLayout },
  { path: "/danhmucthu", component: DanhMucThu },
  { path: "/danhsachthuphi", component: DanhMucThuPhi },
  { path: "/hokhau", component: HoKhau },
  { path: "/nhankhau", component: NhanKhau },
  { path: "/taophieuthu", component: TaoPhieuThu },
  { path: "/taokhoanthu", component: TaoKhoanThu },
  { path: "/themhodan", component: ThemHoDan },
  { path: "/themcudan", component: ThemCuDan },
  { path: "/tamvang", component: TamVang },
  { path: "/home", component: Home },
];

export { publicRoutes };
