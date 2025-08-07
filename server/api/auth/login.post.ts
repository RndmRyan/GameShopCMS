import { loginController } from '../../controllers/auth.controller';

export default defineEventHandler(async (event) => {
  return loginController(event);
});
