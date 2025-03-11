import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, ListAlt, Login, PersonAdd, PowerSettingsNew } from "@mui/icons-material";

const NavBar = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: "100%", justifyContent: "center" }}>
      <Button color="inherit" component={Link} to="/home" startIcon={<Home />}>
        Home
      </Button>
      <Button color="inherit" component={Link} to="/about" startIcon={<ListAlt />}>
        About
      </Button>
      <Button color="inherit" component={Link} to="/record" startIcon={<PersonAdd />}>
        Record
      </Button>
      <Button color="inherit" component={Link} to="/login" startIcon={<Login />}>
        Login
      </Button>
      <Button color="inherit" component={Link} to="/register" startIcon={<PowerSettingsNew />}>
        Register
      </Button>
    </Stack>
  );
};

export default NavBar;
