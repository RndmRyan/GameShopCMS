import { pgTable, text, uuid, timestamp, jsonb } from 'drizzle-orm/pg-core';


export const cmsUsers = pgTable('cms_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['Admin', 'Developer', 'Maintainer', 'Viewer'] }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const logs = pgTable('logs', {
    id: uuid('id').defaultRandom().primaryKey(),
    oldData: jsonb('old_data'),
    updatedData: jsonb('updated_data').notNull(),
    cmsUserId: uuid('cms_user_id').references(() => cmsUsers.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const nakamaUsers = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').notNull(),
  metadata: jsonb('metadata').notNull(),
  wallet: jsonb('wallet').notNull(),
  create_time: timestamp('create_time').defaultNow().notNull(),
  update_time: timestamp('update_time').defaultNow().notNull()
});