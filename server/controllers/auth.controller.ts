import { H3Event } from 'h3';
import jwt from 'jsonwebtoken';
import { verifyUser, getUserById } from '../services/auth.services';

export async function loginController(event: H3Event) {
  const { email, password_raw } = await readBody(event);

  if (!email || !password_raw) {
    throw createError({ statusCode: 400, message: 'Email and password are required' });
  }

  const user = await verifyUser(email, password_raw);

  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }
  const config = useRuntimeConfig(event);
  const token = jwt.sign({ userId: user.id }, config.public.jwt, { expiresIn: '7d' });
  return { token };
}


export async function meController(event: H3Event) {
  const authHeader = getHeader(event, 'Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ 
      statusCode: 401, 
      message: 'Unauthorized: Missing or invalid token' 
    });
  }
  const token = authHeader.split(' ')[1];

  try {
    const config = useRuntimeConfig(event);
    const decoded = jwt.verify(token, config.public.jwt) as { userId: string };
    const user = await getUserById(decoded.userId);

    if (!user) {
      throw createError({ statusCode: 404, message: 'User not found' });
    }
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    };

  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized: Invalid session',
    });
  }
}