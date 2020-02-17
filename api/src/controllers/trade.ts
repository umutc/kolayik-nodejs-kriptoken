import { catchErrors } from 'errors';
import { UserCurrency, UserTransection } from 'entities';
import { currencies as allCurrencies } from 'constants/currency';

export const getCurrentUser = catchErrors((req, res) => {
  res.respond({ currentUser: req.currentUser });
});


export const buy = catchErrors(async (req, res) => {
  try {
    const userId = req.currentUser._id;

    const allCurrencyBTC = allCurrencies.find(c => c.type === 'BTC');
    const allCurrencyWantToBuy = allCurrencies.find(c => c.type === req.body.type);

    const userCurrencies = await UserCurrency.find({ userId });
    const userCurrencyBTC = userCurrencies.find(c => c.type === 'BTC');
    const userCurrentCurrencyWantToBuy = userCurrencies.find(c => c.type === req.body.type);
    const userCurrencyWantToBuyAmount = req.body.value;

    if (!allCurrencyWantToBuy || !userCurrentCurrencyWantToBuy || !allCurrencyBTC) {
      res.respond({ error: 'Invalıd currency' });
      return;
    }

    if (!userCurrencyBTC || userCurrencyBTC.value === 0) {
      res.respond({ error: 'You dont have enought BTC' });
      return;
    }

    const userCurrencyWantToBuyAmountBTCAndCommission = userCurrencyWantToBuyAmount * allCurrencyBTC.value * 100.0025;
    if (userCurrencyWantToBuyAmountBTCAndCommission > userCurrencyBTC.value) {
      res.respond({ error: 'You dont have enought BTC' });
      return;
    }

    userCurrentCurrencyWantToBuy.value += req.body.value;
    const _userCurrentCurrencyWantToBuy = await userCurrentCurrencyWantToBuy.save();

    userCurrencyBTC.value -= userCurrencyWantToBuyAmountBTCAndCommission;
    const _userCurrencyBTC = await userCurrencyBTC.save();

    const userTransection = await UserTransection.create({
      userId: userId,
      type: req.body.type,
      amount: req.body.value,
      value: userCurrencyWantToBuyAmountBTCAndCommission,
      transectionType: 'buy'
    }).save();

    res.respond({
      _userCurrentCurrencyWantToBuy,
      _userCurrencyBTC,
      userTransection,
    });

  } catch (error) {
    res.respond({ error });
  }
});

export const sell = catchErrors(async (req, res) => {
  try {
    const userId = req.currentUser._id;

    const allCurrencyBTC = allCurrencies.find(c => c.type === 'BTC');
    const allCurrencyWantToSell = allCurrencies.find(c => c.type === req.body.type);

    const userCurrencies = await UserCurrency.find({ userId });
    const userCurrencyBTC = userCurrencies.find(c => c.type === 'BTC');
    const userCurrentCurrencyWantToSell = userCurrencies.find(c => c.type === req.body.type);
    const userCurrencyWantToSellAmount: number = req.body.value;

    if (!allCurrencyWantToSell || !userCurrentCurrencyWantToSell || !allCurrencyBTC) {
      res.respond({ error: 'Invalıd currency' });
      return;
    }

    if (!userCurrencyBTC || userCurrencyWantToSellAmount > userCurrentCurrencyWantToSell.value) {
      res.respond({ error: 'You dont have enought ' +  userCurrentCurrencyWantToSell.type });
      return;
    }

    const userCurrencyWantToSellAmountBTCAndCommission = userCurrencyWantToSellAmount * allCurrencyWantToSell.value * 0.999975;

    userCurrentCurrencyWantToSell.value -= req.body.value;
    const _userCurrentCurrencyWantToSell = await userCurrentCurrencyWantToSell.save();

    userCurrencyBTC.value += userCurrencyWantToSellAmountBTCAndCommission;
    const _userCurrencyBTC = await userCurrencyBTC.save();

    const userTransection = await UserTransection.create({
      userId: userId,
      type: req.body.type,
      amount: req.body.value,
      value: userCurrencyWantToSellAmountBTCAndCommission,
      transectionType: 'sell'
    }).save();

    res.respond({
      _userCurrentCurrencyWantToSell,
      _userCurrencyBTC,
      userTransection,
    });

  } catch (error) {
    res.respond({ error });
  }
});
