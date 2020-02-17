import { catchErrors } from 'errors';
import { createEntity } from 'utils/typeorm';
import { User, UserCurrency } from 'entities';

export const getCurrentUser = catchErrors((req, res) => {
  res.respond({ currentUser: req.currentUser });
});


export const createNewUser = catchErrors(async (req, res) => {
  try {
    const user = await (await createEntity(User, req.body)).save();
    await Promise.all([
      UserCurrency.create({ userId: user._id, type: 'BTC', value: 0 }).save(),
      UserCurrency.create({ userId: user._id, type: 'ETH', value: 0 }).save(),
      UserCurrency.create({ userId: user._id, type: 'LTC', value: 0 }).save(),
      UserCurrency.create({ userId: user._id, type: 'DASH', value: 0 }).save(),
      UserCurrency.create({ userId: user._id, type: 'XRP', value: 10000 }).save(),
    ])
    res.respond({ user });
  } catch (error) {
    res.respond({ error });
  }
});

export const listAllUsers = catchErrors(async (_, res) => {
  const users = await User.find();
  res.respond({ users });
});

export const getUser = catchErrors(async (req, res) => {
  const user = await User.findOne({ email: req.params.email })
  res.respond({ user });
});

export const getCurrentUserCurrencies = catchErrors(async (req, res) => {
  const userId = req.currentUser._id;
  const userCurrencies = await UserCurrency.find({ userId });
  res.respond({ userCurrencies });
});
