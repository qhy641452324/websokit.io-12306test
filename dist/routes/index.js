"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
let router = new koa_router_1.default();
router.prefix('/sbkk');
//首页:12306
router.get('/(index|index.jshtml)?', async (ctx, next) => {
    await ctx.render('sections/index', {});
});
//csdn
router.get('/(csdn|csdn.jshtml)?', async (ctx, next) => {
    await ctx.render('sections/csdn', {
        layout: 'shared/layout_csdn',
        title: 'csdn'
    });
});
module.exports = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNERBQStCO0FBQy9CLElBQUksTUFBTSxHQUFHLElBQUksb0JBQU0sRUFBRSxDQUFDO0FBRTFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFFdEIsVUFBVTtBQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNyRCxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsRUFFbEMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUE7QUFFRixNQUFNO0FBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ25ELE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUU7UUFDOUIsTUFBTSxFQUFFLG9CQUFvQjtRQUM1QixLQUFLLEVBQUMsTUFBTTtLQUNmLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUEifQ==