import { nakamaDB } from '../utils/db';
import { nakamaUsers } from '../db/schemas';

export async function getPlayers( ) {
  const players = await nakamaDB.select({id:nakamaUsers.id, username:nakamaUsers.username, 
    wallet:nakamaUsers.wallet, update_time:nakamaUsers.update_time}).from(nakamaUsers);
  return players;
}