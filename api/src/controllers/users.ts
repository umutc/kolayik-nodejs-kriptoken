import { catchErrors } from 'errors';
import { createEntity } from 'utils/typeorm';
import { User } from 'entities';

export const getCurrentUser = catchErrors((req, res) => {
  res.respond({ currentUser: req.currentUser });
});


export const createNewUser = catchErrors(async (req, res) => {
    try {
      const user = await createEntity(User, req.body);
      res.respond({ user });
    } catch (error) {
      console.log(error);
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
