import { Typography } from "@mui/material";

function Home() {
  return (
    <div>
      <img
        src="https://png.pngtree.com/png-clipart/20230814/original/pngtree-welcome-team-banner-greeting-invitation-picture-image_7936427.png"
        style={{ maxHeight: "800px", width: "100%" }}
      ></img>
      <Typography variant="h3" textAlign="center" color="#ccc">Nếu lần đăng nhập trước chưa đăng xuất thì tự động bỏ qua trang đăng nhập</Typography>
    </div>
  );
}

export default Home;
