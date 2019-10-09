"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 落地文件缓存
 */
const config = require('../../../config/index.js');
const fs = require('fs-extra');
const path = require('path');
exports.default = {
    getPath(hashkey) {
        return {
            dirpath: path.join(config.cache_file_path, hashkey.substring(0, 1), hashkey.substring(1, 2), hashkey.substring(2, 3)),
            filepath: path.join(config.cache_file_path, hashkey.substring(0, 1), hashkey.substring(1, 2), hashkey.substring(2, 3), hashkey + '.txt')
        };
    },
    /**
     * 增加文件缓存
     *
     * @param {*} key
     * @param {*} value
     * @returns
     */
    async put(key, value) {
        if (key == '' || key == null || key == undefined) {
            throw new Error('缓存key不能为空');
            return false;
        }
        let keypath = this.getPath(key);
        fs.ensureDirSync(keypath.dirpath);
        return fs.writeFile(keypath.filepath, JSON.stringify(value), 'utf-8');
    },
    /**
     * 获取文件缓存
     *
     * @param {*} key
     * @returns
     */
    async get(key) {
        let keypath = this.getPath(key);
        if (fs.existsSync(keypath.filepath)) {
            let result = await fs.readFile(keypath.filepath, 'utf-8');
            try {
                return JSON.parse(result);
            }
            catch (error) {
                return result;
            }
        }
        else {
            throw new Error('没有此缓存文件，Key: ' + key);
            return null;
        }
    },
    /**
     * 删除文件缓存
     *
     * @param {*} key
     * @returns
     */
    async del(key) {
        let keypath = this.getPath(key);
        return fs.unlink(keypath.filepath);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9maWxlY2FjaGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0FBQ2xELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUM5QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFFNUIsa0JBQWU7SUFDYixPQUFPLENBQUMsT0FBZTtRQUNyQixPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUNsSCxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDdEksQ0FBQTtJQUNILENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQThCLEVBQUUsS0FBVTtRQUNsRCxJQUFJLEdBQUcsSUFBSSxFQUFFLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksU0FBUyxFQUFFO1lBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDNUIsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDL0IsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDakMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQVc7UUFDbkIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUMvQixJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ25DLElBQUksTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3pELElBQUk7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQzFCO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsT0FBTyxNQUFNLENBQUE7YUFDZDtTQUNGO2FBQ0c7WUFDRixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsQ0FBQTtZQUN0QyxPQUFPLElBQUksQ0FBQTtTQUNaO0lBQ0gsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFXO1FBQ25CLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDL0IsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0NBQ0YsQ0FBQSJ9