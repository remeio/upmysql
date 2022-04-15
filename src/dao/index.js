import { createPool } from "mysql";

const pool = createPool({
  host: "remeio.com",
  user: "root",
  password: "root@123456",
  database: "mysql",
});
var query = function (sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        reject(err);
      } else {
        conn.query(sql, function (qerr, vals, fields) {
          pool.releaseConnection(conn);
          if (qerr) {
            reject(qerr);
          }
          resolve(vals, fields);
        });
      }
    });
  });
};
//向外暴露方法
export default query;
