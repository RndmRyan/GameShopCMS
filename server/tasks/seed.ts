import { db } from '../utils/db';
import { cmsUsers } from '../db/schemas';
import bcrypt from 'bcrypt';

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task'
  },
  async run() {
    console.log('Running DB seed task...')
    const hashedPassword = await bcrypt.hash('pass', 10);

    await db.insert(cmsUsers).values({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'Admin',
    });

    return { result: 'success' }
  }
})
