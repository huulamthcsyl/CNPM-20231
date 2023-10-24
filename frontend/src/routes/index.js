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
import QuanLyPTPage from "../Pages/PhuongTien/QuanLyPTPage";
import ThuPhiPTPage from "../Pages/PhuongTien/ThuPhiPTPage";
import TaoPhuongTienPage from "../Pages/PhuongTien/TaoPhuongTienPage";
import ChiTietPhieuThu from "../Pages/ChiTietPhieuThu/ChiTietPhieuThuPage";
import ChiTietKhoanThu from "../Pages/ChiTietKhoanThu/ChiTietKhoanThuPage";
import ChiTietHoDan from "../Pages/HoKhau/ChiTietHoDanPage";
import ChiTietPhuongTien from "../Pages/PhuongTien/ChiTietPhuongTienPage";
import TaoKhoanThuPTPage from "../Pages/TaoKhoanThuPhuongtien/TaoKhoanThuPTPage";
import ChiTietThuPhiPhuongtienPage from "../Pages/ThuPhiPhuongTien/ChiTietThuPhiPhuongtienPage";
import QuanLyThuPhiPhuongtienPage from "../Pages/ThuPhiPhuongTien/QuanLyThuPhiPhuongtienPage";
import ChiTietCuDanPage from "../Pages/NhanKhau/ChiTietCuDanPage";
import DangKyTamVangPage from "../Pages/TamVang/DangKyTamVangPage";
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
  { path: "/taophuongtien", component: TaoPhuongTienPage },
  { path: "/chitietphieuthu", component: ChiTietPhieuThu },
  { path: "/chitietkhoanthu", component: ChiTietKhoanThu },
  { path: "/chitiethodan", component: ChiTietHoDan },
  { path: "/chitietphuongtien", component: ChiTietPhuongTien },
  { path: "/taokhoanthuphuongtien", component: TaoKhoanThuPTPage },
  { path: "/chitietthuphiphuongtien", component: ChiTietThuPhiPhuongtienPage },
  { path: "/quanlythuphiphuongtien", component: QuanLyThuPhiPhuongtienPage },
  { path: "/chitietcudan", component: ChiTietCuDanPage },
  { path: "/dangkytamvang", component: DangKyTamVangPage },
];

export { publicRoutes };
