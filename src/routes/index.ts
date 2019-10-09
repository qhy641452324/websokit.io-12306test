
import Router from 'koa-router'
let router = new Router();

router.prefix('/sbkk')

//首页:12306
router.get('/(index|index.jshtml)?', async (ctx, next) => {
    await ctx.render('sections/index', {
        
    })
})

//csdn
router.get('/(csdn|csdn.jshtml)?', async (ctx, next) => {
    await ctx.render('sections/csdn', {
        layout: 'shared/layout_csdn',
        title:'csdn'
    })
})

module.exports = router