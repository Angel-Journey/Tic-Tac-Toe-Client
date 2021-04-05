'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events')

$(() => {
  $('#sign-out').hide()
  $('#new-game').hide()
  $('#game-Board').hide()
  $('#game-history').hide()
  $('#old-game').hide()

  $('#sign-up').on('submit', authEvents.onSignUp)

  $('#sign-in').on('submit', authEvents.onSignIn)

  $('#sign-out').on('click', authEvents.onSignOut)

  $('#new-game').on('click', authEvents.onNewGame)

  $('#game-history').on('click', authEvents.onGameHistory)

  $('#old-game').on('click', authEvents.onOldGameBoardID)

  $('.box').on('click', authEvents.onNewMoveClick)
})
