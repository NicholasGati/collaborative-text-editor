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
	      // handleKeyUp();
	    });
	
	    // Initiate the socket
	    // const socket = io();
	    // data received from server to then fill the text area with updated data
	    // socket.on('type', (data) => {
	    //   textarea.textContent = data.text;
	    //   textarea.style.fontSize = `${fontSize}px`;
	    // });
	    // listener and handler for keyup - data to send to server
	
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
	
	    // function handleKeyUp() {
	    //   if (e.keyCode === 8 || e.keyCode === 46) {
	    //     socket.emit('type', { text: this.textContent.length > 0 ? this.textContent : ''});
	    //   } else {
	    //     socket.emit('type', { text: textarea.textContent });
	    //   }
	    // }
	  });
	};
	
	module.exports = Type;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGNkN2IxOTBiM2YyMTU2ZTI2NGIiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2phdmFzY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qYXZhc2NyaXB0cy90eXBlLmpzIl0sIm5hbWVzIjpbIlR5cGUiLCJyZXF1aXJlIiwidCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInRleHRhcmVhIiwiZ2V0RWxlbWVudEJ5SWQiLCJwcmV2aW91c1ZhbHVlIiwiZGlkQ2hhbmdlT2NjdXIiLCJ2YWx1ZSIsInNldEludGVydmFsIiwiaGFuZGxlS2V5VXAiLCJoYW5kbGVLZXlEb3duIiwic2hhcmVqcyIsIm9wZW4iLCJlcnJvciIsImRvYyIsImNvbnNvbGUiLCJsb2ciLCJhdHRhY2hfdGV4dGFyZWEiLCJlIiwia2V5Q29kZSIsInN0YXJ0Iiwic2VsZWN0aW9uU3RhcnQiLCJlbmQiLCJzZWxlY3Rpb25FbmQiLCJ0YXJnZXQiLCJzdWJzdHJpbmciLCJwcmV2ZW50RGVmYXVsdCIsInRleHRDb250ZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0EsS0FBTUEsT0FBTyxtQkFBQUMsQ0FBUSxDQUFSLENBQWI7O0FBRUE7QUFDQSxLQUFNQyxJQUFJLElBQUlGLElBQUosRUFBVixDOzs7Ozs7QUNIQTs7QUFFQSxLQUFNQSxPQUFPLFNBQVBBLElBQU8sR0FBTTtBQUNqQkcsWUFBU0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQsU0FBTUMsV0FBV0YsU0FBU0csY0FBVCxDQUF3QixlQUF4QixDQUFqQjtBQUNBOzs7QUFHQSxTQUFJQyxzQkFBSjtBQUNBLFNBQU1DLGlCQUFpQixTQUFqQkEsY0FBaUIsR0FBVztBQUNoQyxXQUFHRCxpQkFBaUJGLFNBQVNJLEtBQTdCLEVBQW1DO0FBQy9CLGdCQUFPLElBQVA7QUFDSDtBQUNELGNBQU8sS0FBUDtBQUNELE1BTEQ7O0FBT0FDLGlCQUFZLFlBQUs7QUFDYixXQUFJRixnQkFBSixFQUFzQjtBQUNsQkc7QUFDSDtBQUNKLE1BSkQsRUFJRyxJQUpIOztBQU1BTixjQUFTRCxnQkFBVCxDQUEwQixPQUExQixFQUFtQ08sV0FBbkMsRUFBZ0QsS0FBaEQ7QUFDQU4sY0FBU0QsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUNRLGFBQXJDLEVBQW9ELEtBQXBEOztBQUVBQyxhQUFRQyxJQUFSLENBQWEsTUFBYixFQUFxQixNQUFyQixFQUE2QixVQUFDQyxLQUFELEVBQVFDLEdBQVIsRUFBZ0I7QUFDM0MsV0FBSUQsS0FBSixFQUFXO0FBQ1RFLGlCQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQkgsS0FBdEI7QUFDRCxRQUZELE1BRU87QUFDTEMsYUFBSUcsZUFBSixDQUFvQmQsUUFBcEI7QUFDRDtBQUNEO0FBQ0QsTUFQRDs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQVNPLGFBQVQsQ0FBdUJRLENBQXZCLEVBQTBCO0FBQ3hCLFdBQUlBLEVBQUVDLE9BQUYsS0FBYyxDQUFsQixFQUFxQjtBQUNuQjtBQUNBLGFBQU1DLFFBQVEsS0FBS0MsY0FBbkI7QUFDQSxhQUFNQyxNQUFNLEtBQUtDLFlBQWpCOztBQUVBLGFBQU1DLFNBQVNOLEVBQUVNLE1BQWpCO0FBQ0EsYUFBTWpCLFFBQVFpQixPQUFPakIsS0FBckI7O0FBRUE7QUFDQWlCLGdCQUFPakIsS0FBUCxHQUFlQSxNQUFNa0IsU0FBTixDQUFnQixDQUFoQixFQUFtQkwsS0FBbkIsSUFBNEIsSUFBNUIsR0FBbUNiLE1BQU1rQixTQUFOLENBQWdCSCxHQUFoQixDQUFsRDs7QUFFQTtBQUNBLGNBQUtELGNBQUwsR0FBc0IsS0FBS0UsWUFBTCxHQUFvQkgsUUFBUSxDQUFsRDs7QUFFQTtBQUNBRixXQUFFUSxjQUFGO0FBQ0Q7QUFDRjs7QUFFRCxjQUFTakIsV0FBVCxHQUF1QjtBQUNyQkosdUJBQWdCRixTQUFTd0IsV0FBekI7QUFDRDtBQUNEbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxJQXhFRDtBQXlFRCxFQTFFRDs7QUE0RUFtQixRQUFPQyxPQUFQLEdBQWlCL0IsSUFBakIsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0Y2Q3YjE5MGIzZjIxNTZlMjY0YiIsImNvbnN0IFR5cGUgPSByZXF1aXJlKCcuL3R5cGUnKTtcblxuLy8gSW5pbnRpYXRlIFR5cGVcbmNvbnN0IHQgPSBuZXcgVHlwZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2phdmFzY3JpcHRzL2luZGV4LmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFR5cGUgPSAoKSA9PiB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5saW5lLWVkaXRvcicpO1xuICAgIC8qKlxuICAgICAgKiBHZXQgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgcHJldmlvdXMgYW5kIG5leHQgc3RhdGUgb2YgdGhlIHRleHRcbiAgICAqL1xuICAgIGxldCBwcmV2aW91c1ZhbHVlO1xuICAgIGNvbnN0IGRpZENoYW5nZU9jY3VyID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZihwcmV2aW91c1ZhbHVlICE9IHRleHRhcmVhLnZhbHVlKXtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT57XG4gICAgICAgIGlmIChkaWRDaGFuZ2VPY2N1cigpKSB7XG4gICAgICAgICAgICBoYW5kbGVLZXlVcCgpO1xuICAgICAgICB9XG4gICAgfSwgMTAwMCk7XG5cbiAgICB0ZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGhhbmRsZUtleVVwLCBmYWxzZSk7XG4gICAgdGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleURvd24sIGZhbHNlKTtcblxuICAgIHNoYXJlanMub3BlbigndGVzdCcsICd0ZXh0JywgKGVycm9yLCBkb2MpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6JywgZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jLmF0dGFjaF90ZXh0YXJlYSh0ZXh0YXJlYSk7XG4gICAgICB9XG4gICAgICAvLyBoYW5kbGVLZXlVcCgpO1xuICAgIH0pO1xuXG4gICAgLy8gSW5pdGlhdGUgdGhlIHNvY2tldFxuICAgIC8vIGNvbnN0IHNvY2tldCA9IGlvKCk7XG4gICAgLy8gZGF0YSByZWNlaXZlZCBmcm9tIHNlcnZlciB0byB0aGVuIGZpbGwgdGhlIHRleHQgYXJlYSB3aXRoIHVwZGF0ZWQgZGF0YVxuICAgIC8vIHNvY2tldC5vbigndHlwZScsIChkYXRhKSA9PiB7XG4gICAgLy8gICB0ZXh0YXJlYS50ZXh0Q29udGVudCA9IGRhdGEudGV4dDtcbiAgICAvLyAgIHRleHRhcmVhLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgO1xuICAgIC8vIH0pO1xuICAgIC8vIGxpc3RlbmVyIGFuZCBoYW5kbGVyIGZvciBrZXl1cCAtIGRhdGEgdG8gc2VuZCB0byBzZXJ2ZXJcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUtleURvd24oZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOSkge1xuICAgICAgICAvLyBnZXQgY2FyZXQgcG9zaXRpb24vc2VsZWN0aW9uXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgY29uc3QgZW5kID0gdGhpcy5zZWxlY3Rpb25FbmQ7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0LnZhbHVlO1xuXG4gICAgICAgIC8vIHNldCB0ZXh0YXJlYSB2YWx1ZSB0bzogdGV4dCBiZWZvcmUgY2FyZXQgKyB0YWIgKyB0ZXh0IGFmdGVyIGNhcmV0XG4gICAgICAgIHRhcmdldC52YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygwLCBzdGFydCkgKyBcIlxcdFwiICsgdmFsdWUuc3Vic3RyaW5nKGVuZCk7XG5cbiAgICAgICAgLy8gcHV0IGNhcmV0IGF0IHJpZ2h0IHBvc2l0aW9uIGFnYWluIChhZGQgb25lIGZvciB0aGUgdGFiKVxuICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25FbmQgPSBzdGFydCArIDE7XG5cbiAgICAgICAgLy8gcHJldmVudCB0aGUgZm9jdXMgbG9zZVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlS2V5VXAoKSB7XG4gICAgICBwcmV2aW91c1ZhbHVlID0gdGV4dGFyZWEudGV4dENvbnRlbnQ7XG4gICAgfVxuICAgIGhhbmRsZUtleVVwKCk7XG5cbiAgICAvLyBmdW5jdGlvbiBoYW5kbGVLZXlVcCgpIHtcbiAgICAvLyAgIGlmIChlLmtleUNvZGUgPT09IDggfHwgZS5rZXlDb2RlID09PSA0Nikge1xuICAgIC8vICAgICBzb2NrZXQuZW1pdCgndHlwZScsIHsgdGV4dDogdGhpcy50ZXh0Q29udGVudC5sZW5ndGggPiAwID8gdGhpcy50ZXh0Q29udGVudCA6ICcnfSk7XG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICBzb2NrZXQuZW1pdCgndHlwZScsIHsgdGV4dDogdGV4dGFyZWEudGV4dENvbnRlbnQgfSk7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUeXBlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2phdmFzY3JpcHRzL3R5cGUuanMiXSwic291cmNlUm9vdCI6IiJ9