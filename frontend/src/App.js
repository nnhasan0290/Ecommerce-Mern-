import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/Home/Home";
import AllProduct from "./components/ProductDetails/AllProduct";
import LoginSignup from "./components/User/LoginSignup";
import Account from "./components/User/Account";
import { loadUser } from "./redux/actions/userAction";
import MetaData from "./components/layout/MetaData";

import webfont from "webfontloader";
import { useEffect } from "react";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Search from "./components/ProductDetails/Search/Search";
import UserOptions from "./components/layout/useOptions/UserOptions";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <MetaData title={`Ecommerce`} />
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<AllProduct />} />
        <Route path="/products/:keyword" element={<AllProduct />} />
        <Route path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignup />} />
        <Route exact path="/account" element={<Account />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
