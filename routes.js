'use strict';
module.exports = function(app) {
  let user = require('./controller/UserController');

  // todoList Routes
  app.route('/users')
    .get(user.get)
    .post(user.store)

  app.route('/users/:UserId')
    .get(user.detail)
    .put(user.update)
    .delete(user.delete)
  
  app.route('/login/:Email')
    .post(user.login)

  let message = require ('./controller/MessageController')
  app.route('/message/:UserIdSend/to/:UserIdRec')
    .get(message.detail)
    .post(message.store)
  app.route('/message/:UserIdRec')
    .get(message.getAllMessage)

  let friend = require ('./controller/FriendController')
  app.route('/friend/:UserId')
    .get(friend.getFriend)
    .post(friend.store)
  app.route('/requestFriend/:UserId')
    .get(friend.getRequestFriend)
  app.route('/confirmFriend/:UserIdSend/:UserIdRec')
    .post(friend.confirmFriend)
  app.route('/removeRequestFriend/:UserIdSend/:UserIdRec')
    .post(friend.removeRequestFriend)
  app.route('deleteFriend/:UserIdSend/:UserIdRec')
    .post(friend.deleteFriend)
};