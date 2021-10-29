/* eslint-disable no-underscore-dangle */
import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import { User, UserToken } from 'entities';

export const createGuestAccount = catchErrors(async (_req, res) => {
  res.respond({
    authToken: signToken({ sub: 1 }),
  });
});

export const login = catchErrors(async (_req, res) => {
  const user = await User.findOne({
    email: _req.body.email,
    password: _req.body.password
  });

  if (user) {
    const signedToken = signToken({ sub: user._id });
    const token = await UserToken.create({ userId: user._id, string: signedToken }).save();
    res.respond({ token });
  } else {
    res.respond({ error: 'No user found' });
  }
});

export const logout = catchErrors(async (req, res) => {
  if (req.currentUser && req.currentUser._id) {
    await UserToken.delete({ userId: req.currentUser._id });
    res.respond({ success: true });
  } else {
    res.respond({ error: 'No user found' });
  }
});
