import { useEffect, useState } from "react";
import Product from "./../Home/Product";
import Loader from "./../layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../redux/actions/productActions";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

const AllProduct = () => {
  const categories = ["Laptop", "Desktop", "apple", "parts", "other"];
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0, 2500]);
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const [rating, setRating] = useState([0]);
  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProducts,
  } = useSelector((state) => state.products);
  const [category, setCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProduct(params.keyword, currentPage, price, category, rating));
  }, [dispatch, params, currentPage, price, category, rating]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="product-container">
        <div className="product-area">
          <h2 className="featured-product-heading">Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
          </div>
        </div>
        <div className="filter-box">
          <Typography> Price </Typography>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={2500}
          />
          <Typography> Rating Above </Typography>
          <Slider
            value={rating}
            onChange={(e, newRating) => {
              setRating(newRating);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="continuous-slider"
            min={0}
            max={5}
          />
          <Typography>Categories</Typography>
          <ul className="category-list">
            {categories.map((each) => (
              <li key={each} onClick={() => setCategory(each)}>
                {each}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {filteredProducts > resultPerPage && (
        <div className="pagination-area">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="next"
            prevPageText="prev"
            firstPageText="first"
            lastPageText="last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="active-page"
            activeLinkClass="active-link"
          />
        </div>
      )}
    </>
  );
};
export default AllProduct;
