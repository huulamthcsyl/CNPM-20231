import { Button, Typography } from "@mui/material";

function ButtonSearch({ title }) {
  return (
    <Button
      variant="contained"
      style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
    >
      <Typography variant="h4" style={{ color: "black" }}>
        {title}
      </Typography>
    </Button>
  );
}

export default ButtonSearch;
