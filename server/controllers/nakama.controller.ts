import { H3Event } from 'h3';
import { verifyToken } from '../services/auth.services';
import { getPlayers } from '../services/getplayers.services';
import { config } from 'dotenv';
config();

export async function NakamaController(event: H3Event) {

  const token = await getHeader(event, 'Authorization');
  const bearer_token = token?.split(' ')[1];

  if (!bearer_token) {
    throw createError({ statusCode: 400, message: 'Token is required' });
  }

  const user = await verifyToken(bearer_token);

  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }

  const players = await getPlayers();

  return { players };
}