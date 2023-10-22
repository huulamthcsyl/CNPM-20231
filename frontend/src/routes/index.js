import Home from "../Pages/Home";
import DanhMucThu from "../Pages/DanhMucThu";
import DanhSachPhieuThu from "../Pages/DanhSachPhieuThu";
import HoKhau from "../Pages/HoKhau";
import NhanKhau from "../Pages/NhanKhau";
import TaoPhieuThu from "../Pages/TaoPhieuThu";
import TaoKhoanThu from "../Pages/TaoKhoanThu";
import ThemHoDan from "../Pages/ThemHoDan";
import ThemCuDan from "../Pages/ThemCuDan";
import TamVang from "../Pages/TamVang/TamVangPage.js";
import DangNhapPage from "../Pages/Home/DangNhapPage.js";
import NoneLayout from "../Layout/NoneLayout.js";
import HoSoPage from "../Pages/HoSo";
import QuanLyPTPage from "../Pages/PhuongTien/QuanLyPTPage";
import ThuPhiPTPage from "../Pages/PhuongTien/ThuPhiPTPage";
import TaoPhuongTienPage from "../Pages/PhuongTien/TaoPhuongTienPage";
import ChiTietPhieuThu from "../Pages/ChiTietPhieuThu";
import ChiTietKhoanThu from "../Pages/ChiTietKhoanThu";
const publicRoutes = [
  { path: "/", component: DangNhapPage, layout: NoneLayout },
  { path: "/danhmucthu", component: DanhMucThu },
  { path: "/danhsachphieuthu", component: DanhSachPhieuThu },
  { path: "/hokhau", component: HoKhau },
  { path: "/nhankhau", component: NhanKhau },
  { path: "/taophieuthu", component: TaoPhieuThu },
  { path: "/taokhoanthu", component: TaoKhoanThu },
  { path: "/themhodan", component: ThemHoDan },
  { path: "/themcudan", component: ThemCuDan },
  { path: "/tamvang", component: TamVang },
  { path: "/home", component: Home },
  { path: "/hosoadmin", component: HoSoPage },
  { path: "/quanlyphuongtien", component: QuanLyPTPage },
  { path: "/thuphiphuongtien", component: ThuPhiPTPage },
  { path: "/taophuongtien", component: TaoPhuongTienPage},
  { path: "/chitietphieuthu", component: ChiTietPhieuThu},
  { path: "/chitietkhoanthu", component: ChiTietKhoanThu}
];

export { publicRoutes };
