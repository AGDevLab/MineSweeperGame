'use strict'

// In Progress, Limited functionality

var gBoard, numOfNegMines, mine

const MINE = '*'

const gLevel = {
  SIZE: 4,
  MINES: 2,
}

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
}

/* The Model:

gBoard – A Matrix
containing cell objects:
Each cell: {
 minesAroundCount: 4,
 isShown: false,
 isMine: false,
 isMarked: true
}
*/

/*
This is an object by which the
board size is set (in this case:
4x4 board and how many mines
to place)

gLevel = {
 SIZE: 4,
 MINES: 2
}
*/

/*
This is an object in which you
can keep and update the
current game state:
isOn: Boolean, when true we
let the user play
shownCount: How many cells
are shown
markedCount: How many cells
are marked (with a flag)
secsPassed: How many seconds
passed 

gGame = {
 isOn: false,
 shownCount: 0,
 markedCount: 0,
 secsPassed: 0
}
*/

// This is called when page loads
function onInit() {
  console.log('onInit')
  gBoard = buildBoard()
  console.log('gBoard', gBoard)
  renderBoard(gBoard)
}

// Builds the board Set the mines Call setMinesNegsCount() Return the created board
// step1.1 done
function buildBoard() {
  const board = createMat(gLevel.SIZE, gLevel.SIZE)
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      board[i][j] = {
        minesAroundCount: numOfNegMines,
        isShown: false,
        isMine: false,
        isMarked: true,
      }
      // if (
      //   i === 0 ||
      //   i === board.length - 1 ||
      //   j === 0 ||
      //   j === board[0].length - 1
      // )
      // if (
      //   (i === 0 && j === board.length - 1) ||
      //   (i === 1 && j === board.length - 1) ||
      //   (j === 0 && i === board[0].length - 1)
      // ) {
      // board[i][j].isMine = true
      // }
    }
  }
  board[0][3].isMine = true
  board[3][0].isMine = true

  return board
}

// step1.3 done
function renderBoard(board) {
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      const currCell = board[i][j]
      numOfNegMines = setMinesNegsCount(i, j, board)
      currCell.minesAroundCount = numOfNegMines
      // console.log(currCell, numOfNegMines)

      var cellClass = getClassName({ i: i, j: j }) // cell-i-j

      if (currCell.isMine) cellClass += ' mine'
      // else if (currCell.type === WALL) cellClass += ' wall'

      strHTML += `<td class="cell ${cellClass}" onclick="onCellClicked(this,${i},${j})" ><span class="hidden">`

      if (currCell.isMine) {
        strHTML += MINE
      } else if (!currCell.mine) {
        strHTML += currCell.minesAroundCount
      }

      strHTML += '</span></td>'
    }
    strHTML += '</tr>'
  }

  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
  const cellSelector = '.' + getClassName(location) // '.cell-1-1'
  const elCell = document.querySelector(cellSelector) // <td></td>
  elCell.innerHTML = value
} // to be used later

// Returns the class name for a specific cell
function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
} // step1.3 done

function setMinesNegsCount(cellI, cellJ, board) {
  // 7,0
  var minesCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      const currCell = board[i][j]

      if (j < 0 || j >= board[i].length) continue
      if (i === cellI && j === cellJ) continue

      if (currCell.isMine) {
        minesCount++
      }
    }
  }
  return minesCount
}

// ---- to be finished... only basic functionality working
// TODO: Called when a cell is clicked
function onCellClicked(elCell, cellI, cellJ) {
  console.log(elCell)
  // console.log(cellI)
  // console.log(cellJ)
  // console.log(elCell.innerText)
  var clickedCell = gBoard[cellI][cellJ]
  console.log(clickedCell)

  var cellSpan = elCell.querySelector('span')

  if (!clickedCell.isMine) {
    console.log(clickedCell.minesAroundCount)
  }

  if (cellSpan.classList.contains('hidden')) {
    cellSpan.classList.remove('hidden')
  }

  // console.log('elCell:', elCell)
  if (elCell.innerText === '0') {
    console.log('innerText 0')

    // if (elCell.classList.contains('occupied')) {
    // if (gBoard[cellI][cellJ] === LIFE) {

    //   // Update the Model:
    gBoard[cellI][cellJ].isShown = true

    //   // Update the Dom:
    // elCell.innerText = ''
    // console.log(elCell.innerText)

    // showCell(cellI, cellJ)/
  }
}

// TODO: Called when a cell is rightclicked See how you can hide the context menu on right click
function onCellMarked(elCell) {}

// TODO: Game ends when all mines are marked, and all the other cells are shown
function checkGameOver() {}

/*
When user clicks a cell with no mines around, we need to open not only that cell, but also its
neighbors. NOTE: start with a basic implementation that only opens the non-mine 1st degree
neighbors.
BONUS: if you have the time later, try to work more like the real algorithm (see description
at the Bonuses section below)
*/
// TODO:
function expandShown(board, elCell, i, j) {}

function createMat(ROWS, COLS) {
  const mat = []
  for (var i = 0; i < ROWS; i++) {
    const row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}

// function hideCell(cell) {
//   const cell = cell.querySelector('span')
//   cell.classList.add('hidden')
// }

// function showCell() {
//   const cell = cell.querySelector('span')
//   cell.classList.remove('hidden')
// }
