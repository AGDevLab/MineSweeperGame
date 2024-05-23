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
  score: 0,
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
  document.querySelector('h2 span').innerText = 0
  gGame.score = 0
  gGame.markedCount = 0
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
        isMarked: false,
      }
    }
  }

  board[3][0].isMine = true
  board[2][0].isMine = true

  // addMine(board, gLevel.MINES)

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
      const tdId = `cell-${i}-${j}`

      var cellClass = getClassName({ i: i, j: j }) // cell-i-j

      if (currCell.isMine) cellClass += ' mine'
      // else if (currCell.type === WALL) cellClass += ' wall'

      strHTML += `<td id="${tdId}" class="cell ${cellClass}" onclick="onCellClicked(this,${i},${j})" oncontextmenu="onCellMarked(event, this); return false;"><span class="hidden">`

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

// Returns the class name for a specific cell
function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
} // step1.3 done

// Called when a cell is clicked
function onCellClicked(elCell, cellI, cellJ) {
  console.log(elCell)
  var clickedCell = gBoard[cellI][cellJ]
  var cellSpan = elCell.querySelector('span')

  if (!clickedCell.isMine) {
    // console.log(clickedCell.minesAroundCount)
    if (cellSpan.classList.contains('hidden')) {
      cellSpan.classList.remove('hidden')
      clickedCell.isShown = true
    }
  }
  console.log(clickedCell)

  if (clickedCell.isMine && !clickedCell.isShown) {
    clickedCell.isShown = true
    console.log('mine')

    gGame.score--
    document.querySelector('h2 span').innerText = gGame.score

    // if (elCell.classList.contains('occupied')) {
    // if (gBoard[cellI][cellJ] === LIFE) {

    //   // Update the Model:

    //   // Update the Dom:
    // elCell.innerText = ''
    // console.log(elCell.innerText)

    // showCell(cellI, cellJ)/
  }
}

// Called when a cell is rightclicked See how you can hide the context menu on right click
function onCellMarked(event, elCell) {
  event.preventDefault()
  const cellCoord = getCellCoord(elCell.id)
  if (gGame.markedCount < 4) {
    gBoard[cellCoord.i][cellCoord.j].isMarked = true
    console.log('marked', elCell, gBoard[cellCoord.i][cellCoord.j])
    elCell.innerText = 'M'
    gGame.markedCount++
  }
}

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
