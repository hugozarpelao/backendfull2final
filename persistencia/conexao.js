import mysql from 'mysql2/promise';

export default async function conectar(){
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: '127.0.0.1',
            user: 'hugo',
            password: 'trabalho_final',
            database: 'trabalho_final',
            /*waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, 
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0*/
          });

          global.poolConexoes = pool;
          return await pool.getConnection();
    }
}