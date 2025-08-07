import { NakamaController } from '../../controllers/nakama.controller';

export default defineEventHandler(async (event) => {
  return NakamaController(event);
});
