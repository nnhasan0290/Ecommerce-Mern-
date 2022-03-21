import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import { clearErrors, getProduct } from "../../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProduct());
  }, [alert, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="banner">
        <p>welcome to e-commerce </p>
        <h2>Find amazing product below</h2>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="featured-product-heading"> Featured Products</h2>
      <div className="container" id="container">
        {products &&
          products.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
      </div>
    </>
  );
};

export default Home;
