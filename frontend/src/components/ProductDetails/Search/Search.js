import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  let history = useNavigate();
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    } else {
      history("/products");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="search something"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input type="submit" value="Search" />
    </form>
  );
};
export default Search;
