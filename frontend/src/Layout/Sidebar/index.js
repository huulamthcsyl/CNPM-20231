import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import ButtonMenu from "./ButtonMenu";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import {
  faArrowRightFromBracket,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontDownload } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Item from "./Item";
import { Car } from "../../Icons/Car.js";
import { HoKhauIcon } from "../../Icons/HoKhauIcon.js";
import { ThuPhiIcon } from "../../Icons/ThuPhiIcon";

const cx = classNames.bind(styles);

function Sidebar() {
  const [user, setUser] = useState("hoang");
  return (
    <nav>
      <div className={cx("sidebar")}>
        <div className={cx("title")}>
          <h1>Phần mềm</h1>
          <h1>quản lý chung cư</h1>
        </div>
        <div className={cx("menu")}>
          <ButtonMenu iconLeft={<ThuPhiIcon />} title="Thu phí" iconRight="">
            <NavLink
              to="/danhsachthuphi"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Quản lý thu" />
            </NavLink>
            <NavLink
              to="/danhmucthu"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Danh mục thu" />
            </NavLink>
          </ButtonMenu>
          <ButtonMenu
            // iconLeft={''}
            iconLeft={<HoKhauIcon />}
            title="Cư dân"
            iconRight=""
          >
            <NavLink
              to="/hokhau"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Hộ khẩu" />
            </NavLink>
            <NavLink
              to="/nhankhau"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Nhân khẩu" />
            </NavLink>
            <NavLink
              to="/tamvang"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Tạm vắng" />
            </NavLink>
          </ButtonMenu>
          <ButtonMenu
            //     iconLeft={<FontAwesomeIcon icon={Car} />}
            title="Phương tiện"
            iconLeft={<Car />}
          ></ButtonMenu>
        </div>
        <div className={cx("hr")}></div>
        <div className={cx("user")}>
          <Button
            style={{
              padding: "10px 0px",
              fontSize: "30px",
              color: "black",
              fontWeight: "400",
              textTransform: "none",
              justifyContent: "flex-start",
              paddingLeft: "50px",
              borderRadius: "10px",

              paddingBottom: "4px",
            }}
            className={cx("btn")}
            startIcon={
              <AccountCircleOutlinedIcon
                style={{
                  width: "44px",
                  height: "44px",
                  marginRight: "12px",
                }}
              />
            }
          >
            Hồ sơ
          </Button>

          {user ? (
            <Button
              style={{
                backgroundColor: "#f9bf89",
                width: "80%",
                marginLeft: "10px",
                borderRadius: "10px",
                fontSize: "25px",
                padding: "0px 5px",
                textAlign: "center",
                color: "black",
              }}
              onClick={() => {
                setUser("");
              }}
              startIcon={
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  rotation={180}
                />
              }
            >
              Đăng xuất
            </Button>
          ) : (
            <Button
              style={{
                backgroundColor: "#f9bf89",
                width: "80%",
                marginLeft: "10px",
                borderRadius: "10px",
                fontSize: "25px",
                padding: "0px 5px",
                textAlign: "center",
                color: "black",
              }}
              onClick={() => {
                setUser("hoang");
              }}
              startIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
