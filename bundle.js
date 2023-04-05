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
  let rowCount = 0;
  board1.getGrid().forEach((row) => {
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement("button");
      location1.appendChild(cell);
      cell.classList.add("leftCell");
      cell.setAttribute("data-", `${[rowCount, i]}`);
      // console.log(cell.getAttribute("data-").charAt(2));
    }
    rowCount++;
  });
  rowCount = 0;
  board2.getGrid().forEach((row) => {
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement("button");
      location2.appendChild(cell);
      cell.classList.add("rightCell");
      cell.setAttribute("data-", `${[rowCount, i]}`);
    }
    rowCount++;
  });
};

const renderBoards = (board1, board2) => {
  const leftCells = document.querySelectorAll(".leftCell");
  const rightCells = document.querySelectorAll(".rightCell");
  leftCells.forEach((cell) => {
    const rowNum = cell.getAttribute("data-").charAt(0);
    const colNum = cell.getAttribute("data-").charAt(2);
    const cellContent = board1.getGrid()[rowNum][colNum];
    if (cellContent == "hit") {
      cell.classList.add("hit");
    } else if (cellContent == "miss") {
      cell.classList.add("miss");
    } else if (cellContent != undefined) {
      cell.classList.add("ship");
    }
  });
  rightCells.forEach((cell) => {
    const rowNum = cell.getAttribute("data-").charAt(0);
    const colNum = cell.getAttribute("data-").charAt(2);
    const cellContent = board2.getGrid()[rowNum][colNum];
    if (cellContent == "hit") {
      cell.classList.add("hit");
    } else if (cellContent == "miss") {
      cell.classList.add("miss");
    }
  });
};

const attackValid = (x, y, board) => {
  if (board.getGrid()[x][y] != "hit" && board.getGrid()[x][y] != "miss") {
    return true;
  } else {
    return false;
  }
};

const disableBoards = () => {
  const leftCells = document.querySelectorAll(".leftCell");
  const rightCells = document.querySelectorAll(".rightCell");
  rightCells.forEach((cell) => {
    cell.disabled = true;
  });
  leftCells.forEach((cell) => {
    cell.disabled = true;
  });
};

module.exports = {
  randomCoords,
  initBoards,
  renderBoards,
  attackValid,
  disableBoards,
};


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
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/helpers */ "./helpers/helpers.js");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/ship */ "./src/ship.js");



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
      changeDirection();
    }
  };
  // Placement validation
  const validatePlace = (x, y, len) => {
    if (direction == "horizontal") {
      if (x + len >= 10) {
        return false;
      }
    } else {
      if (y + len >= 10) {
        return false;
      }
    }
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
    const newShip = (0,_src_ship__WEBPACK_IMPORTED_MODULE_1__.Ship)(len);
    for (let i = 0; i < len; i++) {
      newGrid[x][y] = newShip;
      //console.log([x, y]);
      if (direction == "horizontal") {
        x++;
      } else {
        y++;
      }
    }
  };
  // Randomly place ship on the board
  const randomlyPlaceShip = (shipLen, pBoard) => {
    randomDirection();
    const coords = (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.randomCoords)();
    if (pBoard.validatePlace(...coords, shipLen) == true) {
      pBoard.placeShip(...coords, shipLen);
    } else {
      randomlyPlaceShip(shipLen, pBoard);
    }
  };
  // Receives attacks on specific coordinates
  const receiveAttack = (x, y) => {
    if (newGrid[x][y] == undefined) {
      newGrid[x][y] = "miss";
      //return newGrid[x][y];
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
      // return newGrid[x][y];
    } else {
      // return false;
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
    randomlyPlaceShip,
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
/* harmony export */   "newGame": () => (/* binding */ newGame),
/* harmony export */   "restartGame": () => (/* binding */ restartGame)
/* harmony export */ });
/* harmony import */ var _src_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/player */ "./src/player.js");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/helpers */ "./helpers/helpers.js");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_gameBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _src_ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/ship */ "./src/ship.js");





const newGame = () => {
  const container = document.querySelector(".container");
  const left = document.createElement("div");
  container.appendChild(left);
  left.classList.add("left");
  const right = document.createElement("div");
  container.appendChild(right);
  right.classList.add("right");
  const popUpWin = document.querySelector("#popupW");
  const popUpLose = document.querySelector("#popupL");
  // Initialize game
  const p1 = (0,_src_player__WEBPACK_IMPORTED_MODULE_0__.Player)();
  const p1Board = (0,_src_gameBoard__WEBPACK_IMPORTED_MODULE_2__.GameBoard)();
  const p2 = (0,_src_player__WEBPACK_IMPORTED_MODULE_0__.Player)();
  const p2Board = (0,_src_gameBoard__WEBPACK_IMPORTED_MODULE_2__.GameBoard)();
  (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.initBoards)(p1Board, left, p2Board, right);
  // Place ships
  p2Board.randomlyPlaceShip(5, p2Board);
  p2Board.randomlyPlaceShip(4, p2Board);
  p2Board.randomlyPlaceShip(3, p2Board);
  p2Board.randomlyPlaceShip(3, p2Board);
  p2Board.randomlyPlaceShip(2, p2Board);
  p1Board.randomlyPlaceShip(5, p1Board);
  p1Board.randomlyPlaceShip(4, p1Board);
  p1Board.randomlyPlaceShip(3, p1Board);
  p1Board.randomlyPlaceShip(3, p1Board);
  p1Board.randomlyPlaceShip(2, p1Board);
  (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.renderBoards)(p1Board, p2Board);
  // Attack input event listener
  const rightCells = document.querySelectorAll(".rightCell");
  rightCells.forEach((cell) => {
    cell.addEventListener("click", function (event) {
      const rowNum = cell.getAttribute("data-").charAt(0);
      const colNum = cell.getAttribute("data-").charAt(2);
      if ((0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.attackValid)(rowNum, colNum, p2Board)) {
        p1.attack(rowNum, colNum, p2Board);
        (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.renderBoards)(p1Board, p2Board);
        if (p2Board.allSunk()) {
          (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.disableBoards)();
          popUpWin.style.display = "block";
        } else {
          setTimeout(() => {
            p2.randomAttack(p1Board);
            (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.renderBoards)(p1Board, p2Board);
            if (p1Board.allSunk()) {
              (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.disableBoards)();
              popUpLose.style.display = "block";
            }
          }, 400);
        }
        console.log(p2Board.getGrid());
      } else {
        return;
      }
    });
  });
};

const restartGame = () => {
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  right.remove();
  left.remove();
  newGame();
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
    // console.log(board.getGrid()[x][y]);
    if (board.getGrid()[x][y] != "hit" && board.getGrid()[x][y] != "miss") {
      board.receiveAttack(x, y);
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

// New game listener
const restartButtons = document.querySelectorAll(".popup");
restartButtons.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    (0,_src_gameLoop__WEBPACK_IMPORTED_MODULE_0__.restartGame)();
    btn.style.display = "none";
  });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFZ0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0VHO0FBQ1U7QUFDSzs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsOERBQVk7QUFDMUI7QUFDQSxXQUFXO0FBQ1g7O0FBRWtCOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkJsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFZ0I7Ozs7Ozs7VUNoQmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnVEOztBQUV2RCxzREFBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksMERBQVc7QUFDZjtBQUNBLEdBQUc7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLTB4eW95by8uL2hlbHBlcnMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtMHh5b3lvLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtMHh5b3lvLy4vc3JjL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0weHlveW8vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0weHlveW8vLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtMHh5b3lvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0weHlveW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLTB4eW95by93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLTB4eW95by93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0weHlveW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtMHh5b3lvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHJhbmRvbUNvb3JkcyA9ICgpID0+IHtcbiAgY29uc3QgeE51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgY29uc3QgeU51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgcmV0dXJuIFt4TnVtLCB5TnVtXTtcbn07XG5cbmNvbnN0IGluaXRCb2FyZHMgPSAoYm9hcmQxLCBsb2NhdGlvbjEsIGJvYXJkMiwgbG9jYXRpb24yKSA9PiB7XG4gIGxldCByb3dDb3VudCA9IDA7XG4gIGJvYXJkMS5nZXRHcmlkKCkuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGxvY2F0aW9uMS5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImxlZnRDZWxsXCIpO1xuICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLVwiLCBgJHtbcm93Q291bnQsIGldfWApO1xuICAgICAgLy8gY29uc29sZS5sb2coY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiKS5jaGFyQXQoMikpO1xuICAgIH1cbiAgICByb3dDb3VudCsrO1xuICB9KTtcbiAgcm93Q291bnQgPSAwO1xuICBib2FyZDIuZ2V0R3JpZCgpLmZvckVhY2goKHJvdykgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBsb2NhdGlvbjIuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJyaWdodENlbGxcIik7XG4gICAgICBjZWxsLnNldEF0dHJpYnV0ZShcImRhdGEtXCIsIGAke1tyb3dDb3VudCwgaV19YCk7XG4gICAgfVxuICAgIHJvd0NvdW50Kys7XG4gIH0pO1xufTtcblxuY29uc3QgcmVuZGVyQm9hcmRzID0gKGJvYXJkMSwgYm9hcmQyKSA9PiB7XG4gIGNvbnN0IGxlZnRDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGVmdENlbGxcIik7XG4gIGNvbnN0IHJpZ2h0Q2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJpZ2h0Q2VsbFwiKTtcbiAgbGVmdENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjb25zdCByb3dOdW0gPSBjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtXCIpLmNoYXJBdCgwKTtcbiAgICBjb25zdCBjb2xOdW0gPSBjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtXCIpLmNoYXJBdCgyKTtcbiAgICBjb25zdCBjZWxsQ29udGVudCA9IGJvYXJkMS5nZXRHcmlkKClbcm93TnVtXVtjb2xOdW1dO1xuICAgIGlmIChjZWxsQ29udGVudCA9PSBcImhpdFwiKSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgfSBlbHNlIGlmIChjZWxsQ29udGVudCA9PSBcIm1pc3NcIikge1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICB9IGVsc2UgaWYgKGNlbGxDb250ZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICB9XG4gIH0pO1xuICByaWdodENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjb25zdCByb3dOdW0gPSBjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtXCIpLmNoYXJBdCgwKTtcbiAgICBjb25zdCBjb2xOdW0gPSBjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtXCIpLmNoYXJBdCgyKTtcbiAgICBjb25zdCBjZWxsQ29udGVudCA9IGJvYXJkMi5nZXRHcmlkKClbcm93TnVtXVtjb2xOdW1dO1xuICAgIGlmIChjZWxsQ29udGVudCA9PSBcImhpdFwiKSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgfSBlbHNlIGlmIChjZWxsQ29udGVudCA9PSBcIm1pc3NcIikge1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgYXR0YWNrVmFsaWQgPSAoeCwgeSwgYm9hcmQpID0+IHtcbiAgaWYgKGJvYXJkLmdldEdyaWQoKVt4XVt5XSAhPSBcImhpdFwiICYmIGJvYXJkLmdldEdyaWQoKVt4XVt5XSAhPSBcIm1pc3NcIikge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgZGlzYWJsZUJvYXJkcyA9ICgpID0+IHtcbiAgY29uc3QgbGVmdENlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5sZWZ0Q2VsbFwiKTtcbiAgY29uc3QgcmlnaHRDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmlnaHRDZWxsXCIpO1xuICByaWdodENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLmRpc2FibGVkID0gdHJ1ZTtcbiAgfSk7XG4gIGxlZnRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY2VsbC5kaXNhYmxlZCA9IHRydWU7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJhbmRvbUNvb3JkcyxcbiAgaW5pdEJvYXJkcyxcbiAgcmVuZGVyQm9hcmRzLFxuICBhdHRhY2tWYWxpZCxcbiAgZGlzYWJsZUJvYXJkcyxcbn07XG4iLCJpbXBvcnQgeyByYW5kb21Db29yZHMgfSBmcm9tIFwiLi4vaGVscGVycy9oZWxwZXJzXCI7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4uL3NyYy9zaGlwXCI7XG5cbmNvbnN0IEdhbWVCb2FyZCA9ICgpID0+IHtcbiAgLy8gSW5pdGlhbGl6ZSBib2FyZFxuICBjb25zdCBuZXdHcmlkID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIG5ld0dyaWRbaV0gPSBuZXcgQXJyYXkoMTApO1xuICB9XG4gIGxldCBzdW5rQ291bnRlciA9IDA7XG4gIGxldCBkaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcbiAgLy8gRGlyZWN0aW9uIGNoYW5nZXJcbiAgY29uc3QgY2hhbmdlRGlyZWN0aW9uID0gKCkgPT4ge1xuICAgIGlmIChkaXJlY3Rpb24gPT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gICAgfVxuICB9O1xuICAvLyBEaXJlY3Rpb24gcmFuZG9taXplclxuICBjb25zdCByYW5kb21EaXJlY3Rpb24gPSAoKSA9PiB7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgIGNoYW5nZURpcmVjdGlvbigpO1xuICAgIH1cbiAgfTtcbiAgLy8gUGxhY2VtZW50IHZhbGlkYXRpb25cbiAgY29uc3QgdmFsaWRhdGVQbGFjZSA9ICh4LCB5LCBsZW4pID0+IHtcbiAgICBpZiAoZGlyZWN0aW9uID09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBpZiAoeCArIGxlbiA+PSAxMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh5ICsgbGVuID49IDEwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKG5ld0dyaWRbeF1beV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChkaXJlY3Rpb24gPT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgeCsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeSsrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgLy8gUGxhY2Ugc2hpcCBvbiBib2FyZFxuICBjb25zdCBwbGFjZVNoaXAgPSAoeCwgeSwgbGVuKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IFNoaXAobGVuKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBuZXdHcmlkW3hdW3ldID0gbmV3U2hpcDtcbiAgICAgIC8vY29uc29sZS5sb2coW3gsIHldKTtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgeCsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeSsrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgLy8gUmFuZG9tbHkgcGxhY2Ugc2hpcCBvbiB0aGUgYm9hcmRcbiAgY29uc3QgcmFuZG9tbHlQbGFjZVNoaXAgPSAoc2hpcExlbiwgcEJvYXJkKSA9PiB7XG4gICAgcmFuZG9tRGlyZWN0aW9uKCk7XG4gICAgY29uc3QgY29vcmRzID0gcmFuZG9tQ29vcmRzKCk7XG4gICAgaWYgKHBCb2FyZC52YWxpZGF0ZVBsYWNlKC4uLmNvb3Jkcywgc2hpcExlbikgPT0gdHJ1ZSkge1xuICAgICAgcEJvYXJkLnBsYWNlU2hpcCguLi5jb29yZHMsIHNoaXBMZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICByYW5kb21seVBsYWNlU2hpcChzaGlwTGVuLCBwQm9hcmQpO1xuICAgIH1cbiAgfTtcbiAgLy8gUmVjZWl2ZXMgYXR0YWNrcyBvbiBzcGVjaWZpYyBjb29yZGluYXRlc1xuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBpZiAobmV3R3JpZFt4XVt5XSA9PSB1bmRlZmluZWQpIHtcbiAgICAgIG5ld0dyaWRbeF1beV0gPSBcIm1pc3NcIjtcbiAgICAgIC8vcmV0dXJuIG5ld0dyaWRbeF1beV07XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIG5ld0dyaWRbeF1beV0gIT0gdW5kZWZpbmVkICYmXG4gICAgICBuZXdHcmlkW3hdW3ldICE9IFwiaGl0XCIgJiZcbiAgICAgIG5ld0dyaWRbeF1beV0gIT0gXCJtaXNzXCJcbiAgICApIHtcbiAgICAgIG5ld0dyaWRbeF1beV0uaGl0KCk7XG4gICAgICBpZiAobmV3R3JpZFt4XVt5XS5pc1N1bmsoKSA9PSB0cnVlKSB7XG4gICAgICAgIHN1bmtDb3VudGVyKys7XG4gICAgICB9XG4gICAgICBuZXdHcmlkW3hdW3ldID0gXCJoaXRcIjtcbiAgICAgIC8vIHJldHVybiBuZXdHcmlkW3hdW3ldO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICBjb25zdCBnZXRHcmlkID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXdHcmlkO1xuICB9O1xuICBjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuICAgIGlmIChzdW5rQ291bnRlciA9PSA1KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRHcmlkLFxuICAgIGFsbFN1bmssXG4gICAgY2hhbmdlRGlyZWN0aW9uLFxuICAgIHJhbmRvbURpcmVjdGlvbixcbiAgICB2YWxpZGF0ZVBsYWNlLFxuICAgIHJhbmRvbWx5UGxhY2VTaGlwLFxuICB9O1xufTtcblxuY29uc3QgY3JlYXRlR3JpZCA9ICgpID0+IHtcbiAgY29uc3QgZ3JpZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBncmlkW2ldID0gbmV3IEFycmF5KDEwKTtcbiAgfVxuICByZXR1cm4gZ3JpZDtcbn07XG5cbmV4cG9ydCB7IEdhbWVCb2FyZCwgY3JlYXRlR3JpZCB9O1xuIiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4uL3NyYy9wbGF5ZXJcIjtcbmltcG9ydCB7XG4gIHJhbmRvbUNvb3JkcyxcbiAgaW5pdEJvYXJkcyxcbiAgcmVuZGVyQm9hcmRzLFxuICBhdHRhY2tWYWxpZCxcbiAgZGlzYWJsZUJvYXJkcyxcbn0gZnJvbSBcIi4uL2hlbHBlcnMvaGVscGVyc1wiO1xuaW1wb3J0IHsgR2FtZUJvYXJkLCBjcmVhdGVHcmlkIH0gZnJvbSBcIi4uL3NyYy9nYW1lQm9hcmRcIjtcbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi4vc3JjL3NoaXBcIjtcblxuY29uc3QgbmV3R2FtZSA9ICgpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXJcIik7XG4gIGNvbnN0IGxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGVmdCk7XG4gIGxlZnQuY2xhc3NMaXN0LmFkZChcImxlZnRcIik7XG4gIGNvbnN0IHJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJpZ2h0KTtcbiAgcmlnaHQuY2xhc3NMaXN0LmFkZChcInJpZ2h0XCIpO1xuICBjb25zdCBwb3BVcFdpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcG9wdXBXXCIpO1xuICBjb25zdCBwb3BVcExvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BvcHVwTFwiKTtcbiAgLy8gSW5pdGlhbGl6ZSBnYW1lXG4gIGNvbnN0IHAxID0gUGxheWVyKCk7XG4gIGNvbnN0IHAxQm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgY29uc3QgcDIgPSBQbGF5ZXIoKTtcbiAgY29uc3QgcDJCb2FyZCA9IEdhbWVCb2FyZCgpO1xuICBpbml0Qm9hcmRzKHAxQm9hcmQsIGxlZnQsIHAyQm9hcmQsIHJpZ2h0KTtcbiAgLy8gUGxhY2Ugc2hpcHNcbiAgcDJCb2FyZC5yYW5kb21seVBsYWNlU2hpcCg1LCBwMkJvYXJkKTtcbiAgcDJCb2FyZC5yYW5kb21seVBsYWNlU2hpcCg0LCBwMkJvYXJkKTtcbiAgcDJCb2FyZC5yYW5kb21seVBsYWNlU2hpcCgzLCBwMkJvYXJkKTtcbiAgcDJCb2FyZC5yYW5kb21seVBsYWNlU2hpcCgzLCBwMkJvYXJkKTtcbiAgcDJCb2FyZC5yYW5kb21seVBsYWNlU2hpcCgyLCBwMkJvYXJkKTtcbiAgcDFCb2FyZC5yYW5kb21seVBsYWNlU2hpcCg1LCBwMUJvYXJkKTtcbiAgcDFCb2FyZC5yYW5kb21seVBsYWNlU2hpcCg0LCBwMUJvYXJkKTtcbiAgcDFCb2FyZC5yYW5kb21seVBsYWNlU2hpcCgzLCBwMUJvYXJkKTtcbiAgcDFCb2FyZC5yYW5kb21seVBsYWNlU2hpcCgzLCBwMUJvYXJkKTtcbiAgcDFCb2FyZC5yYW5kb21seVBsYWNlU2hpcCgyLCBwMUJvYXJkKTtcbiAgcmVuZGVyQm9hcmRzKHAxQm9hcmQsIHAyQm9hcmQpO1xuICAvLyBBdHRhY2sgaW5wdXQgZXZlbnQgbGlzdGVuZXJcbiAgY29uc3QgcmlnaHRDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmlnaHRDZWxsXCIpO1xuICByaWdodENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGNvbnN0IHJvd051bSA9IGNlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIikuY2hhckF0KDApO1xuICAgICAgY29uc3QgY29sTnVtID0gY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiKS5jaGFyQXQoMik7XG4gICAgICBpZiAoYXR0YWNrVmFsaWQocm93TnVtLCBjb2xOdW0sIHAyQm9hcmQpKSB7XG4gICAgICAgIHAxLmF0dGFjayhyb3dOdW0sIGNvbE51bSwgcDJCb2FyZCk7XG4gICAgICAgIHJlbmRlckJvYXJkcyhwMUJvYXJkLCBwMkJvYXJkKTtcbiAgICAgICAgaWYgKHAyQm9hcmQuYWxsU3VuaygpKSB7XG4gICAgICAgICAgZGlzYWJsZUJvYXJkcygpO1xuICAgICAgICAgIHBvcFVwV2luLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBwMi5yYW5kb21BdHRhY2socDFCb2FyZCk7XG4gICAgICAgICAgICByZW5kZXJCb2FyZHMocDFCb2FyZCwgcDJCb2FyZCk7XG4gICAgICAgICAgICBpZiAocDFCb2FyZC5hbGxTdW5rKCkpIHtcbiAgICAgICAgICAgICAgZGlzYWJsZUJvYXJkcygpO1xuICAgICAgICAgICAgICBwb3BVcExvc2Uuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCA0MDApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHAyQm9hcmQuZ2V0R3JpZCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5jb25zdCByZXN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgY29uc3QgbGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGVmdFwiKTtcbiAgY29uc3QgcmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJpZ2h0XCIpO1xuICByaWdodC5yZW1vdmUoKTtcbiAgbGVmdC5yZW1vdmUoKTtcbiAgbmV3R2FtZSgpO1xufTtcblxuZXhwb3J0IHsgbmV3R2FtZSwgcmVzdGFydEdhbWUgfTtcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi4vc3JjL3NoaXBcIjtcbmltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuLi9zcmMvZ2FtZUJvYXJkXCI7XG5pbXBvcnQgeyByYW5kb21Db29yZHMgfSBmcm9tIFwiLi4vaGVscGVycy9oZWxwZXJzXCI7XG5cbmNvbnN0IFBsYXllciA9ICgpID0+IHtcbiAgbGV0IG5hbWU7XG4gIGNvbnN0IGF0dGFjayA9ICh4LCB5LCBib2FyZCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGJvYXJkLmdldEdyaWQoKVt4XVt5XSk7XG4gICAgaWYgKGJvYXJkLmdldEdyaWQoKVt4XVt5XSAhPSBcImhpdFwiICYmIGJvYXJkLmdldEdyaWQoKVt4XVt5XSAhPSBcIm1pc3NcIikge1xuICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmFuZG9tQXR0YWNrID0gKGJvYXJkKSA9PiB7XG4gICAgYXR0YWNrKC4uLnJhbmRvbUNvb3JkcygpLCBib2FyZCk7XG4gIH07XG4gIHJldHVybiB7IGF0dGFjaywgcmFuZG9tQXR0YWNrIH07XG59O1xuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsImNvbnN0IFNoaXAgPSAobGVuID0gMykgPT4ge1xuICBsZW47XG4gIGxldCBoaXRDb3VudCA9IDA7XG4gIGxldCBoYXNTdW5rID0gZmFsc2U7XG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBoaXRDb3VudCsrO1xuICB9O1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYgKGxlbiA9PSBoaXRDb3VudCkge1xuICAgICAgaGFzU3VuayA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBoYXNTdW5rO1xuICB9O1xuICByZXR1cm4geyBsZW4sIGhpdCwgaXNTdW5rIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbmV3R2FtZSwgcmVzdGFydEdhbWUgfSBmcm9tIFwiLi4vc3JjL2dhbWVMb29wXCI7XG5cbm5ld0dhbWUoKTtcblxuLy8gTmV3IGdhbWUgbGlzdGVuZXJcbmNvbnN0IHJlc3RhcnRCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cFwiKTtcbnJlc3RhcnRCdXR0b25zLmZvckVhY2goKGJ0bikgPT4ge1xuICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIHJlc3RhcnRHYW1lKCk7XG4gICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==