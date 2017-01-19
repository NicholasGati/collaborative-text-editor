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
	
	// Inintiate Type
	var t = new Type();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var Type = function Type() {
	  document.addEventListener('DOMContentLoaded', function () {
	    var textarea = document.getElementById('inline-editor');
	
	    // Set default font size and display
	    var fontSize = 12;
	    var fontSizeText = document.getElementById('font-size');
	    fontSizeText.innerHTML = fontSize + 'px';
	
	    function changeFontSize() {
	      fontSize += this.value;
	      textarea.style.fontSize = fontSize + 'px';
	      fontSizeText.innerHTML = fontSize + 'px';
	    }
	
	    var increaseFont = document.getElementById('increase-font');
	    var decreaseFont = document.getElementById('decrease-font');
	    increaseFont.addEventListener('click', changeFontSize, false);
	    decreaseFont.addEventListener('click', changeFontSize, false);
	
	    // get the difference between the previous and next state of the text
	    var diff = {};
	    function difference(prev, next) {
	      var len = prev.length < next.length ? next.length : prev.length;
	      for (var i = 0; i < len; i++) {
	        if (prev[i] != next[i]) {
	          diff[i] = { prevState: prev, newState: next, diffCharacter: next[i], diffPosition: i };
	        }
	      }
	      return diff;
	    }
	
	    // Initiate the socket
	    var socket = io();
	
	    // data received from server to then fill the text area with updated data
	    socket.on('type', function (data) {
	      textarea.textContent = data.text;
	      textarea.style.fontSize = fontSize + 'px';
	    });
	
	    // listener and handler for keyup - data to send to server
	    textarea.addEventListener('keyup', handleKeyUp, false);
	    function handleKeyUp(e) {
	      if (e.keyCode === 8 || e.keyCode === 46) {
	        socket.emit('type', { text: this.textContent.length > 0 ? this.textContent : '', backspace: true });
	      } else {
	        socket.emit('type', { text: this.textContent, backspace: false });
	      }
	    }
	  });
	};
	
	module.exports = Type;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODI1YjZmM2VhNTZiODM0YzhhYmYiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2phdmFzY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qYXZhc2NyaXB0cy90eXBlLmpzIl0sIm5hbWVzIjpbIlR5cGUiLCJyZXF1aXJlIiwidCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInRleHRhcmVhIiwiZ2V0RWxlbWVudEJ5SWQiLCJmb250U2l6ZSIsImZvbnRTaXplVGV4dCIsImlubmVySFRNTCIsImNoYW5nZUZvbnRTaXplIiwidmFsdWUiLCJzdHlsZSIsImluY3JlYXNlRm9udCIsImRlY3JlYXNlRm9udCIsImRpZmYiLCJkaWZmZXJlbmNlIiwicHJldiIsIm5leHQiLCJsZW4iLCJsZW5ndGgiLCJpIiwicHJldlN0YXRlIiwibmV3U3RhdGUiLCJkaWZmQ2hhcmFjdGVyIiwiZGlmZlBvc2l0aW9uIiwic29ja2V0IiwiaW8iLCJvbiIsImRhdGEiLCJ0ZXh0Q29udGVudCIsInRleHQiLCJoYW5kbGVLZXlVcCIsImUiLCJrZXlDb2RlIiwiZW1pdCIsImJhY2tzcGFjZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENBLEtBQU1BLE9BQU8sbUJBQUFDLENBQVEsQ0FBUixDQUFiOztBQUVBO0FBQ0EsS0FBTUMsSUFBSSxJQUFJRixJQUFKLEVBQVYsQzs7Ozs7O0FDSEE7O0FBRUEsS0FBTUEsT0FBTyxTQUFQQSxJQUFPLEdBQU07QUFDakJHLFlBQVNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2xELFNBQU1DLFdBQVdGLFNBQVNHLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBakI7O0FBRUE7QUFDQSxTQUFJQyxXQUFXLEVBQWY7QUFDQSxTQUFNQyxlQUFlTCxTQUFTRyxjQUFULENBQXdCLFdBQXhCLENBQXJCO0FBQ0FFLGtCQUFhQyxTQUFiLEdBQTRCRixRQUE1Qjs7QUFFQSxjQUFTRyxjQUFULEdBQTBCO0FBQ3hCSCxtQkFBWSxLQUFLSSxLQUFqQjtBQUNBTixnQkFBU08sS0FBVCxDQUFlTCxRQUFmLEdBQTZCQSxRQUE3QjtBQUNBQyxvQkFBYUMsU0FBYixHQUE0QkYsUUFBNUI7QUFDRDs7QUFFRCxTQUFNTSxlQUFlVixTQUFTRyxjQUFULENBQXdCLGVBQXhCLENBQXJCO0FBQ0EsU0FBTVEsZUFBZVgsU0FBU0csY0FBVCxDQUF3QixlQUF4QixDQUFyQjtBQUNBTyxrQkFBYVQsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUNNLGNBQXZDLEVBQXVELEtBQXZEO0FBQ0FJLGtCQUFhVixnQkFBYixDQUE4QixPQUE5QixFQUF1Q00sY0FBdkMsRUFBdUQsS0FBdkQ7O0FBRUE7QUFDQSxTQUFJSyxPQUFPLEVBQVg7QUFDQSxjQUFTQyxVQUFULENBQW9CQyxJQUFwQixFQUEwQkMsSUFBMUIsRUFBZ0M7QUFDOUIsV0FBTUMsTUFBTUYsS0FBS0csTUFBTCxHQUFjRixLQUFLRSxNQUFuQixHQUE0QkYsS0FBS0UsTUFBakMsR0FBMENILEtBQUtHLE1BQTNEO0FBQ0EsWUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLEdBQXBCLEVBQXlCRSxHQUF6QixFQUE4QjtBQUM1QixhQUFJSixLQUFLSSxDQUFMLEtBQVdILEtBQUtHLENBQUwsQ0FBZixFQUF3QjtBQUN0Qk4sZ0JBQUtNLENBQUwsSUFBVSxFQUFFQyxXQUFXTCxJQUFiLEVBQW1CTSxVQUFVTCxJQUE3QixFQUFtQ00sZUFBZU4sS0FBS0csQ0FBTCxDQUFsRCxFQUEyREksY0FBY0osQ0FBekUsRUFBVjtBQUNEO0FBQ0Y7QUFDRCxjQUFPTixJQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxTQUFNVyxTQUFTQyxJQUFmOztBQUVBO0FBQ0FELFlBQU9FLEVBQVAsQ0FBVSxNQUFWLEVBQWtCLFVBQUNDLElBQUQsRUFBVTtBQUMxQnhCLGdCQUFTeUIsV0FBVCxHQUF1QkQsS0FBS0UsSUFBNUI7QUFDQTFCLGdCQUFTTyxLQUFULENBQWVMLFFBQWYsR0FBNkJBLFFBQTdCO0FBQ0QsTUFIRDs7QUFLQTtBQUNBRixjQUFTRCxnQkFBVCxDQUEwQixPQUExQixFQUFtQzRCLFdBQW5DLEVBQWdELEtBQWhEO0FBQ0EsY0FBU0EsV0FBVCxDQUFxQkMsQ0FBckIsRUFBd0I7QUFDdEIsV0FBSUEsRUFBRUMsT0FBRixLQUFjLENBQWQsSUFBbUJELEVBQUVDLE9BQUYsS0FBYyxFQUFyQyxFQUF5QztBQUN2Q1IsZ0JBQU9TLElBQVAsQ0FBWSxNQUFaLEVBQW9CLEVBQUVKLE1BQU0sS0FBS0QsV0FBTCxDQUFpQlYsTUFBakIsR0FBMEIsQ0FBMUIsR0FBOEIsS0FBS1UsV0FBbkMsR0FBaUQsRUFBekQsRUFBNkRNLFdBQVcsSUFBeEUsRUFBcEI7QUFDRCxRQUZELE1BRU87QUFDTFYsZ0JBQU9TLElBQVAsQ0FBWSxNQUFaLEVBQW9CLEVBQUVKLE1BQU0sS0FBS0QsV0FBYixFQUEwQk0sV0FBVyxLQUFyQyxFQUFwQjtBQUNEO0FBQ0Y7QUFDRixJQWpERDtBQWtERCxFQW5ERDs7QUFxREFDLFFBQU9DLE9BQVAsR0FBaUJ0QyxJQUFqQixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDgyNWI2ZjNlYTU2YjgzNGM4YWJmIiwiY29uc3QgVHlwZSA9IHJlcXVpcmUoJy4vdHlwZScpO1xuXG4vLyBJbmludGlhdGUgVHlwZVxuY29uc3QgdCA9IG5ldyBUeXBlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvamF2YXNjcmlwdHMvaW5kZXguanMiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgVHlwZSA9ICgpID0+IHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmxpbmUtZWRpdG9yJyk7XG5cbiAgICAvLyBTZXQgZGVmYXVsdCBmb250IHNpemUgYW5kIGRpc3BsYXlcbiAgICBsZXQgZm9udFNpemUgPSAxMjtcbiAgICBjb25zdCBmb250U2l6ZVRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9udC1zaXplJyk7XG4gICAgZm9udFNpemVUZXh0LmlubmVySFRNTCA9IGAke2ZvbnRTaXplfXB4YDtcblxuICAgIGZ1bmN0aW9uIGNoYW5nZUZvbnRTaXplKCkge1xuICAgICAgZm9udFNpemUgKz0gdGhpcy52YWx1ZTtcbiAgICAgIHRleHRhcmVhLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgO1xuICAgICAgZm9udFNpemVUZXh0LmlubmVySFRNTCA9IGAke2ZvbnRTaXplfXB4YDtcbiAgICB9XG5cbiAgICBjb25zdCBpbmNyZWFzZUZvbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5jcmVhc2UtZm9udCcpO1xuICAgIGNvbnN0IGRlY3JlYXNlRm9udCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWNyZWFzZS1mb250Jyk7XG4gICAgaW5jcmVhc2VGb250LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hhbmdlRm9udFNpemUsIGZhbHNlKTtcbiAgICBkZWNyZWFzZUZvbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGFuZ2VGb250U2l6ZSwgZmFsc2UpO1xuXG4gICAgLy8gZ2V0IHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHByZXZpb3VzIGFuZCBuZXh0IHN0YXRlIG9mIHRoZSB0ZXh0XG4gICAgbGV0IGRpZmYgPSB7fTtcbiAgICBmdW5jdGlvbiBkaWZmZXJlbmNlKHByZXYsIG5leHQpIHtcbiAgICAgIGNvbnN0IGxlbiA9IHByZXYubGVuZ3RoIDwgbmV4dC5sZW5ndGggPyBuZXh0Lmxlbmd0aCA6IHByZXYubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAocHJldltpXSAhPSBuZXh0W2ldKSB7XG4gICAgICAgICAgZGlmZltpXSA9IHsgcHJldlN0YXRlOiBwcmV2LCBuZXdTdGF0ZTogbmV4dCwgZGlmZkNoYXJhY3RlcjogbmV4dFtpXSwgZGlmZlBvc2l0aW9uOiBpIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkaWZmO1xuICAgIH1cblxuICAgIC8vIEluaXRpYXRlIHRoZSBzb2NrZXRcbiAgICBjb25zdCBzb2NrZXQgPSBpbygpO1xuXG4gICAgLy8gZGF0YSByZWNlaXZlZCBmcm9tIHNlcnZlciB0byB0aGVuIGZpbGwgdGhlIHRleHQgYXJlYSB3aXRoIHVwZGF0ZWQgZGF0YVxuICAgIHNvY2tldC5vbigndHlwZScsIChkYXRhKSA9PiB7XG4gICAgICB0ZXh0YXJlYS50ZXh0Q29udGVudCA9IGRhdGEudGV4dDtcbiAgICAgIHRleHRhcmVhLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgO1xuICAgIH0pO1xuXG4gICAgLy8gbGlzdGVuZXIgYW5kIGhhbmRsZXIgZm9yIGtleXVwIC0gZGF0YSB0byBzZW5kIHRvIHNlcnZlclxuICAgIHRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlS2V5VXAsIGZhbHNlKTtcbiAgICBmdW5jdGlvbiBoYW5kbGVLZXlVcChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSA4IHx8IGUua2V5Q29kZSA9PT0gNDYpIHtcbiAgICAgICAgc29ja2V0LmVtaXQoJ3R5cGUnLCB7IHRleHQ6IHRoaXMudGV4dENvbnRlbnQubGVuZ3RoID4gMCA/IHRoaXMudGV4dENvbnRlbnQgOiAnJywgYmFja3NwYWNlOiB0cnVlfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzb2NrZXQuZW1pdCgndHlwZScsIHsgdGV4dDogdGhpcy50ZXh0Q29udGVudCwgYmFja3NwYWNlOiBmYWxzZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvamF2YXNjcmlwdHMvdHlwZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=