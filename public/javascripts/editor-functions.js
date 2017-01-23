"use strict";


const EditorFunctions = function(socket, editor) {
  // Align the text
  this.alignText = function(alignment) {
    const alignments = ['text-left', 'text-right', 'text-center'];
    for (let i = 0; i < alignments.length; i++) {
      // remove the unwanted alignment classes
      if (editor.classList.contains(alignments[i])) {
        editor.classList.remove(alignments[i]);
      }
    }
    // add the requested alignment class
    editor.classList.add(alignment);
  }

  this.emitAlignText = function() {
    // tell the socket to send a alignment adjustment message
    socket.emit('align', { alignment: this.id });
  }

  // Color the text
  this.colorText = function(color) {
    const colors = ['red', 'green', 'blue', 'black'];
    // remove the unwanted color classes
    for (let i = 0; i < colors.length; i++) {
      if (editor.classList.contains(colors[i])) {
        editor.classList.remove(colors[i]);
      }
    }
    editor.classList.add(color);
  }

  this.emitColorText = function() {
    // tell the socket to send a change_color message
    socket.emit('change_color', { color: this.id });
  }
}

module.exports = EditorFunctions;
