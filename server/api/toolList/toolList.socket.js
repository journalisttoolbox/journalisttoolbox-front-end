/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ToolList = require('./toolList.model');

exports.register = function(socket) {
  ToolList.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ToolList.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('toolList:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('toolList:remove', doc);
}