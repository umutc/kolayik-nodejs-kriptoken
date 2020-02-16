import * as authentication from 'controllers/authentication';
import * as users from 'controllers/users';

export const attachPublicRoutes = (app: any): void => {
  if (process.env.NODE_ENV === 'test') {

  }

  app.get('/users', users.listAllUsers);
  app.get('/users/:email', users.getUser);
  app.post('/authentication/guest', authentication.createGuestAccount);
  app.post('/users/register', users.createNewUser);
  app.post('/authentication/login', authentication.login);
};

export const attachPrivateRoutes = (app: any): void => {
  app.get('/currentUser', users.getCurrentUser);
};
