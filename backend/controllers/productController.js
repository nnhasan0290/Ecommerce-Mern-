const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../modals/productModels");
const ErrorHandler = require("../utils/errorhandler");
const ApiFeatures = require("../utils/apifeatures");

//Create product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
//Get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});
//update products
exports.updateProducts = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("error message by error handler", "404"));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    products,
  });
});
//delete products
exports.deleteProducts = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("error message by error handler", "404"));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Deleted successfully",
  });
});
//get single product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const singleProduct = await Product.findById(req.params.id);
  if (!singleProduct) {
    return next(new ErrorHandler("error message by error handler", "404"));
  }
  res.status(200).json({
    success: true,
    singleProduct,
  });
});
