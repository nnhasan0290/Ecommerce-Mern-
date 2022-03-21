import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import {
  Person,
  Dashboard,
  ShoppingCart,
  ListAlt,
  ExitToApp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/actions/userAction";
const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();

  //methods
  const account = () => {
    navigate("/account");
  };
  const orders = () => {
    navigate("/orders");
  };
  const cart = () => {
    navigate("/cart");
  };
  const logoutUser = () => {
    dispatch(logout());
    alert.success("logout successfully");
  };
  const dashboard = () => {
    navigate("/admin/dashboard");
  };

  const actions = [
    { icon: <Person />, name: "profile", func: account },
    { icon: <ListAlt />, name: "orders", func: orders },
    { icon: <ShoppingCart />, name: "cart", func: cart },
    { icon: <ExitToApp />, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    actions.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => {
          setOpen(true);
        }}
        open={open}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          overflow: "hidden",
          zIndex: "11",
        }}
        direction="down"
        icon={
          <img className="speedDialIcon" src={user.avatar.url} width="100px" />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
          />
        ))}
      </SpeedDial>
    </>
  );
};
export default UserOptions;
