import * as authentication from 'controllers/authentication';
import * as users from 'controllers/users';
import * as currency from 'controllers/currency';
import * as trade from 'controllers/trade';
import * as transection from 'controllers/transection';

export const attachPublicRoutes = (app: any): void => {
  if (process.env.NODE_ENV === 'test') {

  }

  app.get('/users', users.listAllUsers);
  app.get('/users/:email', users.getUser);
  app.post('/users/register', users.createNewUser);
  app.post('/authentication/login', authentication.login);
  app.get('/currencies/list', currency.list)
};

export const attachPrivateRoutes = (app: any): void => {
  app.get('/users/current/user', users.getCurrentUser);
  app.get('/users/current/user/currencies/list', users.getCurrentUserCurrencies);
  app.get('/users/current/user/transection/list', transection.list);
  app.post('/users/current/user/currencies/buy', trade.buy);
  app.post('/users/current/user/currencies/sell', trade.sell);
};
