/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./jssrc/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./jssrc/index.ts":
/*!************************!*\
  !*** ./jssrc/index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/***
 *                                         ,s555SB00&
 *                                      :9H####00000Xi
 *                                     1000000000000008
 *                                   ,8000000000B0000008
 *                                  :B0000X3hi8Bs;B00000Ah,
 *             ,8i                  r000B:     1S ,M000000#8;
 *            1AB35.i:               X008 .   SGhr ,A00000000S
 *            10h31MX8                18Hhh3i .i3r ,A0000000005
 *            ;0&i,58r5                 rGSS:     :B0000000000A
 *             1#i  . 9i                 hX.  .: .5000000000001
 *              sG1,  ,G53s.              9#Xi;hS5 3B0000000B1
 *               .h8h.,A000MXSs,           #0H1:    3ssSSX01
 *               s ,000000000000Xhi,       r#00X1s9M8    .GA981
 *               ,. rS8H#0000000000#HG51;.  .h31i;90r    .80000BS;i;
 *                .19AXXXAB00000000000000#MHXG893hrX#XGGXM0000000000MS
 *                s00MM000hsX#0000000000000000000000000000000000000000&,
 *              :GB0#3G00Brs ,1GM00000000000000000000000000000000000000B,
 *            .hM000#00#MX 51  r;iSGAM00000000000000000000000000000000008
 *          :3B00000000000&90h :Gs   .;sSXH000000000000000000000000000000:
 *      s&HA#00000000000000M89A;.8S.       ,r3000000000000000000000000000r
 *   ,13B00000000000000000005 5B3 ;.         ;000000000000000000000000000i
 *  5#00#&0000000000000000009  .39:          ;000000000000000000000000000;
 *  9000X:MM000000000000000#;    ;31.         H00000000000000000000000000:
 *   SH#0B9.rM0000000000000B       :.         3000000000000000000000000005
 *     ,:.   900000000000#HB5                 .M0000000000000000000000000B
 *           ,ssirhSM0&1;i19911i,.             s00000000000000000000000000S
 *              ,,,rHAri1h1rh&0#353Sh:          80000000000000000000000000#:
 *            .A3hH0#5S553&00#h   i:i9S          #0000000000000000000000000A.
 *
 *
 *    又看源码，看你妹妹呀！
 */
console.log('147');


/***/ })

/******/ });
//# sourceMappingURL=index.js.map