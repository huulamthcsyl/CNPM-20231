import React, { useState } from "react";
import styles from "./ButtonMenu.module.scss";
import classNames from "classnames/bind";

import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
const cx = classNames.bind(styles);
const ButtonMenu = ({ iconLeft, iconRight, children, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cx("menu")}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cx("button")}
        style={{
          fontSize: "25px",
          color: "#707070",
          justifyContent: "space-between",
          paddingRight: "10px",
        }}
        endIcon={
          iconRight == null ? (
            iconRight
          ) : isOpen ? (
            <FontAwesomeIcon
              icon={faChevronUp}
              className={cx("btn-right")}
              size="xs"
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={cx("btn-right")}
              size="xs"
            />
          )
        }
      >
        <span className={cx("left-title")}>
          <span className={cx("btn-left")}>{iconLeft}</span>
          {title}
        </span>
      </Button>
      {isOpen && children}
    </div>
  );
};

export default ButtonMenu;
