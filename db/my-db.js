import mysql from 'mysql2/promise';
import 'dotenv/config'; // env 설정파일 가져오기

export default mysql.createPool({
  host: process.env.DB_MYSQL_HOST,
  port: parseInt(process.env.DB_MYSQL_PORT),
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DB_NAME,
  waitForConnections: (process.env.DB_MYSQL_WAIT_FOR_CONNECTIONS === 'true'),
  // └env의 값을 boolean으로 체크하고 싶을 때
  connectionLimit: parseInt(process.env.DB_MYSQL_CONNECTION_LIMIT),
  queueLimit: parseInt(process.env.DB_MYSQL_QUEUE_LIMIT)
});