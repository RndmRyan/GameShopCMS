import { meController } from '../../controllers/auth.controller';

export default defineEventHandler(async (event) => {
  return meController(event);
});