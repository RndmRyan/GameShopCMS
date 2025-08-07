import { H3Event } from 'h3';
import jwt from 'jsonwebtoken';
import { verifyUser } from '../services/auth.services';
import { config } from 'dotenv';
config();

export async function loginController(event: H3Event) {

  const { email, password_raw } = await readBody(event);

  if (!email || !password_raw) {
    throw createError({ statusCode: 400, message: 'Email and password are required' });
  }

  const user = await verifyUser(email, password_raw);

  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    process.env.jwt_string!, { expiresIn: '2h' }
  );

  return { user, token };
}