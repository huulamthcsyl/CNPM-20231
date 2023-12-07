import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import ButtonMenu from "../Sidebar/ButtonMenu";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Item from "../Sidebar/Item.js";
import { Car } from "../../Icons/Car.js";
import { HoKhauIcon } from "../../Icons/HoKhauIcon.js";
import { ThuPhiIcon } from "../../Icons/ThuPhiIcon";
import { HoSoIcon } from "../../Icons/HoSoIcom";
import { LogoutIcon } from "../../Icons/LogoutIcon";
import { LoginIcon } from "../../Icons/LoginIcon";

const cx = classNames.bind(styles);

function SidebarQTV() {
    const [user, setUser] = useState("hoang");
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/");
    };
    return (
        <div className={cx("wrapperparent")}>
            <div className={cx("sidebar")}>
                <div className={cx("title")}>
                    <h1>Phần mềm</h1>
                    <h1>quản lý chung cư</h1>
                </div>


                <div className={cx("user")}>

                    {(user && localStorage.getItem("user") != "null") ? (
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
                                localStorage.setItem("user", null)
                            }}
                            startIcon={<LogoutIcon />}
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
                            onClick={handleLogin}
                            startIcon={<LoginIcon />}
                        >
                            Đăng nhập
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SidebarQTV;
