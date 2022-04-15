import { createPool } from "mysql";

const pool = createPool({
  host: "remeio.com",
  user: "root",
  password: "root@123456",
  database: "mysql",
});
var query = function (sql, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, function (qerr, vals, fields) {
        //释放连接
        // conn.release();
        pool.releaseConnection(conn);
        //事件驱动回调
        callback(qerr, vals, fields);
      });
    }
  });
};
//向外暴露方法
export default query;
