'use strict'

const store = require('../store') // will store user info (from onSignInSuccess)

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
}

const onSignInSuccess = function (response) {
  store.user = response.user
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
}

const onError = function (err) {
  // log any errors that occur
  console.error(err)
  $('#message').text('Something went wrong, please try again.')
  $('#message').addClass('failure')

  $('form').trigger('reset')
}

const onNewGameSuccess = function (data) {
  store.game = data.game
  console.log('New Game button was clicked!')
  console.log(data.game)
  $('#game-Board').show()
  $('#game-history').show()
  $('#old-game').show()
  console.log(data)
}

const onGameHistorySuccess = function (data) {
  console.log('Game History button was clicked!')
  console.log(data)
}

const oldGameBoardIDSuccess = function (data) {
  console.log('Old Game button was clicked!')
  console.log(data)
}

const newMoveSuccess = function (data) {
  console.log('New move button was clicked!')
  // console.log(data)
  // console.log($(event.target).id)
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
