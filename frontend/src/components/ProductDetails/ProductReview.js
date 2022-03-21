import profileImg from "./../../images/Profile.png";
import { Rating } from "@mui/material";
const ProductReview = (props) => {
  const review = props.review;
  const options = {
    value: review.rating,
    readOnly: true,
    precision: true,
  };
  return (
    <div className="reviewCard">
      <img src={profileImg} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewComment">{review.comment}</span>
    </div>
  );
};
export default ProductReview;
