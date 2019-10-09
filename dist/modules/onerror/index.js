"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    return async function (ctx, next) {
        try {
            await next();
        }
        catch (err) {
            console.error(err);
            if (ctx.url.indexOf('/api/') == 0) {
                let is_show_message = false; //是否是需要暴露给前端的错误状态
                if (err.message.indexOf('showerror') == 0) {
                    is_show_message = true;
                }
                ctx.status = 200;
                if (process.env.NODE_ENV !== "production") {
                    if (is_show_message) {
                        err.message = err.message.substring(9);
                    }
                    ctx.body = {
                        re: false,
                        message: err.message,
                        result: err.stack
                    };
                }
                else {
                    if (is_show_message) {
                        ctx.body = {
                            re: false,
                            message: err.message.substring(9)
                        };
                    }
                    else {
                        ctx.body = {
                            re: false,
                            message: 'system error'
                        };
                    }
                }
            }
            else {
                if (process.env.NODE_ENV !== "production") {
                    ctx.body = `<textarea style="width: 800px; height: 400px; margin:0 auto;display:block;font-family: consolas; font-size:14px; line-height:175%; overflow:auto; border:0;background-color:#f3f3f3; padding:20px;">ERROR\n${err.stack}</textarea>`;
                }
                else {
                    await ctx.render('shared/error', {
                        title: '500',
                        layout: false
                    });
                }
            }
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9vbmVycm9yL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0E7SUFDRSxPQUFPLEtBQUssV0FBVSxHQUFnQixFQUFFLElBQXdCO1FBQzlELElBQUk7WUFDRixNQUFNLElBQUksRUFBRSxDQUFDO1NBQ2Q7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFFbEIsSUFBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUM7Z0JBRS9CLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQSxDQUFDLGlCQUFpQjtnQkFDN0MsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3pDLGVBQWUsR0FBRyxJQUFJLENBQUE7aUJBQ3ZCO2dCQUVELEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO2dCQUNoQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtvQkFDdkMsSUFBSSxlQUFlLEVBQUU7d0JBQ25CLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7cUJBQ3ZDO29CQUVELEdBQUcsQ0FBQyxJQUFJLEdBQUc7d0JBQ1AsRUFBRSxFQUFFLEtBQUs7d0JBQ1QsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO3dCQUNwQixNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUs7cUJBQ3BCLENBQUE7aUJBQ0o7cUJBQ0c7b0JBQ0YsSUFBSSxlQUFlLEVBQUU7d0JBQ25CLEdBQUcsQ0FBQyxJQUFJLEdBQUc7NEJBQ1AsRUFBRSxFQUFFLEtBQUs7NEJBQ1QsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt5QkFDcEMsQ0FBQTtxQkFDRjt5QkFDRzt3QkFDRixHQUFHLENBQUMsSUFBSSxHQUFHOzRCQUNQLEVBQUUsRUFBRSxLQUFLOzRCQUNULE9BQU8sRUFBRSxjQUFjO3lCQUMxQixDQUFBO3FCQUNGO2lCQUNGO2FBQ0Y7aUJBQ0c7Z0JBQ0YsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7b0JBRXpDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsOE1BQThNLEdBQUcsQ0FBQyxLQUFLLGFBQWEsQ0FBQTtpQkFDaFA7cUJBQ0c7b0JBQ0EsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTt3QkFDL0IsS0FBSyxFQUFFLEtBQUs7d0JBQ1osTUFBTSxFQUFFLEtBQUs7cUJBQ2QsQ0FBQyxDQUFBO2lCQUNMO2FBQ0Y7U0FFRjtJQUNILENBQUMsQ0FBQTtBQUNILENBQUM7QUF4REQsNEJBd0RDIn0=