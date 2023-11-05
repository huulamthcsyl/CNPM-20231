import Sidebar from "./Sidebar";
import styles from "./DefaulLayout.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { Typography } from "@mui/material";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  const user = localStorage.getItem("user")

  return (

    <div className={cx("wrapper")}>
      <Sidebar className={cx("sidebar")} />
      <div className={cx("children")}>{user == "null" ? <Typography variant="h3">Hãy đăng nhập để thao tác
      </Typography> : children}</div>
    </div>
  );
}

export default DefaultLayout;
