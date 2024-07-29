import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      city: user.city,
      state: user.state,
      zipcode: user.zipcode,
      profilePhoto: user.profilePhoto,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.email = req.body.email || user.email;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
    user.zipcode = req.body.zipcode || user.zipcode;
    user.profilePhoto = req.body.profilePhoto || user.profilePhoto;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      city: updatedUser.city,
      state: updatedUser.state,
      zipcode: updatedUser.zipcode,
      profilePhoto: updatedUser.profilePhoto,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getUserProfile, updateUserProfile };
