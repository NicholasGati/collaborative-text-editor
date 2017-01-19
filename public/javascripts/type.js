"use strict";

document.addEventListener('DOMContentLoaded', () => {
  // get the difference between the previous and next state of the text
  let diff = {};
  function difference(prev, next) {
    const len = prev.length < next.length ? next.length : prev.length;
    for (let i = 0; i < len; i++) {
      if (prev[i] != next[i]) {
        diff[i] = { prevState: prev, newState: next, diffCharacter: next[i], diffPosition: i };
      }
    }
    return diff;
  }

  const textarea = document.getElementById('inline-editor');
  const socket = io();

  // data received from server to then fill the text area with updated data
  socket.on('type', (data) => {
    textarea.value = data.text;
  });

  // listener and handler for keyup - data to send to server
  textarea.addEventListener('keyup', handleKeyUp, false);
  function handleKeyUp(e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      socket.emit('type', { text: textarea.value.length > 0 ? textarea.value : '', backspace: true});
    } else {
      socket.emit('type', { text: textarea.value, backspace: false });
    }
  }
});
