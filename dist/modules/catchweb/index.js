"use strict";
/**
 * 网上抓取内容
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const cache = require('memory-cache');
const filecache_1 = __importDefault(require("../filecache"));
const encryption_1 = __importDefault(require("../encryption"));
var hash = require('object-hash');
function objectToParams(obj) {
    let str = "";
    for (let key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
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
async function default_1(url, options, cache_time, timeout = 5000, validcb) {
    if (!options) {
        options = {};
    }
    if (!options.method) {
        options.method = 'get';
    }
    let options_hash = '';
    if (options) {
        options_hash = hash(options);
    }
    let key = encryption_1.default.sha1(url + options_hash);
    let cache_value = cache.get(key); //尝试读取内存缓存
    if (cache_value != null) {
        return cache_value;
    }
    if (timeout) {
        options.timeout = timeout;
    }
    try {
        let back = await axios(url, options);
        let data = back.data;
        if (validcb) { //数据有效性验证
            if (!validcb(data)) {
                throw new Error('返回数据验证错误');
            }
        }
        cache.put(key, data, cache_time);
        filecache_1.default.put(key, data);
        return data;
    }
    catch (error) {
        let urlstr = url;
        if (options.params) {
            urlstr = url + '?' + objectToParams(options.params);
        }
        // logger.error({
        //   message: error.message,
        //   stack: error.stack,
        //   extra: key + ' ' + urlstr
        // })
    }
    //获取失败 尝试读取本地落地文件
    let localcache = await filecache_1.default.get(key);
    cache.put(key, localcache, cache_time);
    return localcache;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9jYXRjaHdlYi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7O0FBR0gsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzlCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN0Qyw2REFBcUM7QUFDckMsK0RBQXNDO0FBQ3RDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUVqQyxTQUFTLGNBQWMsQ0FBQyxHQUFRO0lBQzlCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO1FBQ2pCLElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRTtZQUNYLEdBQUcsSUFBSSxHQUFHLENBQUM7U0FDZDtRQUNELEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ25EO0lBQ0QsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDO0FBRUM7Ozs7Ozs7OztHQVNHO0FBQ1UsS0FBSyxvQkFBVyxHQUFXLEVBQUUsT0FBWSxFQUFFLFVBQWUsRUFBRSxPQUFPLEdBQUcsSUFBSSxFQUFFLE9BQWdDO0lBR3ZILElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixPQUFPLEdBQUcsRUFBRSxDQUFBO0tBQ2I7SUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtRQUNuQixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtLQUN2QjtJQUVELElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQTtJQUNyQixJQUFJLE9BQU8sRUFBRTtRQUNYLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDN0I7SUFDRCxJQUFJLEdBQUcsR0FBRyxvQkFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLENBQUE7SUFFN0MsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLFVBQVU7SUFDM0MsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1FBQ3ZCLE9BQU8sV0FBVyxDQUFBO0tBQ25CO0lBRUQsSUFBSSxPQUFPLEVBQUU7UUFDWCxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtLQUMxQjtJQUlELElBQUk7UUFDRixJQUFJLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUVwQixJQUFJLE9BQU8sRUFBRSxFQUFFLFNBQVM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTthQUM1QjtTQUNGO1FBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQ2hDLG1CQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUN4QixPQUFPLElBQUksQ0FBQTtLQUNaO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFDaEIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2xCLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDcEQ7UUFDRCxpQkFBaUI7UUFDakIsNEJBQTRCO1FBQzVCLHdCQUF3QjtRQUN4Qiw4QkFBOEI7UUFDOUIsS0FBSztLQUNOO0lBRUQsaUJBQWlCO0lBQ2pCLElBQUksVUFBVSxHQUFHLE1BQU0sbUJBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDekMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQ3RDLE9BQU8sVUFBVSxDQUFBO0FBR3JCLENBQUM7QUExREQsNEJBMERDIn0=