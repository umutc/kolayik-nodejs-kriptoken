import * as authentication from 'controllers/authentication';
import * as users from 'controllers/users';
import * as currency from 'controllers/currency';
import * as trade from 'controllers/trade';
import * as transection from 'controllers/transection';

export const attachPublicRoutes = (app: any): void => {
  // eslint-disable-next-line no-empty
  if (process.env.NODE_ENV === 'test') {
  }

  app.get('/api/v1/users', users.listAllUsers);
  app.get('/api/v1/users/:email', users.getUser);
  app.post('/api/v1/users/register', users.createNewUser);
  app.post('/api/v1/authentication/login', authentication.login);
  app.post('/api/v1/authentication/logout', authentication.logout);
  app.get('/api/v1/currencies/list', currency.list);
};

export const attachPrivateRoutes = (app: any): void => {
  app.get('/api/v1/users/current/user', users.getCurrentUser);
  app.get('/api/v1/users/current/user/currencies/list', users.getCurrentUserCurrencies);
  app.get('/api/v1/users/current/user/transection/list', transection.list);
  app.post('/api/v1/users/current/user/currencies/buy', trade.buy);
  app.post('/api/v1/users/current/user/currencies/sell', trade.sell);
};
