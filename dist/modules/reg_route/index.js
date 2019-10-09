"use strict";
/**
 * 注册路由
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
function default_1(app) {
    let rlist = glob_1.default.sync('*', {
        cwd: path_1.default.join(__dirname, '../../routes/')
    });
    rlist.forEach((v) => {
        let router = require(path_1.default.join(__dirname, '../../routes/') + v);
        app.use(router.allowedMethods());
        app.use(router.routes());
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9yZWdfcm91dGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7OztBQUdILGdEQUF3QjtBQUN4QixnREFBd0I7QUFHeEIsbUJBQXdCLEdBQVE7SUFDOUIsSUFBSSxLQUFLLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDekIsR0FBRyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQztLQUMzQyxDQUFDLENBQUE7SUFFRixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBUSxFQUFDLEVBQUU7UUFDeEIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQy9ELEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUE7UUFDaEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUUxQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFYRCw0QkFXQyJ9