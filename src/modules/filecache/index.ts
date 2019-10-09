/**
 * 落地文件缓存
 */
const config = require('../../../config/index.js')
const fs = require('fs-extra')
const path = require('path')

export default {
  getPath(hashkey: string){
    return {
      dirpath: path.join(config.cache_file_path, hashkey.substring(0,1), hashkey.substring(1,2), hashkey.substring(2,3)),
      filepath: path.join(config.cache_file_path, hashkey.substring(0,1), hashkey.substring(1,2), hashkey.substring(2,3), hashkey + '.txt')
    }
  },
  /**
   * 增加文件缓存
   *
   * @param {*} key
   * @param {*} value
   * @returns
   */
  async put(key: string | null | undefined, value: any){
    if (key == '' || key == null || key == undefined) {
      throw new Error('缓存key不能为空')
      return false
    }
    let keypath = this.getPath(key)
    fs.ensureDirSync(keypath.dirpath)
    return fs.writeFile(keypath.filepath, JSON.stringify(value), 'utf-8')
  },
  /**
   * 获取文件缓存
   *
   * @param {*} key
   * @returns
   */
  async get(key: string){
    let keypath = this.getPath(key)
    if (fs.existsSync(keypath.filepath)) {
      let result = await fs.readFile(keypath.filepath, 'utf-8')
      try {
        return JSON.parse(result)
      } catch (error) {
        return result
      }
    }
    else{
      throw new Error('没有此缓存文件，Key: ' + key)
      return null
    }
  },
  /**
   * 删除文件缓存
   *
   * @param {*} key
   * @returns
   */
  async del(key: string){
    let keypath = this.getPath(key)
    return fs.unlink(keypath.filepath)
  }
}