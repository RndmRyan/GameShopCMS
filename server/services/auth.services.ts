import { db } from '../utils/db';
import { cmsUsers } from '../db/schemas';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function verifyUser(email: string, password_raw: string) {
  const user = await db.query.cmsUsers.findFirst({
    where: eq(cmsUsers.email, email),
  });

  if (!user || !await bcrypt.compare(password_raw, user.password)) {
    return null;
  }
  
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function verifyToken(token: string) {
  const configs = useRuntimeConfig();
  const decoded = jwt.verify(token, configs.public.jwt);
  return decoded;
}

export async function getUserById(id: string) {
  const user = await db.query.cmsUsers.findFirst({
    where: eq(cmsUsers.id, id),
  });
  return user;
}