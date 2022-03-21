import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import Loader from "./../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./LoginSignup.css";
import profileImg from "./../../images/Profile.png";
import { logging, registering } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";

const LoginSignup = () => {
  //states
  const [avatarPreview, setAvatarPreview] = useState(profileImg);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const [avatar, setAvatar] = useState("");
  console.log(user);

  //declaration
  const { name, email, password } = user;
  const button = useRef(null);
  const Login = useRef(null);
  const Register = useRef(null);
  const dispatch = useDispatch();

  //method no one
  const registerChange = (e) => {
    if (e.target.name === "Avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  //method no two
  const setUpForm = (e, tab) => {
    if (tab === "register") {
      button.current.classList.add("shiftToRegister");
      Login.current.classList.add("go-left");
      Register.current.classList.add("come-right");
    } else {
      button.current.classList.remove("shiftToRegister");
      Login.current.classList.remove("go-left");
      Register.current.classList.remove("come-right");
    }
  };
  //method no three
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(registering(myForm));
  };

  //method no four =========== Login submit
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(logging(loginEmail, loginPass));
  };

  let history = useNavigate();
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isAuthenticated) {
      history(`/account`);
    }
  }, [history, isAuthenticated, error, alert]);

  //main return +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  return loading ? (
    <Loader />
  ) : (
    <div className="loginSignup_container">
      <div className="login-box">
        <div className="login-register">
          <p onClick={(e) => setUpForm(e, "login")}>Login</p>
          <p onClick={(e) => setUpForm(e, "register")}>Register</p>
        </div>
        <button ref={button}></button>
        <form className="login-form" ref={Login} onSubmit={loginSubmit}>
          <div className="name-input">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="User email"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="email-input">
            <LockOpenIcon />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setLoginPass(e.target.value)}
            />
          </div>
          <Link to="/forgot/password">Forgot password</Link>
          <input type="submit" value="Login" />
        </form>
        <form
          className="register-form"
          ref={Register}
          onSubmit={registerSubmit}
        >
          <div className="signUpName">
            <FaceIcon />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={registerChange}
              value={name}
            />
          </div>
          <div className="signUpEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={registerChange}
              value={email}
            />
          </div>
          <div className="signUpPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={registerChange}
              value={password}
            />
          </div>
          <div className="registerImage">
            <img src={avatarPreview} alt="Avatar" />
            <input type="file" name="Avatar" onChange={registerChange} />
          </div>
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};
export default LoginSignup;
