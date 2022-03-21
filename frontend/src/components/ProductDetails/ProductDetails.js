import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetail,
} from "../../redux/actions/productActions";
import MetaData from "../layout/MetaData";
import Loader from "./../layout/Loader/Loader";
import Carousel from "react-material-ui-carousel";
import { Rating } from "@mui/material";
import "./ProductDetails.css";
import ProductReview from "./ProductReview.js";
import { useAlert } from "react-alert";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const [quantity, setQuantity] = useState(1);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const increase = () => {
    if (product.stock >= quantity) return;
    let qty = quantity + 1;
    setQuantity(qty);
  };
  const decrease = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetail(params.id));
  }, [dispatch, params.id, error, alert]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title={`${product.name} -- Ecommerce`} />
      <div className="single-product-container">
        <div className="img-area">
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
        <div className="content-area">
          <div className="heading-block">
            <h3>{product.name}</h3>
            <p>product id #{product._id} </p>
          </div>
          <div className="block-2">
            <Rating {...options} />
            <span> ({product.numOfReviews} Reviews)</span>
          </div>
          <div className="block-3">
            <h1>{`$${product.price}`}</h1>
            <div className="btn-area">
              <button onClick={decrease}>-</button>
              <input readOnly type="number" value={quantity} />
              <button onClick={increase}>+</button>
              <button
                className="ad-to-cart"
                disabled={product.stock < 1 ? true : false}
              >
                Add To Cart
              </button>
            </div>
            <p className="status">
              Status:
              <b className={product.stock < 1 ? "red-color" : "green-color"}>
                {product.stock < 1 ? "out of Stock" : " In Stock"}
              </b>
            </p>
          </div>
          <div className="block-4">
            <p className="description">Description: {product.description}</p>
            <button className="submit-review">Submit Review</button>
          </div>
        </div>
      </div>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews-container">
          {product.reviews.map((rev) => (
            <ProductReview review={rev} />
          ))}
        </div>
      ) : (
        <p className="no-review">No Review found yet</p>
      )}
    </>
  );
};
export default ProductDetails;
