const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../modals/userModel");
const sendToken = require("../utils/jwtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profile Url",
    },
  });
  sendToken(user, 201, res);
});

//=====================Login User============
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }
  sendToken(user, 200, res);
});
//========== Log Out user =============
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

//============= Forgot Password ========
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  console.log(user);

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    console.log("error is running");
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validator: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//============= Reset Password ============
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log(req.params);
  console.log(resetPasswordToken);
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password doesn't match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

//Get User details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isMatchedPassword = await user.comparePassword(req.body.oldPassword);

  if (!isMatchedPassword) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password hasn't match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

//update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//Get all users (admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User doesn't exist with this id`));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//update User Role --Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });
  if (!user) {
    return next(new ErrorHandler(`User doesn't exist`, 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//delete User --Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User doesn't exist`, 400));
  }
  await user.remove();
  res.status(200).json({
    success: true,
  });
});
