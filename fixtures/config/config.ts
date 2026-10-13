/// <reference types="node" />
import path from 'path';
import dotenv from 'dotenv';
const env = path.resolve(__dirname, '../../.env');
dotenv.config({ path: env });

export const config = {
    auth: {
        token: process.env.AUTH_TOKEN || ''
    }
};

export const configDB = {

    db: {
        libDir: process.env.LD_LIBRARY_PATH || '',
        user: process.env.USER_DB || '',
        password: process.env.PASSWORD_DB || '',
        connectString: process.env.CONNECT_STRING || ''
    }
};