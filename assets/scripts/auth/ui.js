'use strict'

const store = require('../store') // will store user info (from onSignInSuccess)

// import the functions that make requests to the api
const api = require('./api')

// const gamePlay = require('./gamePlay')

const onSignUpSuccess = function () {
  $('#message').text('Success! Thank you for joinging the roster!')

  $('#message').addClass('success')

  $('form').trigger('reset')
  $('#sign-out').hide()
  $('#new-game').hide()
  $('#old-game').hide()
  $('#game-history').hide()
  $('#sign-up-btn').hide()
  $('#sign-in-btn').show()

  setTimeout(() => {
    // Clear the success message
    $('#message').text('')
    // Remove the class of 'success' from the element
    $('#message').removeClass('success')
  }, 5000)
}

const onSignInSuccess = function (response) {
  store.user = response.user
  // console.log(store.user.value)
  // console.log(store)
  $('#message').text(response.user.email + ' has entered the pitch!')

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

const onSignOutSuccess = function () {
  $('#message').text(store.user.email + ' has left the pitch!')

  $('#message').addClass('success')
  $('#sign-out').hide()
  $('#new-game').hide()
  $('#old-game').hide()
  $('#game-history').hide()
  $('#game-Board').hide()
  $('#sign-in-btn').show()
  $('#sign-up-btn').show()
  $('#win-message').hide()
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
  $('#game-message').text('Red card! Sorry, please try again.')
  $('#game-message').addClass('failure')

  $('form').trigger('reset')

  setTimeout(() => {
    // Clear the error message
    $('#game-message').text('')
    // Remove the class of 'success' from the element
    $('#game-message').removeClass('failure')
  }, 5000)
}
let currentPlayer = 'X'

const onNewGameSuccess = function (data) {
  $('#message').text('Game on! Player X kicks off!')
  currentPlayer = 'X'
  store.game = data.game
  // console.log('New Game button was clicked!')
  // console.log(data.game)
  $('#game-Board').show()
  $('#win-message').text('')
  $('.box').text('')
  $('.box').removeAttr('style')
  $('.box').on('click')
  store.game.cells[0] = ''
  store.game.cells[1] = ''
  store.game.cells[2] = ''
  store.game.cells[3] = ''
  store.game.cells[4] = ''
  store.game.cells[5] = ''
  store.game.cells[6] = ''
  store.game.cells[7] = ''
  store.game.cells[8] = ''
  // $('#game-history').show()
  // $('#old-game').show()
  // console.log(store.game)
  // console.log(store.game._id) // shows game id
  setTimeout(() => {
    // Clear the game-message
    $('#message').text('')
    $('#message').removeClass('success')
  }, 3000)
}

const onGameHistorySuccess = function (data) {
  // console.log('Game History button was clicked!')
  // console.log(data)
}

const oldGameBoardIDSuccess = function (data) {
  // console.log('Old Game button was clicked!')
  // console.log(data)
}

const newMoveSuccess = function (event) {
  // console.log(store.game.__v)
  // console.log('New move button was clicked!')
  //
  // console.log(event)

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
    $('#game-message').text('Foul! Please try again!')
    $('#game-message').addClass('yellow')
    setTimeout(() => {
      // Clear the game-message
      $('#game-message').text('')
      $('#game-message').removeClass('yellow')
    }, 2500)
  }
  const cellIndex = $(event.target).data('cell-index')
  // console.log(cellIndex) // shows number of cell clicked
  const value = (box.text())
  // console.log(value) // shows which value ('X' or 'O') was entered
  api.newMove(cellIndex, value)

  store.game.cells[cellIndex] = value // assigns 'X' or 'O' to the array
  // console.log(store.game.cells)
  // console.log(store.game.cells.length)
  if ((store.game.cells[0] === value && store.game.cells[1] === value && store.game.cells[2] === value) ||
      (store.game.cells[3] === value && store.game.cells[4] === value && store.game.cells[5] === value) ||
      (store.game.cells[6] === value && store.game.cells[7] === value && store.game.cells[8] === value) ||
      (store.game.cells[0] === value && store.game.cells[3] === value && store.game.cells[6] === value) ||
      (store.game.cells[1] === value && store.game.cells[4] === value && store.game.cells[7] === value) ||
      (store.game.cells[2] === value && store.game.cells[5] === value && store.game.cells[8] === value) ||
      (store.game.cells[0] === value && store.game.cells[4] === value && store.game.cells[8] === value) ||
      (store.game.cells[2] === value && store.game.cells[4] === value && store.game.cells[6] === value)) {
    // console.log(value + ' wins!')
    $('#game-message').hide()
    $('#win-message').text('Golazo! ' + value + ' wins!')
    $('#win-message').addClass('winner')
    // $('#game-Board').hide()
    // $('.box').text('')
    // $('.box').removeAttr('style')
    // $('.box').off('click')
    $('.box').css('pointer-events', 'none')
    currentPlayer = 'X'
  } else if ((store.game.cells[0] && store.game.cells[1] && store.game.cells[2] &&
  store.game.cells[3] && store.game.cells[4] && store.game.cells[5] &&
  store.game.cells[6] && store.game.cells[7] && store.game.cells[8]) !== '') {
    // console.log('It is a draw!')
    $('#game-message').hide()
    $('#win-message').text("It's is a draw!")
    $('#win-message').addClass('winner')
    $('.box').css('pointer-events', 'none')
    currentPlayer = 'X'
  }
}

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
