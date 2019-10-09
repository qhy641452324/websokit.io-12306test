module.exports = {
  cache_file_path: process.cwd() + '/cache/', //落地缓存文件夹
  log_file_path: process.cwd() + '/log/', //日志文件夹
  development: {
    dataapi: '',
    quoteapi:''

  },
  zptest: {
    dataapi: '',   //正式
    quoteapi: ''
  },
  production: {
    dataapi: '',
    quoteapi: ''

  },
  getEnvParam: function (name) {
    if (this[process.env.NODE_ENV]) {
      return this[process.env.NODE_ENV][name]
    }
    return this.production[name]
  }
}


