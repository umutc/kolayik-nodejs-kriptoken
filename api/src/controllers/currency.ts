import { catchErrors } from 'errors';
import { currencies } from '../constants/currency'

export const list = catchErrors(async (_req, res) => {
  res.respond({ currencies });
});
