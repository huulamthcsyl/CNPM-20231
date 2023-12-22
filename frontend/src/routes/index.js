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
import QuanLyPTPage from "../Pages/PhuongTien/QuanLyPTPage";
import ThuPhiPTPage from "../Pages/PhuongTien/ThuPhiPTPage";
import TaoPhuongTienPage from "../Pages/QuanLyPhuongTien/TaoPhuongTienPage";
import ChiTietPhieuThu from "../Pages/ChiTietPhieuThu/ChiTietPhieuThuPage";
import ChiTietKhoanThu from "../Pages/ChiTietKhoanThu/ChiTietKhoanThuPage";
import ChiTietHoDan from "../Pages/HoKhau/ChiTietHoDanPage";
import ChiTietPhuongTien from "../Pages/QuanLyPhuongTien/ChiTietPhuongTienPage";
import TaoKhoanThuPTPage from "../Pages/TaoKhoanThuPhuongtien/TaoKhoanThuPTPage";
import ChiTietCuDanPage from "../Pages/NhanKhau/ChiTietCuDanPage";
import DangKyTamVangPage from "../Pages/TamVang/DangKyTamVangPage";
import ChiTietPhieuThuPhuongTienPage from "../Pages/ThuPhiPhuongTien/ChiTietPhieuThuPhuongTienPage";
import ChiTietThuPhiPhuongtienPage from "../Pages/ThuPhiPhuongTien/ChiTietThuPhiPhuongtienPage";
import QuanLyThuPhiPhuongtienPage from "../Pages/ThuPhiPhuongTien/QuanLyThuPhiPhuongtienPage";
import QTVLayout from "../Layout/QTVLayout.js";
import QTVPage from "../Pages/QTVHeThong/QTVPage.js";
import ThemQTVPage from "../Pages/QTVHeThong/ThemQTVPage.js";
import ChiTietTamVangPage from "../Pages/TamVang/ChiTietTamVangPage.js";
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
  { path: "/doimatkhau", component: DoiMatKhauPage },
  { path: "/quanlyphuongtien", component: QuanLyPTPage },
  { path: "/thuphiphuongtien", component: ThuPhiPTPage },
  { path: "/taophuongtien", component: TaoPhuongTienPage },
  { path: "/chitietphieuthu", component: ChiTietPhieuThu },
  { path: "/chitietkhoanthu", component: ChiTietKhoanThu },
  { path: "/chitiethodan/:id", component: ChiTietHoDan },
  { path: '/chitiettamvang/:id', component: ChiTietTamVangPage },
  { path: "/chitietphuongtien/:id", component: ChiTietPhuongTien },
  { path: "/taokhoanthuphuongtien", component: TaoKhoanThuPTPage },
  { path: "/chitietthuphiphuongtien", component: ChiTietThuPhiPhuongtienPage },
  { path: "/quanlythuphiphuongtien", component: QuanLyThuPhiPhuongtienPage },
  { path: "/chitietcudan/:id", component: ChiTietCuDanPage },
  { path: "/dangkytamvang", component: DangKyTamVangPage },
  { path: "/chitietphieuthuphuongtien", component: ChiTietPhieuThuPhuongTienPage },
  { path: '/quantrivien', component: QTVPage, layout: QTVLayout },
  { path: '/themquantrivien', component: ThemQTVPage, layout: QTVLayout }
];

export { publicRoutes };  
