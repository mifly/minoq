var mongoose = require('mongoose');

require('./user');
exports.User = mongoose.model('User');

require('./shop');
exports.Shop = mongoose.model('Shop');
