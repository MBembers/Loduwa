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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Fridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Fridge */ \"./src/Fridge.ts\");\n\nvar F;\ndocument.querySelector(\"#start\").addEventListener(\"click\", function () {\n    var name = document.querySelector(\"#fridge-inp\").value;\n    F = new _Fridge__WEBPACK_IMPORTED_MODULE_0__.Fridge(name);\n}, { once: true });\nconsole.log(\"halo ee aa\");\n\n\n//# sourceURL=webpack://loduwa/./src/App.ts?");

/***/ }),

/***/ "./src/Fridge.ts":
/*!***********************!*\
  !*** ./src/Fridge.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Fridge\": () => (/* binding */ Fridge)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n/* harmony import */ var _Magnet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Magnet */ \"./src/Magnet.ts\");\n\n\nvar Fridge = /** @class */ (function () {\n    function Fridge(name) {\n        var _this = this;\n        this.magnets = [];\n        this.count = 0;\n        this.label = document.querySelector(\"#f-name\");\n        this.addButton = document.querySelector(\"#add-btn\");\n        this.counters = [\n            document.querySelector(\"#counter\"),\n            document.querySelector(\"#current\"),\n        ];\n        this.name = name;\n        this.label.innerText = this.name;\n        _consts__WEBPACK_IMPORTED_MODULE_0__.root.style.setProperty(\"--overlay-display\", \"none\");\n        this.addButton.addEventListener(\"click\", function () {\n            _this.count++;\n            var magnet = new _Magnet__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_this.count);\n            magnet.onDelete(function () { return _this.deleteMagnet(magnet.id); });\n            _this.magnets.push(magnet);\n            console.log(magnet);\n            magnet.element.addEventListener(\"mousedown\", function (event) {\n                var div = event.target;\n                console.log(div);\n                magnet.zIndex = Math.max.apply(Math, _this.magnets.map(function (m) { return m.zIndex; })) + 1;\n                magnet.render();\n            });\n            _this.current = _this.magnets.length;\n            _this.render();\n        });\n        this.current = this.magnets.length;\n    }\n    Fridge.prototype.deleteMagnet = function (id) {\n        this.magnets = this.magnets.filter(function (m) { return m.id !== id; });\n        this.current = this.magnets.length;\n        this.render();\n    };\n    Fridge.prototype.render = function () {\n        this.counters[0].innerText = String(this.count);\n        this.counters[1].innerText = String(this.current);\n    };\n    return Fridge;\n}());\n\n\n\n//# sourceURL=webpack://loduwa/./src/Fridge.ts?");

/***/ }),

/***/ "./src/Magnet.ts":
/*!***********************!*\
  !*** ./src/Magnet.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Magnet = /** @class */ (function () {\n    function Magnet(id, options) {\n        if (options) {\n            this.id = id;\n            this.x = options.x;\n            this.y = options.y;\n            this.height = options.height;\n            this.width = options.width;\n            this.zIndex = options.zIndex;\n            this.text = options.text;\n        }\n        else {\n            this.id = id;\n            this.x = 150;\n            this.y = 200;\n            this.width = 250;\n            this.height = 250;\n            this.zIndex = id;\n            this.text = \"essa\";\n        }\n        this.element = document.createElement(\"div\");\n        this.element.className = \"magnet\";\n        this.element.style.top = this.y + \"px\";\n        this.element.style.left = this.x + \"px\";\n        this.element.style.width = this.width + \"px\";\n        this.element.style.height = this.height + \"px\";\n        this.deleteButton = document.createElement(\"div\");\n        this.deleteButton.className = \"del-btn\";\n        this.resizeButton = document.createElement(\"div\");\n        this.resizeButton.className = \"res-btn\";\n        this.textSpan = document.createElement(\"span\");\n        this.textSpan.className = \"text-span\";\n        document.querySelector(\".main\").appendChild(this.element);\n        this.element.appendChild(this.textSpan);\n        this.element.appendChild(this.deleteButton);\n        this.element.appendChild(this.resizeButton);\n        this.render();\n        this.addListeners();\n    }\n    Magnet.prototype.onDelete = function (listener) {\n        this.handler = listener;\n    };\n    Magnet.prototype.addListeners = function () {\n        var _this = this;\n        this.element.addEventListener(\"mousedown\", function (event) {\n            // event.preventDefault();\n            _this.element.style.backgroundColor = \"lightyellow\";\n            _this.xOffset = event.clientX - _this.x;\n            _this.yOffset = event.clientY - _this.y;\n            if (!_this.isResized)\n                _this.isDragged = true;\n            console.log(\"DOWN\");\n        });\n        document.addEventListener(\"mouseup\", function (event) {\n            _this.isDragged = false;\n            _this.isResized = false;\n            _this.element.style.backgroundColor = \"white\";\n            console.log(\"UP\");\n        });\n        document.addEventListener(\"mousemove\", function (event) {\n            event.preventDefault();\n            // console.log(event);\n            if (_this.isDragged) {\n                _this.x = event.clientX - _this.xOffset;\n                _this.y = event.clientY - _this.yOffset;\n                if (_this.x < 10)\n                    _this.x = 10;\n                if (_this.y < 10)\n                    _this.y = 10;\n                if (_this.x > window.innerWidth - _this.width - 10)\n                    _this.x = window.innerWidth - _this.width - 10;\n                if (_this.y > window.innerHeight - _this.height - 10)\n                    _this.y = window.innerHeight - _this.height - 10;\n            }\n            if (_this.isResized) {\n                _this.width = event.clientX - _this.xresize + 3;\n                _this.height = event.clientY - _this.yresize + 3;\n            }\n            _this.render();\n        });\n        this.resizeButton.addEventListener(\"mousedown\", function (event) {\n            _this.isResized = true;\n            _this.xresize = _this.x;\n            _this.yresize = _this.y;\n            _this.render();\n        });\n        this.deleteButton.addEventListener(\"click\", function () {\n            console.log(_this.handler);\n            if (_this.handler) {\n                console.log(\"DELETE\");\n                _this.element.remove();\n                _this.handler();\n            }\n        });\n    };\n    Magnet.prototype.render = function () {\n        if (this.element) {\n            this.element.style.top = this.y + \"px\";\n            this.element.style.left = this.x + \"px\";\n            this.element.style.width = this.width + \"px\";\n            this.element.style.height = this.height + \"px\";\n            this.element.style.zIndex = String(this.zIndex);\n            this.textSpan.innerHTML = this.text;\n        }\n    };\n    return Magnet;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Magnet);\n\n\n//# sourceURL=webpack://loduwa/./src/Magnet.ts?");

/***/ }),

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"root\": () => (/* binding */ root)\n/* harmony export */ });\nvar root = document.documentElement;\n\n\n//# sourceURL=webpack://loduwa/./src/consts.ts?");

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