var mongoose = require('mongoose');
    // SubItemSchema = require('subitem.js')

var MakerSchema = new mongoose.Schema({
  name: String,
  status: Boolean,
  blacklist: Boolean,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Maker', MakerSchema);