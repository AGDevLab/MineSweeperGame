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

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
  const cellSelector = '.' + getClassName(location) // '.cell-1-1'
  const elCell = document.querySelector(cellSelector) // <td></td>
  elCell.innerHTML = value
} // to be used later

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
  const coord = {}
  const parts = strCellId.split('-') // ['cell','2','7']
  coord.i = +parts[1]
  coord.j = +parts[2]
  return coord
}

function difficultyBtnChecker(btn) {
  var tempSize = btn.getAttribute('data-boardSize')
  var tempDiff = btn.getAttribute('data-mines')
  console.log(btn.getAttribute('data-mines'))
  console.log(tempSize)
  console.log(tempDiff)
  gLevel.size = tempSize
  gLevel.mines = tempDiff

  // gameBoardSize = tempSize
  // gameBoardFull = gameBoardSize ** 2
  onInit()
  // resetGameState()
  // return tempSize
}

function toggleVisibility() {
  // Get all elements with the class 'hidden'
  const hiddenElements = document.querySelectorAll('.hidden')

  // Loop through each element and toggle the visibility property
  // console.log(hiddenElements)
  hiddenElements.forEach((element) => {
    // console.log(element)

    if (
      element.style.visibility === 'hidden' ||
      element.style.visibility === ''
    ) {
      // console.log(hiddenElements)
      element.style.visibility = 'visible'
    } else {
      // console.log(hiddenElements)
      element.style.visibility = 'hidden'
    }
  })
}

// function toggleVisibility() {
//   console.log('toggleVis')

//   var checkVis = document.querySelector('.hidden')
//   console.log(checkVis)
//   console.log(checkVis.style.visibility)

//   if (checkVis.classList.contains('.hidden')) {
//     checkVis.style.visibility = 'visible'

//     console.log(checkVis.classList.contains('.hidden'))
//   }
// }

// function toggleVisibility() {
//   // Get all elements with the class 'hidden'
//   const hiddenElements = document.querySelectorAll('.hidden')
//   console.log(hiddenElements)

//   // Loop through each element and toggle the visibility property
//   hiddenElements.forEach((element) => {
//     console.log(element)
//     if (element.style.visibility === 'hidden') {
//       element.style.visibility = 'visible'
//     } else {
//       console.log('test')
//       console.log(element.style.visibility)
//       element.style.visibility = 'hidden'
//     }
//   })
// }
