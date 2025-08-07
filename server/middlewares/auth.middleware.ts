import jwt from 'jsonwebtoken';

var configs = useRuntimeConfig();

export default defineEventHandler((event) => {
  // Define which API routes to protect
  const protectedRoutes = ['/api/players'];

  const isProtectedRoute = protectedRoutes.some(route => getRequestURL(event).pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = getHeader(event, 'Authorization')?.split(' ')[1];

    if (!token) {
      throw createError({ statusCode: 401, message: 'Unauthorized: No token provided' });
    }

    try {
      const decoded = jwt.verify(token, configs.public.jwt);
      event.context.user = decoded; // Attach user info to the event context
    } catch (error) {
      throw createError({ statusCode: 401, message: 'Unauthorized: Invalid token' });
    }
  }
});
