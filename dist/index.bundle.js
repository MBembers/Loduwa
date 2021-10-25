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

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Fridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Fridge */ \"./src/Fridge.ts\");\n\r\nvar F;\r\ndocument.querySelector(\"#start\").addEventListener(\"click\", function () {\r\n    var name = document.querySelector(\"#fridge-inp\").value;\r\n    F = new _Fridge__WEBPACK_IMPORTED_MODULE_0__.Fridge(name);\r\n}, { once: true });\r\nconsole.log(\"halo ee aa\");\r\n\n\n//# sourceURL=webpack:///./src/App.ts?");

/***/ }),

/***/ "./src/Fridge.ts":
/*!***********************!*\
  !*** ./src/Fridge.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Fridge\": () => (/* binding */ Fridge)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n/* harmony import */ var _Magnet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Magnet */ \"./src/Magnet.ts\");\n\r\n\r\nvar Fridge = /** @class */ (function () {\r\n    function Fridge(name) {\r\n        var _this = this;\r\n        this.magnets = [];\r\n        this.count = 0;\r\n        this.label = document.querySelector(\"#f-name\");\r\n        this.addButton = document.querySelector(\"#add-btn\");\r\n        this.counters = [\r\n            document.querySelector(\"#counter\"),\r\n            document.querySelector(\"#current\"),\r\n        ];\r\n        this.name = name;\r\n        this.label.innerText = this.name;\r\n        _consts__WEBPACK_IMPORTED_MODULE_0__.root.style.setProperty(\"--overlay-display\", \"none\");\r\n        this.addButton.addEventListener(\"click\", function () {\r\n            _this.count++;\r\n            var magnet = new _Magnet__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_this.count);\r\n            magnet.addDeleteListener(function () { return _this.deleteMagnet(magnet.id); });\r\n            _this.magnets.push(magnet);\r\n            console.log(magnet);\r\n            magnet.element.addEventListener(\"mousedown\", function (event) {\r\n                var div = event.target;\r\n                console.log(div);\r\n                div.style.zIndex = String(_this.count + 1);\r\n            });\r\n            _this.current = _this.magnets.length;\r\n            _this.render();\r\n        });\r\n        this.current = this.magnets.length;\r\n    }\r\n    Fridge.prototype.deleteMagnet = function (id) {\r\n        this.magnets = this.magnets.filter(function (m) { return m.id !== id; });\r\n        this.current = this.magnets.length;\r\n        this.render();\r\n    };\r\n    Fridge.prototype.render = function () {\r\n        this.counters[0].innerText = String(this.count);\r\n        this.counters[1].innerText = String(this.current);\r\n    };\r\n    return Fridge;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/Fridge.ts?");

/***/ }),

/***/ "./src/Magnet.ts":
/*!***********************!*\
  !*** ./src/Magnet.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Magnet = /** @class */ (function () {\r\n    function Magnet(id, options) {\r\n        if (options) {\r\n            this.id = id;\r\n            this.x = options.x;\r\n            this.y = options.y;\r\n            this.height = options.height;\r\n            this.width = options.width;\r\n            this.text = options.text;\r\n        }\r\n        else {\r\n            this.id = id;\r\n            this.x = 150;\r\n            this.y = 200;\r\n            this.width = 250;\r\n            this.height = 250;\r\n            this.text = \"essa\";\r\n        }\r\n        this.element = document.createElement(\"div\");\r\n        this.element.className = \"magnet\";\r\n        this.element.style.top = this.y + \"px\";\r\n        this.element.style.left = this.x + \"px\";\r\n        this.element.style.width = this.width + \"px\";\r\n        this.element.style.height = this.height + \"px\";\r\n        this.deleteButton = document.createElement(\"div\");\r\n        this.deleteButton.className = \"del-btn\";\r\n        this.resizeButton = document.createElement(\"div\");\r\n        this.resizeButton.className = \"res-btn\";\r\n        this.textSpan = document.createElement(\"span\");\r\n        this.textSpan.className = \"text-span\";\r\n        document.querySelector(\".main\").appendChild(this.element);\r\n        this.element.appendChild(this.textSpan);\r\n        this.element.appendChild(this.deleteButton);\r\n        this.element.appendChild(this.resizeButton);\r\n        this.render();\r\n        this.addListeners();\r\n    }\r\n    Magnet.prototype.addDeleteListener = function (listener) {\r\n        this.handler = listener;\r\n    };\r\n    Magnet.prototype.addListeners = function () {\r\n        var _this = this;\r\n        this.element.addEventListener(\"mousedown\", function (event) {\r\n            // event.preventDefault();\r\n            _this.element.style.backgroundColor = \"lightyellow\";\r\n            _this.xOffset = event.clientX - _this.x;\r\n            _this.yOffset = event.clientY - _this.y;\r\n            if (!_this.isResized)\r\n                _this.isDragged = true;\r\n            console.log(\"DOWN\");\r\n        });\r\n        document.addEventListener(\"mouseup\", function (event) {\r\n            _this.isDragged = false;\r\n            _this.isResized = false;\r\n            _this.element.style.backgroundColor = \"white\";\r\n            console.log(\"UP\");\r\n        });\r\n        document.addEventListener(\"mousemove\", function (event) {\r\n            event.preventDefault();\r\n            // console.log(event);\r\n            if (_this.isDragged) {\r\n                _this.x = event.clientX - _this.xOffset;\r\n                _this.y = event.clientY - _this.yOffset;\r\n                if (_this.x < 10)\r\n                    _this.x = 10;\r\n                if (_this.y < 10)\r\n                    _this.y = 10;\r\n                if (_this.x > window.innerWidth - _this.width - 10)\r\n                    _this.x = window.innerWidth - _this.width - 10;\r\n                if (_this.y > window.innerHeight - _this.height - 10)\r\n                    _this.y = window.innerHeight - _this.height - 10;\r\n            }\r\n            if (_this.isResized) {\r\n                _this.width = event.clientX - _this.xresize + 3;\r\n                _this.height = event.clientY - _this.yresize + 3;\r\n            }\r\n            _this.render();\r\n        });\r\n        this.resizeButton.addEventListener(\"mousedown\", function (event) {\r\n            _this.isResized = true;\r\n            _this.xresize = _this.x;\r\n            _this.yresize = _this.y;\r\n            _this.render();\r\n        });\r\n        this.deleteButton.addEventListener(\"click\", function () {\r\n            console.log(_this.handler);\r\n            if (_this.handler) {\r\n                console.log(\"DELETE\");\r\n                _this.element.remove();\r\n                _this.handler();\r\n            }\r\n        });\r\n    };\r\n    Magnet.prototype.render = function () {\r\n        if (this.element) {\r\n            this.element.style.top = this.y + \"px\";\r\n            this.element.style.left = this.x + \"px\";\r\n            this.element.style.width = this.width + \"px\";\r\n            this.element.style.height = this.height + \"px\";\r\n            this.textSpan.innerHTML = this.text;\r\n        }\r\n    };\r\n    return Magnet;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Magnet);\r\n\n\n//# sourceURL=webpack:///./src/Magnet.ts?");

/***/ }),

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"root\": () => (/* binding */ root)\n/* harmony export */ });\nvar root = document.documentElement;\r\n\n\n//# sourceURL=webpack:///./src/consts.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/App.ts");
/******/ 	
/******/ })()
;