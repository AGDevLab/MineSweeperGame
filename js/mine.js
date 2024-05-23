function addMine(board, mineCount) {
  for (var i = 0; i < mineCount; i++) {
    console.log('mineAdded')
    // console.log(board[0][3])
    // random mines
    for (var i = 0; i < gLevel.MINES; i++) {
      var randCoordI = 0
      var randCoordJ = 0
      var randMineLoc
      randCoordI = getRandomInt(0, gLevel.SIZE)
      randCoordJ = getRandomInt(0, gLevel.SIZE)
      // for (var j = 0; j < 2; j++) {}
      console.log(randCoordI, randCoordJ)
      // console.log(randCoord)
      randMineLoc = board[randCoordI][randCoordJ]
      // console.log(randMineLoc)

      randMineLoc.isMine = true
    }
  }
}

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
