"use strict";

const Type = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('inline-editor');
    /**
      * Get the difference between the previous and next state of the text
    */
    let previousValue;
    const didChangeOccur = function() {
      if(previousValue != textarea.value){
          return true;
      }
      return false;
    };

    setInterval(() =>{
        if (didChangeOccur()) {
            handleKeyUp();
        }
    }, 1000);

    textarea.addEventListener('keyup', handleKeyUp, false);
    textarea.addEventListener('keydown', handleKeyDown, false);

    sharejs.open('test', 'text', (error, doc) => {
      if (error) {
        console.log('Error:', error);
      } else {
        doc.attach_textarea(textarea);
      }
    });

    function handleKeyDown(e) {
      if (e.keyCode === 9) {
        // get caret position/selection
        const start = this.selectionStart;
        const end = this.selectionEnd;

        const target = e.target;
        const value = target.value;

        // set textarea value to: text before caret + tab + text after caret
        target.value = value.substring(0, start) + "\t" + value.substring(end);

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        e.preventDefault();
      }
    }

    function handleKeyUp() {
      previousValue = textarea.textContent;
    }
    handleKeyUp();
  });
}

module.exports = Type;
