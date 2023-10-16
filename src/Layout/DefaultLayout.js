import Sidebar from "./Sidebar";
import styles from "./DefaulLayout.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Sidebar className={cx("sidebar")} />
      <div className={cx("children")}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
