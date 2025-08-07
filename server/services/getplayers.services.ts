import { nakamaDB } from '../utils/db';
import { nakamaUsers } from '../db/schemas';

export async function getPlayers() {
  const players = await nakamaDB.select().from(nakamaUsers);
  return players;
}