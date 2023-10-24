import { Grid, Typography } from "@mui/material";
import ButtonAdd from "../../Layout/component/ButtonAdd";
import src from "../../Icons/HoSo.png";
function TamVangPage() {
  return (
    <Grid container spacing={1} style={{ padding: "50px" }}>
      <Grid item xs={12}>
        <Typography variant="h1" fontSize={48} fontWeight="600">
          Danh sách tạm vắng
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ButtonAdd
          title="Đăng ký tạm vắng"
          icon={src}
          to="/dangkytamvang"
        ></ButtonAdd>
      </Grid>
    </Grid>
  );
}

export default TamVangPage;
