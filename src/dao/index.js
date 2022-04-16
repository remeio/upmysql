import { createPool } from "mysql";

const pool = createPool({
  host: "remeio.com",
  user: "root",
  password: "root@123456",
  database: "mysql",
});
var executeSql = function (sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        console.log("sql connection error: ", err);
        reject(err);
        return;
      } else {
        conn.query(sql, function (qerr, vals, fields) {
          pool.releaseConnection(conn);
          if (qerr) {
            console.log("sql query error: ", err);
            reject(qerr).catch(err=>{console.log(err)});
            return;
          }
          console.log("sql [" + sql + "]query success: ", vals);
          resolve(vals, fields);
          return;
        });
      }
    });
  });
};
//向外暴露方法
export default executeSql;
