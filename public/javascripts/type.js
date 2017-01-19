"use strict";

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('inline-editor');

  // Set default font size and display
  let fontSize = 12;
  const fontSizeText = document.getElementById('font-size');
  fontSizeText.innerHTML = `${fontSize}px`;

  function changeFontSize() {
    fontSize += this.value;
    textarea.style.fontSize = `${fontSize}px`;
    fontSizeText.innerHTML = `${fontSize}px`;
  }

  const increaseFont = document.getElementById('increase-font');
  const decreaseFont = document.getElementById('decrease-font');
  increaseFont.addEventListener('click', changeFontSize, false);
  decreaseFont.addEventListener('click', changeFontSize, false);

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

  // Initiate the socket
  const socket = io();

  // data received from server to then fill the text area with updated data
  socket.on('type', (data) => {
    textarea.textContent = data.text;
    textarea.style.fontSize = `${fontSize}px`;
  });

  // listener and handler for keyup - data to send to server
  textarea.addEventListener('keyup', handleKeyUp, false);
  function handleKeyUp(e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      socket.emit('type', { text: this.textContent.length > 0 ? this.textContent : '', backspace: true});
    } else {
      socket.emit('type', { text: this.textContent, backspace: false });
    }
  }

});
