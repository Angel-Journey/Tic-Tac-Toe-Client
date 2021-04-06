'use strict'

const store = require('../store') // will store user info (from onSignInSuccess)

// import the functions that make requests to the api
const api = require('./api')

// const gamePlay = require('./gamePlay')

const onSignUpSuccess = function () {
  $('#message').text('Success! Thank you for signing up!')

  $('#message').addClass('success')

  $('form').trigger('reset')
  $('#sign-out').show()
  $('#new-game').show()
  $('#old-game').show()
  $('#game-history').show()
  $('#sign-up-btn').hide()
  $('#sign-in-btn').hide()

  setTimeout(() => {
    // Clear the success message
    $('#message').text('')
    // Remove the class of 'success' from the element
    $('#message').removeClass('success')
  }, 5000)
}

const onSignInSuccess = function (response) {
  store.user = response.user
  console.log(store.user.value)
  console.log(store)
  $('#message').text(response.user.email + ' signed in successfully!')

  $('#message').addClass('success')

  $('form').trigger('reset')
  $('#sign-up-btn').hide()
  $('#sign-in-btn').hide()
  $('#sign-out').show()
  $('#new-game').show()
  // $('#old-game').show()
  // $('#game-history').show()

  setTimeout(() => {
    // Clear the success message
    $('#message').text('')
    // Remove the class of 'success' from the element
    $('#message').removeClass('success')
  }, 5000)
}

const onSignOutSuccess = function (response) {
  $('#message').text('Sign out successful!')

  $('#message').addClass('success')
  $('#sign-out').hide()
  $('#new-game').hide()
  $('#old-game').hide()
  $('#game-history').hide()
  $('#game-Board').hide()
  $('#sign-in-btn').show()
  $('#sign-up-btn').show()
  store.user = null

  setTimeout(() => {
    // Clear the success message
    $('#message').text('')
    // Remove the class of 'success' from the element
    $('#message').removeClass('success')
  }, 5000)
}

const onError = function (err) {
  // log any errors that occur
  console.error(err)
  $('#message').text('Something went wrong, please try again.')
  $('#message').addClass('failure')

  $('form').trigger('reset')

  setTimeout(() => {
    // Clear the error message
    $('#message').text('')
    // Remove the class of 'success' from the element
    $('#message').removeClass('failure')
  }, 5000)
}

const onNewGameSuccess = function (data) {
  store.game = data.game
  console.log('New Game button was clicked!')
  console.log(data.game)
  $('#game-Board').show()
  // $('#game-history').show()
  // $('#old-game').show()
  // console.log(store.game)
  console.log(store.game._id) // shows game id
}

const onGameHistorySuccess = function (data) {
  console.log('Game History button was clicked!')
  console.log(data)
}

const oldGameBoardIDSuccess = function (data) {
  console.log('Old Game button was clicked!')
  console.log(data)
}

let currentPlayer = 'X'
let gameArray = ['', '', '', '', '', '', '', '', '']

const newMoveSuccess = function (event) {
  console.log('New move button was clicked!')
  // store.game = event.game
  // console.log(store.game._id) // ***doesn't grab game id***
  console.log(event)
  // // const cell = event.target
  // // // console.log(cell.id) // for example, 'game-box-zero'
  // // // console.log(cell)

  const box = $(event.target)
  box.css('background', 'transparent')
  if (box.text() === '') {
    box.text(currentPlayer)
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O'
    $('#game-message').text(box.text() + ' has made their move!')
    $('#game-message').addClass('success')
    setTimeout(() => {
      // Clear the game-message
      $('#game-message').text('')
      $('#game-message').removeClass('success')
    }, 4000)
  } else if (box.text() === 'O' || box.text() === 'X') {
    $('#game-message').text('That space is taken! Please try again!')
    $('#game-message').addClass('failure')
    setTimeout(() => {
      // Clear the game-message
      $('#game-message').text('')
      $('#game-message').removeClass('failure')
    }, 2500)
  }
  const cellIndex = $(event.target).data('cell-index')
  console.log(cellIndex) // shows number of cell clicked
  const value = (box.text())
  console.log(value) // shows which value ('X' or 'O') was entered
  api.newMove(cellIndex, value)
  // console.log(store.game.cells) // shows an empty array? but network shows filled out array

  // console.log(cellIndex, value)
  // console.log(cellIndex + value)
  // if (cellIndex + box.text() === '0X' && cellIndex + box.text() === '1X' && cellIndex + box.text() === '2X') {
  //   $('#game-message').text('X Wins!')
  // }

  // const gamePiece = cellIndex + value
  // gameArray.push(gamePiece)
  // console.log(gameArray)
  // if (gameArray === ['0X', '1X', '2X']) {
  //   $('#game-message').text('X Wins!')
  // }

  // const row1 = cellIndex 0 && cellIndex 1 && cellIndex 2
  // console.log(row1)

  // console.log(store.game.cells)
  // console.log(store.game.cells[1])
  // const gameIndex = store.game.cells
  gameArray[cellIndex] = value
  console.log(gameArray)
  if ((gameArray[0] === value && gameArray[1] === value && gameArray[2] === value) ||
  (gameArray[3] === value && gameArray[4] === value && gameArray[5] === value) ||
  (gameArray[6] === value && gameArray[7] === value && gameArray[8] === value) ||
  (gameArray[0] === value && gameArray[3] === value && gameArray[6] === value) ||
  (gameArray[1] === value && gameArray[4] === value && gameArray[7] === value) ||
  (gameArray[2] === value && gameArray[5] === value && gameArray[8] === value) ||
  (gameArray[0] === value && gameArray[4] === value && gameArray[8] === value) ||
  (gameArray[2] === value && gameArray[4] === value && gameArray[6] === value)) {
    console.log(value + ' wins!')
    $('#win-message').text(value + ' wins!')
    $('#win-message').addClass('success')
  }
  // else if
  // ((gameArray[0] === 'X' || 'O') && (gameArray[1] === 'X' || 'O') && (gameArray[2] === 'X' || 'O') &&
  // (gameArray[3] === 'X' || 'O') && (gameArray[4] === 'X' || 'O') && (gameArray[5] === 'X' || 'O') &&
  // (gameArray[6] === 'X' || 'O') && (gameArray[7] === 'X' || 'O') && (gameArray[8] === 'X' || 'O')) {
  //   console.log('It is a tie!')
  //   $('#win-message').text('It is a tie!')
  //   $('#win-message').addClass('success')
  // }
}

// // if ($(event.target).text('') === '') {
// //   console.log('empty')
// }
// if (cell === 'game-box-zero') {
//   $('#' + cell).text('X')
// } else if (cell === 'game-box-one') {
//   $('#' + cell).text('O')
// }

// console.log(data)
// console.log($(event.target).id)
// const cells = event.target.id
// const list = $('#' + cells).toArray()
// console.log(list)

module.exports = {
  onSignUpSuccess,
  onError,
  onSignInSuccess,
  onSignOutSuccess,
  onNewGameSuccess,
  onGameHistorySuccess,
  oldGameBoardIDSuccess,
  newMoveSuccess
}
