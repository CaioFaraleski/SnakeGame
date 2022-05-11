/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/snake.js":
/*!*************************!*\
  !*** ./src/js/snake.js ***!
  \*************************/
/***/ (() => {

window.onload = function () {
  var buttonDifficulty = document.querySelector('#game-over').children[2];
  var buttonStart = document.querySelector('#game-over').children[1];

  if (!localStorage.getItem('difficulty')) {
    localStorage.setItem('difficulty', 'Medium');
    buttonDifficulty.innerText = localStorage.getItem('difficulty');
  } else {
    buttonDifficulty.innerText = localStorage.getItem('difficulty');
  }

  if (localStorage.getItem('bestScore')) {
    displayBestScore.children[0].innerText = localStorage.getItem('bestScore');
  }

  var board = document.querySelector("#table");
  var context = board.getContext("2d");
  var lastKey;
  displayDifficulty.children[0].innerText = localStorage.getItem('difficulty');
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

    displayDifficulty.children[0].innerText = localStorage.getItem('difficulty');
  });

  function start() {
    var gameOverScreen = document.querySelector('#game-over');
    gameOverScreen.style.display = 'none';

    if (localStorage.getItem('difficulty') === 'Medium') {
      pieceSize = 600 / 20;
      pieceAmount = 20;
    } else if (localStorage.getItem('difficulty') === 'Easy') {
      pieceSize = 600 / 10;
      pieceAmount = 10;
    } else {
      pieceSize = 600 / 25;
      pieceAmount = 25;
    }

    lastKey = 0;
    initialPointX = pieceAmount - Math.floor(pieceAmount / 2);
    initialPointY = pieceAmount - 1;
    applePointX = Math.floor(Math.random() * pieceAmount);
    applePointY = Math.floor(Math.random() * pieceAmount);
    veloX = 0;
    veloY = -1;
    displayScore.children[0].innerText = score;
  }

  buttonStart.addEventListener('click', function (event) {
    start();
  });
  var startGame = setInterval(game, 90);
  var velo = 1;
  var veloX = 0;
  var veloY = -1;
  var num;

  if (localStorage.getItem('difficulty') === 'Medium') {
    num = 20;
  } else if (localStorage.getItem('difficulty') === 'Easy') {
    num = 10;
  } else {
    num = 25;
  }

  var pieceAmount = num;
  var initialPointX = pieceAmount - Math.floor(pieceAmount / 2);
  var initialPointY = pieceAmount - 1;
  var pieceSize = 600 / num;
  var applePointX = Math.floor(Math.random() * pieceAmount);
  var applePointY = Math.floor(Math.random() * pieceAmount);
  var trail = [];
  var tail = 1;
  var score = 0;

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
      gameOver();
    } else if (initialPointX > pieceAmount - 1) {
      gameOver();
    } else if (initialPointY < 0) {
      gameOver();
    } else if (initialPointY > pieceAmount - 1) {
      gameOver();
    }

    for (var i = 0; i < pieceAmount; i++) {
      for (var j = 0; j < pieceAmount; j++) {
        if ((i + j) % 2 === 0) {
          context.fillStyle = "#fcd31f";
          context.fillRect(j * pieceSize, i * pieceSize, pieceSize, pieceSize);
        } else {
          context.fillStyle = "#dfb913";
          context.fillRect(j * pieceSize, i * pieceSize, pieceSize, pieceSize);
        }
      }
    }

    context.fillStyle = "red";
    context.fillRect(applePointX * pieceSize + 20 * pieceSize / 100, applePointY * pieceSize + 20 * pieceSize / 100, pieceSize - 40 * pieceSize / 100, pieceSize - 40 * pieceSize / 100);
    context.fillStyle = "blue";

    for (var _i = 0; _i < trail.length; _i++) {
      arrayTrailColor = context.fillRect(trail[_i].x * pieceSize, trail[_i].y * pieceSize, pieceSize - 1, pieceSize - 1);

      if (trail[_i].x == initialPointX && trail[_i].y == initialPointY) {
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
      var diferent = false;
      tail++;
      score++;

      if (!localStorage.getItem('bestScore')) {
        localStorage.setItem('bestScore', score);
      } else {
        if (Number(localStorage.getItem('bestScore')) < score) {
          localStorage.setItem('bestScore', score);
        }
      }

      displayScore.children[0].innerText = score;
      displayBestScore.children[0].innerText = localStorage.getItem('bestScore');

      while (applePointX == initialPointX && applePointY == initialPointY && diferent !== true) {
        applePointX = Math.floor(Math.random() * pieceAmount);
        applePointY = Math.floor(Math.random() * pieceAmount);

        if (trail.length > 0) {
          for (var _i2 = 0; _i2 < trail.length; _i2++) {
            if (trail[_i2].x !== applePointX && trail[_i2].y !== applePointY) {
              diferent = true;
            }
          }
        }
      }
    }
  }

  function gameOver() {
    var gameOverScreen = document.querySelector('#game-over');
    gameOverScreen.style.display = 'flex';
    initialPointX -= veloX;
    initialPointY -= veloY;
    veloX = 0;
    veloY = 0;
    tail = 1;
    lastKey = 1;
    score = 0;
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