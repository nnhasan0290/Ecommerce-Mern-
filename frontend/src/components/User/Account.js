import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./../layout/Loader/Loader";
import MetaData from "./../layout/MetaData";
const Account = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title={`${user.name}'s profile`} />
      <div className="profile-container">
        <div className="avatar-area">
          <h1>My Profile</h1>
          <img src={user.avatar.url} alt={user.name} width="300px" />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined on</h4>
            <p>{String(user.createdAt).substr(0, 10)}</p>
          </div>
          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change password</Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Account;
