const { catchAsync } = require('../../../utils/catchAsync');
const { ApiError } = require('../../../utils/ApiError');
const { findAdminByEmail, verifyPassword, generateToken } = require('./auth.service');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const admin = await findAdminByEmail(email);
  if (!admin || !(await verifyPassword(password, admin.password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken({ id: String(admin._id), email: admin.email });

  res.status(200).json({
    access_token: token,
    token_type: 'Bearer',
    expires_in: 3600,
  });
});

module.exports = { login };
