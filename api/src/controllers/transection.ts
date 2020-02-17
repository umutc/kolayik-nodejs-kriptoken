import { catchErrors } from 'errors';
import { UserTransection } from 'entities';

export const list = catchErrors(async (req, res) => {
  const transections = await UserTransection.find({ userId: req.currentUser._id });
  res.respond({ transections });
});
