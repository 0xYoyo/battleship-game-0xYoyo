/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./helpers/helpers.js":
/*!****************************!*\
  !*** ./helpers/helpers.js ***!
  \****************************/
/***/ ((module) => {

const randomCoords = () => {
  const xNum = Math.floor(Math.random() * 10);
  const yNum = Math.floor(Math.random() * 10);
  return [xNum, yNum];
};

const initBoards = (board1, location1, board2, location2) => {
  board1.getGrid().forEach((column) => {
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement("button");
      location1.appendChild(cell);
    }
  });
  board2.getGrid().forEach((column) => {
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement("button");
      location2.appendChild(cell);
    }
  });
};
module.exports = { randomCoords, initBoards };


/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameBoard": () => (/* binding */ GameBoard),
/* harmony export */   "createGrid": () => (/* binding */ createGrid)
/* harmony export */ });
/* harmony import */ var _src_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/ship */ "./src/ship.js");


const GameBoard = () => {
  // Initialize board
  const newGrid = [];
  for (let i = 0; i < 10; i++) {
    newGrid[i] = new Array(10);
  }
  let sunkCounter = 0;
  let direction = "horizontal";
  // Direction changer
  const changeDirection = () => {
    if (direction == "horizontal") {
      direction = "vertical";
    } else {
      direction = "horizontal";
    }
  };
  // Direction randomizer
  const randomDirection = () => {
    if (Math.random() > 0.5) {
      changeDirection;
    }
  };
  // Placement validation
  const validatePlace = (x, y, len) => {
    for (let i = 0; i < len; i++) {
      if (newGrid[x][y] != undefined) {
        return false;
      }
      if (direction == "horizontal") {
        x++;
      } else {
        y++;
      }
    }
    return true;
  };
  // Place ship on board
  const placeShip = (x, y, len) => {
    const newShip = (0,_src_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(len);
    for (let i = 0; i < len; i++) {
      newGrid[x][y] = newShip;
      if (direction == "horizontal") {
        x++;
      } else {
        y++;
      }
    }
  };
  // Receives attacks on specific coordinates
  const receiveAttack = (x, y) => {
    if (newGrid[x][y] == undefined) {
      newGrid[x][y] = "miss";
      return newGrid[x][y];
    } else if (
      newGrid[x][y] != undefined &&
      newGrid[x][y] != "hit" &&
      newGrid[x][y] != "miss"
    ) {
      newGrid[x][y].hit();
      if (newGrid[x][y].isSunk() == true) {
        sunkCounter++;
      }
      newGrid[x][y] = "hit";
      return newGrid[x][y];
    } else {
      return false;
    }
  };
  const getGrid = () => {
    return newGrid;
  };
  const allSunk = () => {
    if (sunkCounter == 5) {
      return true;
    } else {
      return false;
    }
  };
  return {
    placeShip,
    receiveAttack,
    getGrid,
    allSunk,
    changeDirection,
    randomDirection,
    validatePlace,
  };
};

const createGrid = () => {
  const grid = [];
  for (let i = 0; i < 10; i++) {
    grid[i] = new Array(10);
  }
  return grid;
};




/***/ }),

/***/ "./src/gameLoop.js":
/*!*************************!*\
  !*** ./src/gameLoop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newGame": () => (/* binding */ newGame)
/* harmony export */ });
/* harmony import */ var _src_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/player */ "./src/player.js");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/helpers */ "./helpers/helpers.js");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_gameBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _src_ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/ship */ "./src/ship.js");





const newGame = () => {
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  // Initialize game
  const p1 = (0,_src_player__WEBPACK_IMPORTED_MODULE_0__.Player)();
  const p1Board = (0,_src_gameBoard__WEBPACK_IMPORTED_MODULE_2__.GameBoard)();
  const p2 = (0,_src_player__WEBPACK_IMPORTED_MODULE_0__.Player)();
  const p2Board = (0,_src_gameBoard__WEBPACK_IMPORTED_MODULE_2__.GameBoard)();
  (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.initBoards)(p1Board, left, p2Board, right);

  const renderBoard = (board) => {};
  return { renderBoard };
};




/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _src_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/ship */ "./src/ship.js");
/* harmony import */ var _src_gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/helpers */ "./helpers/helpers.js");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__);




const Player = () => {
  let name;
  const attack = (x, y, board) => {
    console.log(board.getGrid()[x][y]);
    if (board.getGrid()[x][y] != "hit" && board.getGrid()[x][y] != "miss") {
      board.receiveAttack(x, y);
    } else {
      return false;
    }
  };

  const randomAttack = (board) => {
    attack(...(0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__.randomCoords)(), board);
  };
  return { attack, randomAttack };
};




/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
const Ship = (len = 3) => {
  len;
  let hitCount = 0;
  let hasSunk = false;
  const hit = () => {
    hitCount++;
  };
  const isSunk = () => {
    if (len == hitCount) {
      hasSunk = true;
    }
    return hasSunk;
  };
  return { len, hit, isSunk };
};




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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_gameLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/gameLoop */ "./src/gameLoop.js");


(0,_src_gameLoop__WEBPACK_IMPORTED_MODULE_0__.newGame)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLG1CQUFtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJnQjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwrQ0FBSTtBQUN4QixvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRWlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuR007QUFDdUI7QUFDTDtBQUN0Qjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1EQUFNO0FBQ25CLGtCQUFrQix5REFBUztBQUMzQixhQUFhLG1EQUFNO0FBQ25CLGtCQUFrQix5REFBUztBQUMzQixFQUFFLDREQUFVOztBQUVaO0FBQ0EsV0FBVztBQUNYOztBQUVtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQmdCO0FBQ1U7QUFDSzs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsOERBQVk7QUFDMUI7QUFDQSxXQUFXO0FBQ1g7O0FBRWtCOzs7Ozs7Ozs7Ozs7Ozs7O0FDckJsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFZ0I7Ozs7Ozs7VUNoQmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjBDOztBQUUxQyxzREFBTyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0weHlveW8vLi9oZWxwZXJzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLTB4eW95by8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLTB4eW95by8uL3NyYy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtMHh5b3lvLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtMHh5b3lvLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLTB4eW95by93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtMHh5b3lvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0weHlveW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0weHlveW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtMHh5b3lvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLTB4eW95by8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByYW5kb21Db29yZHMgPSAoKSA9PiB7XG4gIGNvbnN0IHhOdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIGNvbnN0IHlOdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIHJldHVybiBbeE51bSwgeU51bV07XG59O1xuXG5jb25zdCBpbml0Qm9hcmRzID0gKGJvYXJkMSwgbG9jYXRpb24xLCBib2FyZDIsIGxvY2F0aW9uMikgPT4ge1xuICBib2FyZDEuZ2V0R3JpZCgpLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBsb2NhdGlvbjEuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICB9KTtcbiAgYm9hcmQyLmdldEdyaWQoKS5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgbG9jYXRpb24yLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgfSk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7IHJhbmRvbUNvb3JkcywgaW5pdEJvYXJkcyB9O1xuIiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuLi9zcmMvc2hpcFwiO1xuXG5jb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIC8vIEluaXRpYWxpemUgYm9hcmRcbiAgY29uc3QgbmV3R3JpZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBuZXdHcmlkW2ldID0gbmV3IEFycmF5KDEwKTtcbiAgfVxuICBsZXQgc3Vua0NvdW50ZXIgPSAwO1xuICBsZXQgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gIC8vIERpcmVjdGlvbiBjaGFuZ2VyXG4gIGNvbnN0IGNoYW5nZURpcmVjdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoZGlyZWN0aW9uID09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICAgIH1cbiAgfTtcbiAgLy8gRGlyZWN0aW9uIHJhbmRvbWl6ZXJcbiAgY29uc3QgcmFuZG9tRGlyZWN0aW9uID0gKCkgPT4ge1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBjaGFuZ2VEaXJlY3Rpb247XG4gICAgfVxuICB9O1xuICAvLyBQbGFjZW1lbnQgdmFsaWRhdGlvblxuICBjb25zdCB2YWxpZGF0ZVBsYWNlID0gKHgsIHksIGxlbikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChuZXdHcmlkW3hdW3ldICE9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoZGlyZWN0aW9uID09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgIHgrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHkrKztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIC8vIFBsYWNlIHNoaXAgb24gYm9hcmRcbiAgY29uc3QgcGxhY2VTaGlwID0gKHgsIHksIGxlbikgPT4ge1xuICAgIGNvbnN0IG5ld1NoaXAgPSBTaGlwKGxlbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgbmV3R3JpZFt4XVt5XSA9IG5ld1NoaXA7XG4gICAgICBpZiAoZGlyZWN0aW9uID09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgIHgrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHkrKztcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIC8vIFJlY2VpdmVzIGF0dGFja3Mgb24gc3BlY2lmaWMgY29vcmRpbmF0ZXNcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKG5ld0dyaWRbeF1beV0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdHcmlkW3hdW3ldID0gXCJtaXNzXCI7XG4gICAgICByZXR1cm4gbmV3R3JpZFt4XVt5XTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgbmV3R3JpZFt4XVt5XSAhPSB1bmRlZmluZWQgJiZcbiAgICAgIG5ld0dyaWRbeF1beV0gIT0gXCJoaXRcIiAmJlxuICAgICAgbmV3R3JpZFt4XVt5XSAhPSBcIm1pc3NcIlxuICAgICkge1xuICAgICAgbmV3R3JpZFt4XVt5XS5oaXQoKTtcbiAgICAgIGlmIChuZXdHcmlkW3hdW3ldLmlzU3VuaygpID09IHRydWUpIHtcbiAgICAgICAgc3Vua0NvdW50ZXIrKztcbiAgICAgIH1cbiAgICAgIG5ld0dyaWRbeF1beV0gPSBcImhpdFwiO1xuICAgICAgcmV0dXJuIG5ld0dyaWRbeF1beV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGdldEdyaWQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ld0dyaWQ7XG4gIH07XG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgaWYgKHN1bmtDb3VudGVyID09IDUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldEdyaWQsXG4gICAgYWxsU3VuayxcbiAgICBjaGFuZ2VEaXJlY3Rpb24sXG4gICAgcmFuZG9tRGlyZWN0aW9uLFxuICAgIHZhbGlkYXRlUGxhY2UsXG4gIH07XG59O1xuXG5jb25zdCBjcmVhdGVHcmlkID0gKCkgPT4ge1xuICBjb25zdCBncmlkID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGdyaWRbaV0gPSBuZXcgQXJyYXkoMTApO1xuICB9XG4gIHJldHVybiBncmlkO1xufTtcblxuZXhwb3J0IHsgR2FtZUJvYXJkLCBjcmVhdGVHcmlkIH07XG4iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi4vc3JjL3BsYXllclwiO1xuaW1wb3J0IHsgcmFuZG9tQ29vcmRzLCBpbml0Qm9hcmRzIH0gZnJvbSBcIi4uL2hlbHBlcnMvaGVscGVyc1wiO1xuaW1wb3J0IHsgR2FtZUJvYXJkLCBjcmVhdGVHcmlkIH0gZnJvbSBcIi4uL3NyYy9nYW1lQm9hcmRcIjtcbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi4vc3JjL3NoaXBcIjtcblxuY29uc3QgbmV3R2FtZSA9ICgpID0+IHtcbiAgY29uc3QgbGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGVmdFwiKTtcbiAgY29uc3QgcmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJpZ2h0XCIpO1xuICAvLyBJbml0aWFsaXplIGdhbWVcbiAgY29uc3QgcDEgPSBQbGF5ZXIoKTtcbiAgY29uc3QgcDFCb2FyZCA9IEdhbWVCb2FyZCgpO1xuICBjb25zdCBwMiA9IFBsYXllcigpO1xuICBjb25zdCBwMkJvYXJkID0gR2FtZUJvYXJkKCk7XG4gIGluaXRCb2FyZHMocDFCb2FyZCwgbGVmdCwgcDJCb2FyZCwgcmlnaHQpO1xuXG4gIGNvbnN0IHJlbmRlckJvYXJkID0gKGJvYXJkKSA9PiB7fTtcbiAgcmV0dXJuIHsgcmVuZGVyQm9hcmQgfTtcbn07XG5cbmV4cG9ydCB7IG5ld0dhbWUgfTtcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi4vc3JjL3NoaXBcIjtcbmltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuLi9zcmMvZ2FtZUJvYXJkXCI7XG5pbXBvcnQgeyByYW5kb21Db29yZHMgfSBmcm9tIFwiLi4vaGVscGVycy9oZWxwZXJzXCI7XG5cbmNvbnN0IFBsYXllciA9ICgpID0+IHtcbiAgbGV0IG5hbWU7XG4gIGNvbnN0IGF0dGFjayA9ICh4LCB5LCBib2FyZCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGJvYXJkLmdldEdyaWQoKVt4XVt5XSk7XG4gICAgaWYgKGJvYXJkLmdldEdyaWQoKVt4XVt5XSAhPSBcImhpdFwiICYmIGJvYXJkLmdldEdyaWQoKVt4XVt5XSAhPSBcIm1pc3NcIikge1xuICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByYW5kb21BdHRhY2sgPSAoYm9hcmQpID0+IHtcbiAgICBhdHRhY2soLi4ucmFuZG9tQ29vcmRzKCksIGJvYXJkKTtcbiAgfTtcbiAgcmV0dXJuIHsgYXR0YWNrLCByYW5kb21BdHRhY2sgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiY29uc3QgU2hpcCA9IChsZW4gPSAzKSA9PiB7XG4gIGxlbjtcbiAgbGV0IGhpdENvdW50ID0gMDtcbiAgbGV0IGhhc1N1bmsgPSBmYWxzZTtcbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIGhpdENvdW50Kys7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZiAobGVuID09IGhpdENvdW50KSB7XG4gICAgICBoYXNTdW5rID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc1N1bms7XG4gIH07XG4gIHJldHVybiB7IGxlbiwgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBuZXdHYW1lIH0gZnJvbSBcIi4uL3NyYy9nYW1lTG9vcFwiO1xuXG5uZXdHYW1lKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=