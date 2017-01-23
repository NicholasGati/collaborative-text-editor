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
	
	// Inintiate Type
	var t = new Type();
	var editFuncs = new EditorFunctions(document.getElementById('inline-editor'));
	
	var alignmentItems = document.getElementById("text-alignment").getElementsByTagName("li");
	for (var i = 0; i < alignmentItems.length; i++) {
	  alignmentItems[i].addEventListener('click', editFuncs.alignText, false);
	}
	
	var colors = document.getElementById("text-color").getElementsByTagName("li");
	for (var _i = 0; _i < colors.length; _i++) {
	  colors[_i].addEventListener('click', editFuncs.colorText, false);
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
	
	var EditorFunctions = function EditorFunctions(editor) {
	  this.alignText = function () {
	    var alignments = ['text-left', 'text-right', 'text-center'];
	    for (var i = 0; i < alignments.length; i++) {
	      // remove the unwanted alignment classes
	      if (editor.classList.contains(alignments[i])) {
	        editor.classList.remove(alignments[i]);
	      }
	    }
	    // add the requested alignment class
	    editor.classList.add('' + this.id);
	  };
	
	  this.colorText = function () {
	    var colors = ['red', 'green', 'blue', 'black'];
	    for (var i = 0; i < colors.length; i++) {
	      // remove the unwanted alignment classes
	      if (editor.classList.contains(colors[i])) {
	        editor.classList.remove(colors[i]);
	      }
	    }
	    // add the requested alignment class
	    editor.classList.add('' + this.id);
	  };
	};
	
	module.exports = EditorFunctions;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDE4MDVhMjg2ZGVkNWZkMTI1MmYiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2phdmFzY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qYXZhc2NyaXB0cy90eXBlLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qYXZhc2NyaXB0cy9lZGl0b3ItZnVuY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlR5cGUiLCJyZXF1aXJlIiwiRWRpdG9yRnVuY3Rpb25zIiwidCIsImVkaXRGdW5jcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGlnbm1lbnRJdGVtcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaSIsImxlbmd0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhbGlnblRleHQiLCJjb2xvcnMiLCJjb2xvclRleHQiLCJ0ZXh0YXJlYSIsInByZXZpb3VzVmFsdWUiLCJkaWRDaGFuZ2VPY2N1ciIsInZhbHVlIiwic2V0SW50ZXJ2YWwiLCJoYW5kbGVLZXlVcCIsImhhbmRsZUtleURvd24iLCJzaGFyZWpzIiwib3BlbiIsImVycm9yIiwiZG9jIiwiY29uc29sZSIsImxvZyIsImF0dGFjaF90ZXh0YXJlYSIsImUiLCJrZXlDb2RlIiwic3RhcnQiLCJzZWxlY3Rpb25TdGFydCIsImVuZCIsInNlbGVjdGlvbkVuZCIsInRhcmdldCIsInN1YnN0cmluZyIsInByZXZlbnREZWZhdWx0IiwidGV4dENvbnRlbnQiLCJtb2R1bGUiLCJleHBvcnRzIiwiZWRpdG9yIiwiYWxpZ25tZW50cyIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicmVtb3ZlIiwiYWRkIiwiaWQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENBLEtBQU1BLE9BQU8sbUJBQUFDLENBQVEsQ0FBUixDQUFiO0FBQ0EsS0FBTUMsa0JBQWtCLG1CQUFBRCxDQUFRLENBQVIsQ0FBeEI7O0FBRUE7QUFDQSxLQUFNRSxJQUFJLElBQUlILElBQUosRUFBVjtBQUNBLEtBQU1JLFlBQVksSUFBSUYsZUFBSixDQUFvQkcsU0FBU0MsY0FBVCxDQUF3QixlQUF4QixDQUFwQixDQUFsQjs7QUFFQSxLQUFNQyxpQkFBaUJGLFNBQVNDLGNBQVQsQ0FBd0IsZ0JBQXhCLEVBQTBDRSxvQkFBMUMsQ0FBK0QsSUFBL0QsQ0FBdkI7QUFDQSxNQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsZUFBZUcsTUFBbkMsRUFBMkNELEdBQTNDLEVBQWdEO0FBQzlDRixrQkFBZUUsQ0FBZixFQUFrQkUsZ0JBQWxCLENBQW1DLE9BQW5DLEVBQTRDUCxVQUFVUSxTQUF0RCxFQUFpRSxLQUFqRTtBQUNEOztBQUVELEtBQU1DLFNBQVNSLFNBQVNDLGNBQVQsQ0FBd0IsWUFBeEIsRUFBc0NFLG9CQUF0QyxDQUEyRCxJQUEzRCxDQUFmO0FBQ0EsTUFBSyxJQUFJQyxLQUFJLENBQWIsRUFBZ0JBLEtBQUlJLE9BQU9ILE1BQTNCLEVBQW1DRCxJQUFuQyxFQUF3QztBQUN0Q0ksVUFBT0osRUFBUCxFQUFVRSxnQkFBVixDQUEyQixPQUEzQixFQUFvQ1AsVUFBVVUsU0FBOUMsRUFBeUQsS0FBekQ7QUFDRCxFOzs7Ozs7QUNmRDs7QUFFQSxLQUFNZCxPQUFPLFNBQVBBLElBQU8sR0FBTTtBQUNqQkssWUFBU00sZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQsU0FBTUksV0FBV1YsU0FBU0MsY0FBVCxDQUF3QixlQUF4QixDQUFqQjtBQUNBOzs7QUFHQSxTQUFJVSxzQkFBSjtBQUNBLFNBQU1DLGlCQUFpQixTQUFqQkEsY0FBaUIsR0FBVztBQUNoQyxXQUFHRCxpQkFBaUJELFNBQVNHLEtBQTdCLEVBQW1DO0FBQy9CLGdCQUFPLElBQVA7QUFDSDtBQUNELGNBQU8sS0FBUDtBQUNELE1BTEQ7O0FBT0FDLGlCQUFZLFlBQUs7QUFDYixXQUFJRixnQkFBSixFQUFzQjtBQUNsQkc7QUFDSDtBQUNKLE1BSkQsRUFJRyxJQUpIOztBQU1BTCxjQUFTSixnQkFBVCxDQUEwQixPQUExQixFQUFtQ1MsV0FBbkMsRUFBZ0QsS0FBaEQ7QUFDQUwsY0FBU0osZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUNVLGFBQXJDLEVBQW9ELEtBQXBEOztBQUVBQyxhQUFRQyxJQUFSLENBQWEsTUFBYixFQUFxQixNQUFyQixFQUE2QixVQUFDQyxLQUFELEVBQVFDLEdBQVIsRUFBZ0I7QUFDM0MsV0FBSUQsS0FBSixFQUFXO0FBQ1RFLGlCQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQkgsS0FBdEI7QUFDRCxRQUZELE1BRU87QUFDTEMsYUFBSUcsZUFBSixDQUFvQmIsUUFBcEI7QUFDRDtBQUNGLE1BTkQ7O0FBUUEsY0FBU00sYUFBVCxDQUF1QlEsQ0FBdkIsRUFBMEI7QUFDeEIsV0FBSUEsRUFBRUMsT0FBRixLQUFjLENBQWxCLEVBQXFCO0FBQ25CO0FBQ0EsYUFBTUMsUUFBUSxLQUFLQyxjQUFuQjtBQUNBLGFBQU1DLE1BQU0sS0FBS0MsWUFBakI7O0FBRUEsYUFBTUMsU0FBU04sRUFBRU0sTUFBakI7QUFDQSxhQUFNakIsUUFBUWlCLE9BQU9qQixLQUFyQjs7QUFFQTtBQUNBaUIsZ0JBQU9qQixLQUFQLEdBQWVBLE1BQU1rQixTQUFOLENBQWdCLENBQWhCLEVBQW1CTCxLQUFuQixJQUE0QixJQUE1QixHQUFtQ2IsTUFBTWtCLFNBQU4sQ0FBZ0JILEdBQWhCLENBQWxEOztBQUVBO0FBQ0EsY0FBS0QsY0FBTCxHQUFzQixLQUFLRSxZQUFMLEdBQW9CSCxRQUFRLENBQWxEOztBQUVBO0FBQ0FGLFdBQUVRLGNBQUY7QUFDRDtBQUNGOztBQUVELGNBQVNqQixXQUFULEdBQXVCO0FBQ3JCSix1QkFBZ0JELFNBQVN1QixXQUF6QjtBQUNEO0FBQ0RsQjtBQUNELElBdEREO0FBdURELEVBeEREOztBQTBEQW1CLFFBQU9DLE9BQVAsR0FBaUJ4QyxJQUFqQixDOzs7Ozs7QUM1REE7O0FBRUEsS0FBTUUsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFTdUMsTUFBVCxFQUFpQjtBQUN2QyxRQUFLN0IsU0FBTCxHQUFpQixZQUFXO0FBQzFCLFNBQU04QixhQUFhLENBQUMsV0FBRCxFQUFjLFlBQWQsRUFBNEIsYUFBNUIsQ0FBbkI7QUFDQSxVQUFLLElBQUlqQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlpQyxXQUFXaEMsTUFBL0IsRUFBdUNELEdBQXZDLEVBQTRDO0FBQzFDO0FBQ0EsV0FBSWdDLE9BQU9FLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCRixXQUFXakMsQ0FBWCxDQUExQixDQUFKLEVBQThDO0FBQzVDZ0MsZ0JBQU9FLFNBQVAsQ0FBaUJFLE1BQWpCLENBQXdCSCxXQUFXakMsQ0FBWCxDQUF4QjtBQUNEO0FBQ0Y7QUFDRDtBQUNBZ0MsWUFBT0UsU0FBUCxDQUFpQkcsR0FBakIsTUFBd0IsS0FBS0MsRUFBN0I7QUFDRCxJQVZEOztBQVlBLFFBQUtqQyxTQUFMLEdBQWlCLFlBQVc7QUFDMUIsU0FBTUQsU0FBUyxDQUFDLEtBQUQsRUFBUSxPQUFSLEVBQWlCLE1BQWpCLEVBQXlCLE9BQXpCLENBQWY7QUFDQSxVQUFLLElBQUlKLElBQUksQ0FBYixFQUFnQkEsSUFBSUksT0FBT0gsTUFBM0IsRUFBbUNELEdBQW5DLEVBQXdDO0FBQ3RDO0FBQ0EsV0FBSWdDLE9BQU9FLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCL0IsT0FBT0osQ0FBUCxDQUExQixDQUFKLEVBQTBDO0FBQ3hDZ0MsZ0JBQU9FLFNBQVAsQ0FBaUJFLE1BQWpCLENBQXdCaEMsT0FBT0osQ0FBUCxDQUF4QjtBQUNEO0FBQ0Y7QUFDRDtBQUNBZ0MsWUFBT0UsU0FBUCxDQUFpQkcsR0FBakIsTUFBd0IsS0FBS0MsRUFBN0I7QUFDRCxJQVZEO0FBV0QsRUF4QkQ7O0FBMEJBUixRQUFPQyxPQUFQLEdBQWlCdEMsZUFBakIsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkMTgwNWEyODZkZWQ1ZmQxMjUyZiIsImNvbnN0IFR5cGUgPSByZXF1aXJlKCcuL3R5cGUnKTtcbmNvbnN0IEVkaXRvckZ1bmN0aW9ucyA9IHJlcXVpcmUoJy4vZWRpdG9yLWZ1bmN0aW9ucycpO1xuXG4vLyBJbmludGlhdGUgVHlwZVxuY29uc3QgdCA9IG5ldyBUeXBlKCk7XG5jb25zdCBlZGl0RnVuY3MgPSBuZXcgRWRpdG9yRnVuY3Rpb25zKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmxpbmUtZWRpdG9yJykpO1xuXG5jb25zdCBhbGlnbm1lbnRJdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dC1hbGlnbm1lbnRcIikuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaVwiKTtcbmZvciAobGV0IGkgPSAwOyBpIDwgYWxpZ25tZW50SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgYWxpZ25tZW50SXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlZGl0RnVuY3MuYWxpZ25UZXh0LCBmYWxzZSk7XG59XG5cbmNvbnN0IGNvbG9ycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dC1jb2xvclwiKS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpXCIpO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgY29sb3JzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWRpdEZ1bmNzLmNvbG9yVGV4dCwgZmFsc2UpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2phdmFzY3JpcHRzL2luZGV4LmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFR5cGUgPSAoKSA9PiB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5saW5lLWVkaXRvcicpO1xuICAgIC8qKlxuICAgICAgKiBHZXQgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgcHJldmlvdXMgYW5kIG5leHQgc3RhdGUgb2YgdGhlIHRleHRcbiAgICAqL1xuICAgIGxldCBwcmV2aW91c1ZhbHVlO1xuICAgIGNvbnN0IGRpZENoYW5nZU9jY3VyID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZihwcmV2aW91c1ZhbHVlICE9IHRleHRhcmVhLnZhbHVlKXtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT57XG4gICAgICAgIGlmIChkaWRDaGFuZ2VPY2N1cigpKSB7XG4gICAgICAgICAgICBoYW5kbGVLZXlVcCgpO1xuICAgICAgICB9XG4gICAgfSwgMTAwMCk7XG5cbiAgICB0ZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGhhbmRsZUtleVVwLCBmYWxzZSk7XG4gICAgdGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleURvd24sIGZhbHNlKTtcblxuICAgIHNoYXJlanMub3BlbigndGVzdCcsICd0ZXh0JywgKGVycm9yLCBkb2MpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6JywgZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jLmF0dGFjaF90ZXh0YXJlYSh0ZXh0YXJlYSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDkpIHtcbiAgICAgICAgLy8gZ2V0IGNhcmV0IHBvc2l0aW9uL3NlbGVjdGlvblxuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuc2VsZWN0aW9uRW5kO1xuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldC52YWx1ZTtcblxuICAgICAgICAvLyBzZXQgdGV4dGFyZWEgdmFsdWUgdG86IHRleHQgYmVmb3JlIGNhcmV0ICsgdGFiICsgdGV4dCBhZnRlciBjYXJldFxuICAgICAgICB0YXJnZXQudmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnQpICsgXCJcXHRcIiArIHZhbHVlLnN1YnN0cmluZyhlbmQpO1xuXG4gICAgICAgIC8vIHB1dCBjYXJldCBhdCByaWdodCBwb3NpdGlvbiBhZ2FpbiAoYWRkIG9uZSBmb3IgdGhlIHRhYilcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TdGFydCA9IHRoaXMuc2VsZWN0aW9uRW5kID0gc3RhcnQgKyAxO1xuXG4gICAgICAgIC8vIHByZXZlbnQgdGhlIGZvY3VzIGxvc2VcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUtleVVwKCkge1xuICAgICAgcHJldmlvdXNWYWx1ZSA9IHRleHRhcmVhLnRleHRDb250ZW50O1xuICAgIH1cbiAgICBoYW5kbGVLZXlVcCgpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUeXBlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2phdmFzY3JpcHRzL3R5cGUuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgRWRpdG9yRnVuY3Rpb25zID0gZnVuY3Rpb24oZWRpdG9yKSB7XG4gIHRoaXMuYWxpZ25UZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgYWxpZ25tZW50cyA9IFsndGV4dC1sZWZ0JywgJ3RleHQtcmlnaHQnLCAndGV4dC1jZW50ZXInXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsaWdubWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHJlbW92ZSB0aGUgdW53YW50ZWQgYWxpZ25tZW50IGNsYXNzZXNcbiAgICAgIGlmIChlZGl0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKGFsaWdubWVudHNbaV0pKSB7XG4gICAgICAgIGVkaXRvci5jbGFzc0xpc3QucmVtb3ZlKGFsaWdubWVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgdGhlIHJlcXVlc3RlZCBhbGlnbm1lbnQgY2xhc3NcbiAgICBlZGl0b3IuY2xhc3NMaXN0LmFkZChgJHt0aGlzLmlkfWApO1xuICB9XG5cbiAgdGhpcy5jb2xvclRleHQgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBjb2xvcnMgPSBbJ3JlZCcsICdncmVlbicsICdibHVlJywgJ2JsYWNrJ107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHJlbW92ZSB0aGUgdW53YW50ZWQgYWxpZ25tZW50IGNsYXNzZXNcbiAgICAgIGlmIChlZGl0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKGNvbG9yc1tpXSkpIHtcbiAgICAgICAgZWRpdG9yLmNsYXNzTGlzdC5yZW1vdmUoY29sb3JzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gYWRkIHRoZSByZXF1ZXN0ZWQgYWxpZ25tZW50IGNsYXNzXG4gICAgZWRpdG9yLmNsYXNzTGlzdC5hZGQoYCR7dGhpcy5pZH1gKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvckZ1bmN0aW9ucztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qYXZhc2NyaXB0cy9lZGl0b3ItZnVuY3Rpb25zLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==