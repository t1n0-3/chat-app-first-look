const User = require('../Models/User')

exports.getFriends = (userId) => { return User.find({ _id: { $ne: userId } }) }