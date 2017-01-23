/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(2);
	var EditorFunctions = __webpack_require__(3);
	var socket = io.connect();
	// Inintiate Type
	var t = new Type();
	var editFuncs = new EditorFunctions(socket, document.getElementById('inline-editor'));
	
	// change color
	socket.on('change_color', function (data) {
	  editFuncs.colorText(data.color);
	});
	
	// align text
	socket.on('align', function (data) {
	  editFuncs.alignText(data.alignment);
	});
	
	var alignmentItems = document.getElementById("text-alignment").getElementsByTagName("li");
	for (var i = 0; i < alignmentItems.length; i++) {
	  alignmentItems[i].addEventListener('click', editFuncs.emitAlignText, false);
	}
	
	var colors = document.getElementById("text-color").getElementsByTagName("li");
	for (var _i = 0; _i < colors.length; _i++) {
	  colors[_i].addEventListener('click', editFuncs.emitColorText, false);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var Type = function Type() {
	  document.addEventListener('DOMContentLoaded', function () {
	    var textarea = document.getElementById('inline-editor');
	    /**
	      * Get the difference between the previous and next state of the text
	    */
	    var previousValue = void 0;
	    var didChangeOccur = function didChangeOccur() {
	      if (previousValue != textarea.value) {
	        return true;
	      }
	      return false;
	    };
	
	    setInterval(function () {
	      if (didChangeOccur()) {
	        handleKeyUp();
	      }
	    }, 1000);
	
	    textarea.addEventListener('keyup', handleKeyUp, false);
	    textarea.addEventListener('keydown', handleKeyDown, false);
	
	    sharejs.open('test', 'text', function (error, doc) {
	      if (error) {
	        console.log('Error:', error);
	      } else {
	        doc.attach_textarea(textarea);
	      }
	    });
	
	    function handleKeyDown(e) {
	      if (e.keyCode === 9) {
	        // get caret position/selection
	        var start = this.selectionStart;
	        var end = this.selectionEnd;
	
	        var target = e.target;
	        var value = target.value;
	
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
	};
	
	module.exports = Type;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	var EditorFunctions = function EditorFunctions(socket, editor) {
	  // Align the text
	  this.alignText = function (alignment) {
	    var alignments = ['text-left', 'text-right', 'text-center'];
	    for (var i = 0; i < alignments.length; i++) {
	      // remove the unwanted alignment classes
	      if (editor.classList.contains(alignments[i])) {
	        editor.classList.remove(alignments[i]);
	      }
	    }
	    // add the requested alignment class
	    editor.classList.add(alignment);
	  };
	
	  this.emitAlignText = function () {
	    // tell the socket to send a alignment adjustment message
	    socket.emit('align', { alignment: this.id });
	  };
	
	  // Color the text
	  this.colorText = function (color) {
	    var colors = ['red', 'green', 'blue', 'black'];
	    // remove the unwanted color classes
	    for (var i = 0; i < colors.length; i++) {
	      if (editor.classList.contains(colors[i])) {
	        editor.classList.remove(colors[i]);
	      }
	    }
	    editor.classList.add(color);
	  };
	
	  this.emitColorText = function () {
	    // tell the socket to send a change_color message
	    socket.emit('change_color', { color: this.id });
	  };
	};
	
	module.exports = EditorFunctions;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTg3NjMwMzc4NDQ3YzYzY2E0MTQiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2phdmFzY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qYXZhc2NyaXB0cy90eXBlLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qYXZhc2NyaXB0cy9lZGl0b3ItZnVuY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlR5cGUiLCJyZXF1aXJlIiwiRWRpdG9yRnVuY3Rpb25zIiwic29ja2V0IiwiaW8iLCJjb25uZWN0IiwidCIsImVkaXRGdW5jcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvbiIsImRhdGEiLCJjb2xvclRleHQiLCJjb2xvciIsImFsaWduVGV4dCIsImFsaWdubWVudCIsImFsaWdubWVudEl0ZW1zIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpIiwibGVuZ3RoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImVtaXRBbGlnblRleHQiLCJjb2xvcnMiLCJlbWl0Q29sb3JUZXh0IiwidGV4dGFyZWEiLCJwcmV2aW91c1ZhbHVlIiwiZGlkQ2hhbmdlT2NjdXIiLCJ2YWx1ZSIsInNldEludGVydmFsIiwiaGFuZGxlS2V5VXAiLCJoYW5kbGVLZXlEb3duIiwic2hhcmVqcyIsIm9wZW4iLCJlcnJvciIsImRvYyIsImNvbnNvbGUiLCJsb2ciLCJhdHRhY2hfdGV4dGFyZWEiLCJlIiwia2V5Q29kZSIsInN0YXJ0Iiwic2VsZWN0aW9uU3RhcnQiLCJlbmQiLCJzZWxlY3Rpb25FbmQiLCJ0YXJnZXQiLCJzdWJzdHJpbmciLCJwcmV2ZW50RGVmYXVsdCIsInRleHRDb250ZW50IiwibW9kdWxlIiwiZXhwb3J0cyIsImVkaXRvciIsImFsaWdubWVudHMiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsImFkZCIsImVtaXQiLCJpZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFF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R0FBcUIsWUFBVztBQUM5QjtBQUNBbEIsWUFBT3FELElBQVAsQ0FBWSxPQUFaLEVBQXFCLEVBQUV6QyxXQUFXLEtBQUswQyxFQUFsQixFQUFyQjtBQUNELElBSEQ7O0FBS0E7QUFDQSxRQUFLN0MsU0FBTCxHQUFpQixVQUFTQyxLQUFULEVBQWdCO0FBQy9CLFNBQU1TLFNBQVMsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixNQUFqQixFQUF5QixPQUF6QixDQUFmO0FBQ0E7QUFDQSxVQUFLLElBQUlKLElBQUksQ0FBYixFQUFnQkEsSUFBSUksT0FBT0gsTUFBM0IsRUFBbUNELEdBQW5DLEVBQXdDO0FBQ3RDLFdBQUlnQyxPQUFPRSxTQUFQLENBQWlCQyxRQUFqQixDQUEwQi9CLE9BQU9KLENBQVAsQ0FBMUIsQ0FBSixFQUEwQztBQUN4Q2dDLGdCQUFPRSxTQUFQLENBQWlCRSxNQUFqQixDQUF3QmhDLE9BQU9KLENBQVAsQ0FBeEI7QUFDRDtBQUNGO0FBQ0RnQyxZQUFPRSxTQUFQLENBQWlCRyxHQUFqQixDQUFxQjFDLEtBQXJCO0FBQ0QsSUFURDs7QUFXQSxRQUFLVSxhQUFMLEdBQXFCLFlBQVc7QUFDOUI7QUFDQXBCLFlBQU9xRCxJQUFQLENBQVksY0FBWixFQUE0QixFQUFFM0MsT0FBTyxLQUFLNEMsRUFBZCxFQUE1QjtBQUNELElBSEQ7QUFJRCxFQW5DRDs7QUFxQ0FULFFBQU9DLE9BQVAsR0FBaUIvQyxlQUFqQixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDk4NzYzMDM3ODQ0N2M2M2NhNDE0IiwiY29uc3QgVHlwZSA9IHJlcXVpcmUoJy4vdHlwZScpO1xuY29uc3QgRWRpdG9yRnVuY3Rpb25zID0gcmVxdWlyZSgnLi9lZGl0b3ItZnVuY3Rpb25zJyk7XG5jb25zdCBzb2NrZXQgPSBpby5jb25uZWN0KCk7XG4vLyBJbmludGlhdGUgVHlwZVxuY29uc3QgdCA9IG5ldyBUeXBlKCk7XG5jb25zdCBlZGl0RnVuY3MgPSBuZXcgRWRpdG9yRnVuY3Rpb25zKHNvY2tldCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lubGluZS1lZGl0b3InKSk7XG5cbi8vIGNoYW5nZSBjb2xvclxuc29ja2V0Lm9uKCdjaGFuZ2VfY29sb3InLCAoZGF0YSkgPT4ge1xuICBlZGl0RnVuY3MuY29sb3JUZXh0KGRhdGEuY29sb3IpO1xufSk7XG5cbi8vIGFsaWduIHRleHRcbnNvY2tldC5vbignYWxpZ24nLCAoZGF0YSkgPT4ge1xuICBlZGl0RnVuY3MuYWxpZ25UZXh0KGRhdGEuYWxpZ25tZW50KTtcbn0pO1xuXG5jb25zdCBhbGlnbm1lbnRJdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dC1hbGlnbm1lbnRcIikuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaVwiKTtcbmZvciAobGV0IGkgPSAwOyBpIDwgYWxpZ25tZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgYWxpZ25tZW50SXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlZGl0RnVuY3MuZW1pdEFsaWduVGV4dCwgZmFsc2UpO1xufVxuXG5jb25zdCBjb2xvcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRleHQtY29sb3JcIikuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaVwiKTtcbmZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gIGNvbG9yc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVkaXRGdW5jcy5lbWl0Q29sb3JUZXh0LCBmYWxzZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvamF2YXNjcmlwdHMvaW5kZXguanMiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgVHlwZSA9ICgpID0+IHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmxpbmUtZWRpdG9yJyk7XG4gICAgLyoqXG4gICAgICAqIEdldCB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBwcmV2aW91cyBhbmQgbmV4dCBzdGF0ZSBvZiB0aGUgdGV4dFxuICAgICovXG4gICAgbGV0IHByZXZpb3VzVmFsdWU7XG4gICAgY29uc3QgZGlkQ2hhbmdlT2NjdXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmKHByZXZpb3VzVmFsdWUgIT0gdGV4dGFyZWEudmFsdWUpe1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBzZXRJbnRlcnZhbCgoKSA9PntcbiAgICAgICAgaWYgKGRpZENoYW5nZU9jY3VyKCkpIHtcbiAgICAgICAgICAgIGhhbmRsZUtleVVwKCk7XG4gICAgICAgIH1cbiAgICB9LCAxMDAwKTtcblxuICAgIHRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlS2V5VXAsIGZhbHNlKTtcbiAgICB0ZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93biwgZmFsc2UpO1xuXG4gICAgc2hhcmVqcy5vcGVuKCd0ZXN0JywgJ3RleHQnLCAoZXJyb3IsIGRvYykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjonLCBlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2MuYXR0YWNoX3RleHRhcmVhKHRleHRhcmVhKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUtleURvd24oZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOSkge1xuICAgICAgICAvLyBnZXQgY2FyZXQgcG9zaXRpb24vc2VsZWN0aW9uXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgY29uc3QgZW5kID0gdGhpcy5zZWxlY3Rpb25FbmQ7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0LnZhbHVlO1xuXG4gICAgICAgIC8vIHNldCB0ZXh0YXJlYSB2YWx1ZSB0bzogdGV4dCBiZWZvcmUgY2FyZXQgKyB0YWIgKyB0ZXh0IGFmdGVyIGNhcmV0XG4gICAgICAgIHRhcmdldC52YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygwLCBzdGFydCkgKyBcIlxcdFwiICsgdmFsdWUuc3Vic3RyaW5nKGVuZCk7XG5cbiAgICAgICAgLy8gcHV0IGNhcmV0IGF0IHJpZ2h0IHBvc2l0aW9uIGFnYWluIChhZGQgb25lIGZvciB0aGUgdGFiKVxuICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25FbmQgPSBzdGFydCArIDE7XG5cbiAgICAgICAgLy8gcHJldmVudCB0aGUgZm9jdXMgbG9zZVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlS2V5VXAoKSB7XG4gICAgICBwcmV2aW91c1ZhbHVlID0gdGV4dGFyZWEudGV4dENvbnRlbnQ7XG4gICAgfVxuICAgIGhhbmRsZUtleVVwKCk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvamF2YXNjcmlwdHMvdHlwZS5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5cbmNvbnN0IEVkaXRvckZ1bmN0aW9ucyA9IGZ1bmN0aW9uKHNvY2tldCwgZWRpdG9yKSB7XG4gIC8vIEFsaWduIHRoZSB0ZXh0XG4gIHRoaXMuYWxpZ25UZXh0ID0gZnVuY3Rpb24oYWxpZ25tZW50KSB7XG4gICAgY29uc3QgYWxpZ25tZW50cyA9IFsndGV4dC1sZWZ0JywgJ3RleHQtcmlnaHQnLCAndGV4dC1jZW50ZXInXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsaWdubWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHJlbW92ZSB0aGUgdW53YW50ZWQgYWxpZ25tZW50IGNsYXNzZXNcbiAgICAgIGlmIChlZGl0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKGFsaWdubWVudHNbaV0pKSB7XG4gICAgICAgIGVkaXRvci5jbGFzc0xpc3QucmVtb3ZlKGFsaWdubWVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgdGhlIHJlcXVlc3RlZCBhbGlnbm1lbnQgY2xhc3NcbiAgICBlZGl0b3IuY2xhc3NMaXN0LmFkZChhbGlnbm1lbnQpO1xuICB9XG5cbiAgdGhpcy5lbWl0QWxpZ25UZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gdGVsbCB0aGUgc29ja2V0IHRvIHNlbmQgYSBhbGlnbm1lbnQgYWRqdXN0bWVudCBtZXNzYWdlXG4gICAgc29ja2V0LmVtaXQoJ2FsaWduJywgeyBhbGlnbm1lbnQ6IHRoaXMuaWQgfSk7XG4gIH1cblxuICAvLyBDb2xvciB0aGUgdGV4dFxuICB0aGlzLmNvbG9yVGV4dCA9IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgY29uc3QgY29sb3JzID0gWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICdibGFjayddO1xuICAgIC8vIHJlbW92ZSB0aGUgdW53YW50ZWQgY29sb3IgY2xhc3Nlc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZWRpdG9yLmNsYXNzTGlzdC5jb250YWlucyhjb2xvcnNbaV0pKSB7XG4gICAgICAgIGVkaXRvci5jbGFzc0xpc3QucmVtb3ZlKGNvbG9yc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVkaXRvci5jbGFzc0xpc3QuYWRkKGNvbG9yKTtcbiAgfVxuXG4gIHRoaXMuZW1pdENvbG9yVGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIHRlbGwgdGhlIHNvY2tldCB0byBzZW5kIGEgY2hhbmdlX2NvbG9yIG1lc3NhZ2VcbiAgICBzb2NrZXQuZW1pdCgnY2hhbmdlX2NvbG9yJywgeyBjb2xvcjogdGhpcy5pZCB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvckZ1bmN0aW9ucztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qYXZhc2NyaXB0cy9lZGl0b3ItZnVuY3Rpb25zLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==