import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../db/schemas';
import { config } from 'dotenv';

config();

const pool = new Pool({
  connectionString: process.env.cmsDB_URL,
});

export const db = drizzle(pool, { schema });



const nakamaPool = new Pool({
  connectionString: process.env.nakamaDB_URL,
});

export const nakamaDB = drizzle(nakamaPool, { schema });