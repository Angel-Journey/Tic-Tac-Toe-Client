'use strict'

// this file contains the functions that make the requests to the api

// import our apiUrl from the config file
const config = require('../config')

const store = require('../store') // store.user.token will be used

const signUp = function (formData) {
  return $.ajax({
    method: 'POST',
    // sending info for the single user we want to create
    url: config.apiUrl + '/sign-up',
    // send the formData
    data: formData
  })
}

const signIn = function (formData) {
  return $.ajax({
    method: 'POST',
    // sending info for the user to sign in
    url: config.apiUrl + '/sign-in',
    // send the formData
    data: formData
  })
}

const signOut = function (formData) {
  console.log('store is ', store)
  return $.ajax({
    method: 'DELETE',
    // removing info for the user
    url: config.apiUrl + '/sign-out',
    // removing the formData
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const newGame = function (data) {
  return $.ajax({
    method: 'POST',
    // asking for new game
    url: config.apiUrl + '/games',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: data
  })
}

const newGameBoard = function () {
  return $.ajax({
    method: 'GET',
    // asking for new game board
    url: config.apiUrl + '/games',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

// const newGameBoardID = function () {
//   return $.ajax({
//     method: 'GET',
//     // asking for new game board
//     url: config.apiUrl + '/games/:id',
//     headers: {
//       Authorization: 'Bearer ' + store.game._id
//     }
//   })
// }

module.exports = {
  signUp,
  signIn,
  signOut,
  newGame,
  newGameBoard
  // newGameBoardID
}
