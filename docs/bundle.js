/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/snake.js":
/*!*************************!*\
  !*** ./src/js/snake.js ***!
  \*************************/
/***/ (() => {

window.onload = function () {
  var buttonDifficulty = document.querySelector('#game-over').children[2];

  if (!localStorage.getItem('difficulty')) {
    localStorage.setItem('difficulty', 'Medium');
  } else {
    buttonDifficulty.innerText = localStorage.getItem('difficulty');
  }

  var board = document.querySelector("#table");
  var context = board.getContext("2d");
  var lastKey;
  document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 37:
        lastKey = 37;
        break;

      case 38:
        lastKey = 38;
        break;

      case 39:
        lastKey = 39;
        break;

      case 40:
        lastKey = 40;
        break;

      default:
        break;
    }
  });
  buttonDifficulty.addEventListener('click', function (event) {
    if (event.target.innerHTML === 'Medium') {
      event.target.innerText = 'Hard';
      localStorage.setItem('difficulty', 'Hard');
    } else if (event.target.innerHTML === 'Hard') {
      event.target.innerText = 'Easy';
      localStorage.setItem('difficulty', 'Easy');
    } else if (event.target.innerHTML === 'Easy') {
      event.target.innerText = 'Medium';
      localStorage.setItem('difficulty', 'Medium');
    }
  });
  var startGame = setInterval(game, 110);
  var velo = 1;
  var veloX = 0;
  var veloY = -1;
  var num;

  if (localStorage.getItem('difficulty') === 'Medium') {
    num = 20;
  } else if (localStorage.getItem('difficulty') === 'Easy') {
    num = 10;
  } else {
    num = 30;
  }

  var pieceAmount = num;
  var initialPointX = 10;
  var initialPointY = 9;
  var pieceSize = 600 / num;
  var applePointX = Math.floor(Math.random() * pieceAmount);
  var applePointY = Math.floor(Math.random() * pieceAmount);
  var trail = [];
  var tail = 1;

  function game() {
    if (lastKey === 37 && veloX !== velo && veloY !== 0) {
      veloX = -velo;
      veloY = 0;
    } else if (lastKey === 38 && veloX !== 0 && veloY !== velo) {
      veloX = 0;
      veloY = -velo;
    } else if (lastKey === 39 && veloX !== -velo && veloY !== 0) {
      veloX = velo;
      veloY = 0;
    } else if (lastKey === 40 && veloX !== 0 && veloY !== velo) {
      veloX = 0;
      veloY = velo;
    }

    initialPointX += veloX;
    initialPointY += veloY;

    if (initialPointX < 0) {
      initialPointX = pieceAmount - 1;
    }

    if (initialPointX > pieceAmount - 1) {
      initialPointX = 0;
    }

    if (initialPointY < 0) {
      initialPointY = pieceAmount - 1;
    }

    if (initialPointY > pieceAmount - 1) {
      initialPointY = 0;
    }

    context.fillStyle = "#fcd31f";
    context.fillRect(0, 0, board.width, board.height);
    context.fillStyle = "red";
    context.fillRect(applePointX * pieceSize, applePointY * pieceSize, pieceSize, pieceSize);
    context.fillStyle = "blue";

    for (var i = 0; i < trail.length; i++) {
      arrayTrailColor = context.fillRect(trail[i].x * pieceSize, trail[i].y * pieceSize, pieceSize, pieceSize);

      if (trail[i].x == initialPointX && trail[i].y == initialPointY) {
        veloX = 0;
        veloY = 0;
        lastKey = 1;
        gameOver();
      }
    }

    trail.push({
      x: initialPointX,
      y: initialPointY
    });

    while (trail.length > tail) {
      trail.shift();
    }

    if (applePointX == initialPointX && applePointY == initialPointY) {
      tail++;
      applePointX = Math.floor(Math.random() * pieceAmount);
      applePointY = Math.floor(Math.random() * pieceAmount);
    }

    function gameOver() {
      var gameOverScreen = document.querySelector('#game-over');
      gameOverScreen.style.display = 'flex';
    }
  }
};

/***/ }),

/***/ "./src/sass/style.scss":
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/images/favicon.png":
/*!***************************************!*\
  !*** ./src/assets/images/favicon.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/favicon.png";

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_images_favicon_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/images/favicon.png */ "./src/assets/images/favicon.png");
/* harmony import */ var _snake_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snake.js */ "./src/js/snake.js");
/* harmony import */ var _snake_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_snake_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sass/style.scss */ "./src/sass/style.scss");



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map