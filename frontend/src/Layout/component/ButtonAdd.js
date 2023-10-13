import PlusCircle from "../../Icons/PlusCircle.png";
import { Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function ButtonAdd({ to, title }) {
  return (
    <NavLink to={to}>
      <Button
        variant="contained"
        style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
      >
        <Typography style={{ marginRight: "8px" }}>
          <img
            src={PlusCircle}
            style={{ width: "26px", height: "26px" }}
            alt=""
          />
        </Typography>
        <Typography variant="h4" style={{ color: "black" }}>
          {title}
        </Typography>
      </Button>
    </NavLink>
  );
}

export default ButtonAdd;
