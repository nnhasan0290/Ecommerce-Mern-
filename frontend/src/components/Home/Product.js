import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "rgb(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 15 : 20,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt="product" />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span>({product.numOfReviews} reviews)</span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  );
};
export default Product;
