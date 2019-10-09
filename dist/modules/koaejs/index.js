/*!
 * koa-ejs - index.js
 * Copyright(c) 2017 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const debug = require('debug')('koa-ejs');
const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
/**
 * Temp assigned for override later
 */
const parentResolveInclude = ejs.resolveInclude;
/**
 * default render options
 * @type {Object}
 */
const defaultSettings = {
    cache: true,
    layout: 'layout',
    viewExt: 'html',
    locals: {},
    compileDebug: false,
    debug: false,
    writeResp: true
};
var contentPattern = '&&<>&&';
function contentFor(contentName) {
    return contentPattern + contentName + contentPattern;
}
function parseContents(locals) {
    var name, i = 1, str = locals.body, regex = new RegExp('\n?' + contentPattern + '.+?' + contentPattern + '\n?', 'g'), split = str.split(regex), matches = str.match(regex);
    locals.body = split[0];
    if (matches !== null) {
        matches.forEach(function (match) {
            name = match.split(contentPattern)[1];
            locals[name] = split[i];
            i++;
        });
    }
}
/**
 * set app.context.render
 *
 * usage:
 * ```
 * await ctx.render('user', {name: 'dead_horse'});
 * ```
 * @param {Application} app koa application instance
 * @param {Object} settings user settings
 */
function default_1(app, settings) {
    if (app.context.render) {
        return;
    }
    if (!settings || !settings.root) {
        throw new Error('settings.root required');
    }
    settings.root = path.resolve(process.cwd(), settings.root);
    /**
     * cache the generate package
     * @type {Object}
     */
    const cache = Object.create(null);
    settings = Object.assign({}, defaultSettings, settings);
    settings.viewExt = settings.viewExt
        ? '.' + settings.viewExt.replace(/^\./, '')
        : '';
    /**
     * generate html with view name and options
     * @param {String} view
     * @param {Object} options
     * @return {String} html
     */
    async function render(view, options) {
        //console.info(444 + view);
        view += settings.viewExt;
        const viewPath = path.join(settings.root, view);
        debug(`render: ${viewPath}`);
        // get from cache
        if (settings.cache && cache[viewPath]) {
            return cache[viewPath].call(options.scope, options);
        }
        const tpl = await fs.readFile(viewPath, 'utf8');
        // override `ejs` node_module `resolveInclude` function
        ejs.resolveInclude = function (name, filename, isDir) {
            if (!path.extname(name)) {
                name += settings.viewExt;
            }
            return parentResolveInclude(name, filename, isDir);
        };
        const fn = ejs.compile(tpl, {
            filename: viewPath,
            _with: settings._with,
            compileDebug: settings.debug && settings.compileDebug,
            debug: settings.debug,
            delimiter: settings.delimiter
        });
        if (settings.cache) {
            cache[viewPath] = fn;
        }
        return fn.call(options.scope, options);
    }
    app.context.render = async function (view, _context) {
        const ctx = this;
        const context = Object.assign({}, ctx.state, _context);
        context.blockFor = contentFor;
        let html = await render(view, context);
        const layout = context.layout === false ? false : (context.layout || settings.layout);
        if (layout) {
            context.body = html;
            // context.defineContent = function(contentName: string) { return locals[contentName] || ''; }
            parseContents(context);
            context.block = function (blockname, default_txt) {
                if (context[blockname]) {
                    return context[blockname];
                }
                else if (default_txt) {
                    return default_txt;
                }
            };
            html = await render(layout, context);
        }
        // if (layout) {
        //   // if using layout
        //   context.body = html;
        //   html = await render2(layout, context);
        // }
        const writeResp = context.writeResp === false ? false : (context.writeResp || settings.writeResp);
        if (writeResp) {
            // normal operation
            ctx.type = 'html';
            ctx.body = html;
        }
        else {
            // only return the html
            return html;
        }
    };
}
exports.default = default_1;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9rb2FlanMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILFlBQVksQ0FBQzs7QUFFYjs7R0FFRztBQUVILE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDOUIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUUzQjs7R0FFRztBQUNILE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQztBQUVoRDs7O0dBR0c7QUFDSCxNQUFNLGVBQWUsR0FBRztJQUN0QixLQUFLLEVBQUUsSUFBSTtJQUNYLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxNQUFNO0lBQ2YsTUFBTSxFQUFFLEVBQUU7SUFDVixZQUFZLEVBQUUsS0FBSztJQUNuQixLQUFLLEVBQUUsS0FBSztJQUNaLFNBQVMsRUFBRSxJQUFJO0NBQ2hCLENBQUM7QUFJRixJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUM7QUFFOUIsU0FBUyxVQUFVLENBQUMsV0FBbUI7SUFDckMsT0FBTyxjQUFjLEdBQUcsV0FBVyxHQUFHLGNBQWMsQ0FBQztBQUN2RCxDQUFDO0FBR0QsU0FBUyxhQUFhLENBQUMsTUFBd0M7SUFDN0QsSUFBSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksRUFDaEMsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxjQUFjLEdBQUcsS0FBSyxHQUFHLGNBQWMsR0FBRyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQ2hGLEtB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