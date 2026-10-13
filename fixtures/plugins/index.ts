// myscript.js
import path from 'node:path';
import oracledb from 'oracledb';
import { configDB } from '../config/config';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

oracledb.initOracleClient({ libDir: path.resolve(__dirname, '../../database/instantclient_23_26') });

export type Row = Record<string, any>;
const mypw = {
    user: configDB.db.user,
    password: configDB.db.password,
    connectString: configDB.db.connectString
}; // set mypw to the hr schema password
console.log('teste', configDB.db.libDir)
export async function conectar(query: string): Promise<Row[]> {
    let connection;

    try {
        const connection = await oracledb.getConnection(mypw);
        console.log('banco conectado com sucesso');
        const result = await connection.execute<Row>(
            query,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT,autoCommit:true });
        
        return result.rows ?? [];
    } catch (error) {
        console.error('Erro ao conectar ao banco', error);
        throw error;

    }
}



