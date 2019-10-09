/**
 * 网上抓取内容
 */


const axios = require('axios')
const cache = require('memory-cache');
import filecache from '../filecache';
import encryption from '../encryption'
var hash = require('object-hash')

function objectToParams(obj: any){
  let str = "";
  for (let key in obj) {
      if (str != "") {
          str += "&";
      }
      str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str
}

  /**
   * 抓取网上内容并内存缓存和落地缓存
   *
   * @param {*} url 抓取地址
   * @param {*} axios axios选项 
   * @param {*} cache_time 缓存时间：毫秒
   * @param {*} timeout 远程获取超时时间：毫秒 不传或者null则没有超时时间
   * @param {function} validcb 验证数据有效性回调函数 返回true或者false
   * @returns
   */
export default async function (url: string, options: any, cache_time: any, timeout = 5000, validcb?: (arg0: any) => boolean){

  
    if (!options) {
      options = {}
    }
    if (!options.method) {
      options.method = 'get'
    }

    let options_hash = ''
    if (options) {
      options_hash = hash(options)
    }
    let key = encryption.sha1(url + options_hash)

    let cache_value = cache.get(key) //尝试读取内存缓存
    if (cache_value != null) {
      return cache_value
    }

    if (timeout) {
      options.timeout = timeout
    }



    try {
      let back = await axios(url, options)
      let data = back.data

      if (validcb) { //数据有效性验证
        if (!validcb(data)) {
          throw new Error('返回数据验证错误') 
        }
      }

      cache.put(key, data, cache_time)
      filecache.put(key, data)
      return data
    } catch (error) {
      let urlstr = url
      if (options.params) {
        urlstr = url + '?' + objectToParams(options.params)
      }
      // logger.error({
      //   message: error.message,
      //   stack: error.stack,
      //   extra: key + ' ' + urlstr
      // })
    }

    //获取失败 尝试读取本地落地文件
    let localcache = await filecache.get(key)
    cache.put(key, localcache, cache_time)
    return localcache

  
}