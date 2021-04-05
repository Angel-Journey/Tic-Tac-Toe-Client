'use strict'

const store = require('../store') // will store user info (from onSignInSuccess)

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
  $('#old-game').show()
  $('#game-history').show()

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
  $('#game-history').show()
  $('#old-game').show()
  // console.log(store.game)
  console.log(store.game._id)
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

const newMoveSuccess = function (event) {
  console.log('New move button was clicked!')
  // console.log(event)
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
  console.log(box.text()) // shows which value ('X' or 'O') was entered
  console.log(cellIndex, box.text())
  console.log(cellIndex + box.text())
  // if (cellIndex + box.text() === '0X' && cellIndex + box.text() === '1X' && cellIndex + box.text() === '2X') {
  //   $('#game-message').text('X Wins!')
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
