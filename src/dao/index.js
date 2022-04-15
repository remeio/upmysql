import { createConnection } from "mysql";

const connection = createConnection({
  host: "remeio.com",
  user: "root",
  password: "root@123456",
  database: "mysql",
});
console.log(connection);

connection.connect();

connection.query("SELECT * from mysql.slow_log", function (error, results) {
  if (error) throw error;
  console.log("The solution is: ", results);
});
//向外暴露方法
export default connection;
