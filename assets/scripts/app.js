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

  $('game-box-zero').on('click', authEvents.onNewMoveClick)
  $('game-box-one').on('click', authEvents.onNewMoveClick)
  $('game-box-two').on('click', authEvents.onNewMoveClick)
  $('game-box-three').on('click', authEvents.onNewMoveClick)
  $('game-box-four').on('click', authEvents.onNewMoveClick)
  $('game-box-five').on('click', authEvents.onNewMoveClick)
  $('game-box-six').on('click', authEvents.onNewMoveClick)
  $('game-box-seven').on('click', authEvents.onNewMoveClick)
  $('game-box-eight').on('click', authEvents.onNewMoveClick)
})
