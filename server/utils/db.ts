import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../db/schemas';

var configs = useRuntimeConfig();

const pool = new Pool({
  connectionString: configs.cms,
});

export const db = drizzle(pool, { schema });



const nakamaPool = new Pool({
  connectionString: configs.nakama,
});

export const nakamaDB = drizzle(nakamaPool, { schema });