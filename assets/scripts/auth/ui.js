'use strict'

const store = require('../store') // will store user info (from onSignInSuccess)

const onSignUpSuccess = function () {
  $('#message').text('Success! Thank you for signing up!')

  $('#message').addClass('success')

  $('form').trigger('reset')
  $('#sign-out').show()
  $('#new-game').show()
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
}

const onSignOutSuccess = function (response) {
  $('#message').text('Sign out successful!')

  $('#message').addClass('success')
  $('#sign-out').hide()
  $('#new-game').hide()
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
  console.log('New Game button was clicked!')
  $('#game-Board').show()
  console.log(data)
}

module.exports = {
  onSignUpSuccess,
  onError,
  onSignInSuccess,
  onSignOutSuccess,
  onNewGameSuccess
}
