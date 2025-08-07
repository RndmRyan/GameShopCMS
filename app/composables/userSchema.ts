import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const userSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      pattern: '^[a-z_]{3,15}$',
      minLength: 3,
      maxLength: 15
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      pattern: '^[A-Za-z\d@$!%*?&#]{8,}$',
      minLength: 8
    },
    role: {
      type: 'string',
      enum: ['Admin', 'Developer', 'Moderator', 'Viewer']
    }
  },
  required: ['username', 'email', 'password', 'role'],
  additionalProperties: false
};

export const validateUser = ajv.compile(userSchema);

export interface UserData {
  username: string;
  email: string;
  password: string;
  role: string;
} 

export interface PlayerData {
  id: string;
  username: string;
  wallet: Record<string, any>;
  update_time: Date;
}