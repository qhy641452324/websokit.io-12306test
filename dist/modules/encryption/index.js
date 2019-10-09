"use strict";
/**
 * hash和加解密
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto = require('crypto');
const fs = require('fs-extra');
exports.default = {
    sha1: function (str) {
        var sha1 = node_crypto.createHash("sha1");
        sha1.update(str);
        var res = sha1.digest("hex");
        return res;
    },
    sha1File(filepath) {
        return new Promise((resolve, reject) => {
            var fd = fs.createReadStream(filepath);
            var hash = node_crypto.createHash('sha1');
            hash.setEncoding('hex');
            fd.on('end', function () {
                hash.end();
                //console.log(hash.read()); // the desired sha1sum
                resolve(hash.read());
            });
            // read all file and pipe it (write it) to the hash object
            fd.pipe(hash);
        });
    },
    // checkFileSha1(filepath: string, sha1_value: string) {
    //   return this.sha1File(filepath) === sha1_value
    // },
    md5(str) {
        var md5sum = node_crypto.createHash('md5');
        md5sum.update(str);
        str = md5sum.digest('hex');
        return str;
    },
    base64(str) {
        return (new Buffer(str)).toString('base64');
    },
    decodeBase64(str) {
        return new Buffer(str, 'base64').toString();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9lbmNyeXB0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFFSCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBRzlCLGtCQUFlO0lBQ2IsSUFBSSxFQUFFLFVBQVUsR0FBVTtRQUN4QixJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDRCxRQUFRLENBQUMsUUFBZ0I7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXhCLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFO2dCQUNYLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDWCxrREFBa0Q7Z0JBQ2xELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN0QixDQUFDLENBQUMsQ0FBQztZQUVILDBEQUEwRDtZQUMxRCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELHdEQUF3RDtJQUN4RCxrREFBa0Q7SUFDbEQsS0FBSztJQUNMLEdBQUcsQ0FBQyxHQUFVO1FBQ1osSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUFVO1FBQ2YsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzdDLENBQUM7SUFDRCxZQUFZLENBQUMsR0FBVTtRQUNyQixPQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0NBQ0YsQ0FBQSJ9