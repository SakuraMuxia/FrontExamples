/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_one__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/one */ \"./src/js/one.js\");\n/* harmony import */ var _js_two__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/two */ \"./src/js/two.js\");\n/* harmony import */ var _js_three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/three */ \"./src/js/three.js\");\n/* harmony import */ var _json_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./json/data */ \"./src/json/data.json\");\n// 导入模块\r\n   // 扩展名可以省略\r\n   // 扩展名可以省略\r\n   // 扩展名可以省略\r\n\r\n// 导入json\r\n  //  扩展名可以省略\r\n\r\n(0,_js_one__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n(0,_js_two__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n(0,_js_three__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\r\nconsole.log(_json_data__WEBPACK_IMPORTED_MODULE_3__);\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/js/one.js":
/*!***********************!*\
  !*** ./src/js/one.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\r\n    console.log('one one one');\r\n});\n\n//# sourceURL=webpack:///./src/js/one.js?");

/***/ }),

/***/ "./src/js/three.js":
/*!*************************!*\
  !*** ./src/js/three.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\r\n    console.log('three three three');\r\n});\n\n//# sourceURL=webpack:///./src/js/three.js?");

/***/ }),

/***/ "./src/js/two.js":
/*!***********************!*\
  !*** ./src/js/two.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\r\n    console.log('two two two');\r\n});\n\n//# sourceURL=webpack:///./src/js/two.js?");

/***/ }),

/***/ "./src/json/data.json":
/*!****************************!*\
  !*** ./src/json/data.json ***!
  \****************************/
/***/ ((module) => {

eval("module.exports = /*#__PURE__*/JSON.parse('[{\"name\":\"MinatoAqua\",\"age\":19},{\"name\":\"嘤巫女\",\"age\":18}]');\n\n//# sourceURL=webpack:///./src/json/data.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;