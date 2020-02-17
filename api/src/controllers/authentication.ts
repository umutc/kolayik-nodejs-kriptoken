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
