require('egg').startCluster({ // egg框架的入口文件
  baseDir: __dirname, // 执行egg框架所在的目录全路径，否则采用Node的启动路径
  workers: process.env.WORKERS, // 子进程数目
  port: process.env.PORT // 进程端口号
});
