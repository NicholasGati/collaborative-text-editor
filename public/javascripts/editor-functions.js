"use strict";

const EditorFunctions = function(editor) {
  this.alignText = function() {
    const alignments = ['text-left', 'text-right', 'text-center'];
    for (let i = 0; i < alignments.length; i++) {
      // remove the unwanted alignment classes
      if (editor.classList.contains(alignments[i])) {
        editor.classList.remove(alignments[i]);
      }
    }
    // add the requested alignment class
    editor.classList.add(`${this.id}`);
  }

  this.colorText = function() {
    const colors = ['red', 'green', 'blue', 'black'];
    for (let i = 0; i < colors.length; i++) {
      // remove the unwanted alignment classes
      if (editor.classList.contains(colors[i])) {
        editor.classList.remove(colors[i]);
      }
    }
    // add the requested alignment class
    editor.classList.add(`${this.id}`);
  }
}

module.exports = EditorFunctions;
