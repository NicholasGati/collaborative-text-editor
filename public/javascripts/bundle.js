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
	
	// change font size
	socket.on('change_size', function (data) {
	  editFuncs.changeFontSize(data.font_size);
	});
	
	var alignmentItems = document.getElementById("text-alignment").getElementsByTagName("li");
	for (var i = 0; i < alignmentItems.length; i++) {
	  alignmentItems[i].addEventListener('click', editFuncs.emitAlignText, false);
	}
	
	var colors = document.getElementById("text-color").getElementsByTagName("li");
	for (var _i = 0; _i < colors.length; _i++) {
	  colors[_i].addEventListener('click', editFuncs.emitColorText, false);
	}
	
	var fontSizes = document.getElementById("font-sizes").getElementsByTagName("li");
	for (var _i2 = 0; _i2 < fontSizes.length; _i2++) {
	  fontSizes[_i2].addEventListener('click', editFuncs.emitChangeFontSize, false);
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
	    var colors = ['red', 'green', 'blue', 'black', 'orange', 'purple'];
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
	
	  // Font size
	  this.emitChangeFontSize = function () {
	    socket.emit('change_size', { font_size: this.dataset.fontSize });
	  };
	
	  this.changeFontSize = function (size) {
	    editor.style.fontSize = size + 'px';
	  };
	};
	
	module.exports = EditorFunctions;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmVjMzc1ZWJiOWRlMzE1MDQ5MGEiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2phdmFzY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qYXZhc2NyaXB0cy90eXBlLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qYXZhc2NyaXB0cy9lZGl0b3ItZnVuY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlR5cGUiLCJyZXF1aXJlIiwiRWRpdG9yRnVuY3Rpb25zIiwic29ja2V0IiwiaW8iLCJjb25uZWN0IiwidCIsImVkaXRGdW5jcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvbiIsImRhdGEiLCJjb2xvclRleHQiLCJjb2xvciIsImFsaWduVGV4dCIsImFsaWdubWVudCIsImNoYW5nZUZvbnRTaXplIiwiZm9udF9zaXplIiwiYWxpZ25tZW50SXRlbXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImkiLCJsZW5ndGgiLCJhZGRFdmVudExpc3RlbmVyIiwiZW1pdEFsaWduVGV4dCIsImNvbG9ycyIsImVtaXRDb2xvclRleHQiLCJmb250U2l6ZXMiLCJlbWl0Q2hhbmdlRm9udFNpemUiLCJ0ZXh0YXJlYSIsInByZXZpb3VzVmFsdWUiLCJkaWRDaGFuZ2VPY2N1ciIsInZhbHVlIiwic2V0SW50ZXJ2YWwiLCJoYW5kbGVLZXlVcCIsImhhbmRsZUtleURvd24iLCJzaGFyZWpzIiwib3BlbiIsImVycm9yIiwiZG9jIiwiY29uc29sZSIsImxvZyIsImF0dGFjaF90ZXh0YXJlYSIsImUiLCJrZXlDb2RlIiwic3RhcnQiLCJzZWxlY3Rpb25TdGFydCIsImVuZCIsInNlbGVjdGlvbkVuZCIsInRhcmdldCIsInN1YnN0cmluZyIsInByZXZlbnREZWZhdWx0IiwidGV4dENvbnRlbnQiLCJtb2R1bGUiLCJleHBvcnRzIiwiZWRpdG9yIiwiYWxpZ25tZW50cyIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicmVt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QixDQUFxQjlDLEtBQXJCO0FBQ0QsSUFURDs7QUFXQSxRQUFLWSxhQUFMLEdBQXFCLFlBQVc7QUFDOUI7QUFDQXRCLFlBQU95RCxJQUFQLENBQVksY0FBWixFQUE0QixFQUFFL0MsT0FBTyxLQUFLZ0QsRUFBZCxFQUE1QjtBQUNELElBSEQ7O0FBS0E7QUFDQSxRQUFLbEMsa0JBQUwsR0FBMEIsWUFBVztBQUNuQ3hCLFlBQU95RCxJQUFQLENBQVksYUFBWixFQUEyQixFQUFFM0MsV0FBVyxLQUFLNkMsT0FBTCxDQUFhQyxRQUExQixFQUEzQjtBQUNELElBRkQ7O0FBSUEsUUFBSy9DLGNBQUwsR0FBc0IsVUFBU2dELElBQVQsRUFBZTtBQUNuQ1YsWUFBT1csS0FBUCxDQUFhRixRQUFiLEdBQTJCQyxJQUEzQjtBQUNELElBRkQ7QUFHRCxFQTVDRDs7QUE4Q0FaLFFBQU9DLE9BQVAsR0FBaUJuRCxlQUFqQixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGJlYzM3NWViYjlkZTMxNTA0OTBhIiwiY29uc3QgVHlwZSA9IHJlcXVpcmUoJy4vdHlwZScpO1xuY29uc3QgRWRpdG9yRnVuY3Rpb25zID0gcmVxdWlyZSgnLi9lZGl0b3ItZnVuY3Rpb25zJyk7XG5jb25zdCBzb2NrZXQgPSBpby5jb25uZWN0KCk7XG4vLyBJbmludGlhdGUgVHlwZVxuY29uc3QgdCA9IG5ldyBUeXBlKCk7XG5jb25zdCBlZGl0RnVuY3MgPSBuZXcgRWRpdG9yRnVuY3Rpb25zKHNvY2tldCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lubGluZS1lZGl0b3InKSk7XG5cbi8vIGNoYW5nZSBjb2xvclxuc29ja2V0Lm9uKCdjaGFuZ2VfY29sb3InLCAoZGF0YSkgPT4ge1xuICBlZGl0RnVuY3MuY29sb3JUZXh0KGRhdGEuY29sb3IpO1xufSk7XG5cbi8vIGFsaWduIHRleHRcbnNvY2tldC5vbignYWxpZ24nLCAoZGF0YSkgPT4ge1xuICBlZGl0RnVuY3MuYWxpZ25UZXh0KGRhdGEuYWxpZ25tZW50KTtcbn0pO1xuXG4vLyBjaGFuZ2UgZm9udCBzaXplXG5zb2NrZXQub24oJ2NoYW5nZV9zaXplJywgKGRhdGEpID0+IHtcbiAgZWRpdEZ1bmNzLmNoYW5nZUZvbnRTaXplKGRhdGEuZm9udF9zaXplKTtcbn0pO1xuXG5cbmNvbnN0IGFsaWdubWVudEl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0LWFsaWdubWVudFwiKS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpXCIpO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBhbGlnbm1lbnRJdGVtcy5sZW5ndGg7IGkrKykge1xuICBhbGlnbm1lbnRJdGVtc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVkaXRGdW5jcy5lbWl0QWxpZ25UZXh0LCBmYWxzZSk7XG59XG5cbmNvbnN0IGNvbG9ycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dC1jb2xvclwiKS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpXCIpO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgY29sb3JzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWRpdEZ1bmNzLmVtaXRDb2xvclRleHQsIGZhbHNlKTtcbn1cblxuY29uc3QgZm9udFNpemVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb250LXNpemVzXCIpLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlcIik7XG5mb3IgKGxldCBpID0gMDsgaSA8IGZvbnRTaXplcy5sZW5ndGg7IGkrKykge1xuICBmb250U2l6ZXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlZGl0RnVuY3MuZW1pdENoYW5nZUZvbnRTaXplLCBmYWxzZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvamF2YXNjcmlwdHMvaW5kZXguanMiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgVHlwZSA9ICgpID0+IHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmxpbmUtZWRpdG9yJyk7XG4gICAgLyoqXG4gICAgICAqIEdldCB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBwcmV2aW91cyBhbmQgbmV4dCBzdGF0ZSBvZiB0aGUgdGV4dFxuICAgICovXG4gICAgbGV0IHByZXZpb3VzVmFsdWU7XG4gICAgY29uc3QgZGlkQ2hhbmdlT2NjdXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmKHByZXZpb3VzVmFsdWUgIT0gdGV4dGFyZWEudmFsdWUpe1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBzZXRJbnRlcnZhbCgoKSA9PntcbiAgICAgICAgaWYgKGRpZENoYW5nZU9jY3VyKCkpIHtcbiAgICAgICAgICAgIGhhbmRsZUtleVVwKCk7XG4gICAgICAgIH1cbiAgICB9LCAxMDAwKTtcblxuICAgIHRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlS2V5VXAsIGZhbHNlKTtcbiAgICB0ZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93biwgZmFsc2UpO1xuXG4gICAgc2hhcmVqcy5vcGVuKCd0ZXN0JywgJ3RleHQnLCAoZXJyb3IsIGRvYykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjonLCBlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2MuYXR0YWNoX3RleHRhcmVhKHRleHRhcmVhKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUtleURvd24oZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOSkge1xuICAgICAgICAvLyBnZXQgY2FyZXQgcG9zaXRpb24vc2VsZWN0aW9uXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgY29uc3QgZW5kID0gdGhpcy5zZWxlY3Rpb25FbmQ7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0LnZhbHVlO1xuXG4gICAgICAgIC8vIHNldCB0ZXh0YXJlYSB2YWx1ZSB0bzogdGV4dCBiZWZvcmUgY2FyZXQgKyB0YWIgKyB0ZXh0IGFmdGVyIGNhcmV0XG4gICAgICAgIHRhcmdldC52YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygwLCBzdGFydCkgKyBcIlxcdFwiICsgdmFsdWUuc3Vic3RyaW5nKGVuZCk7XG5cbiAgICAgICAgLy8gcHV0IGNhcmV0IGF0IHJpZ2h0IHBvc2l0aW9uIGFnYWluIChhZGQgb25lIGZvciB0aGUgdGFiKVxuICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25FbmQgPSBzdGFydCArIDE7XG5cbiAgICAgICAgLy8gcHJldmVudCB0aGUgZm9jdXMgbG9zZVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlS2V5VXAoKSB7XG4gICAgICBwcmV2aW91c1ZhbHVlID0gdGV4dGFyZWEudGV4dENvbnRlbnQ7XG4gICAgfVxuICAgIGhhbmRsZUtleVVwKCk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvamF2YXNjcmlwdHMvdHlwZS5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5cbmNvbnN0IEVkaXRvckZ1bmN0aW9ucyA9IGZ1bmN0aW9uKHNvY2tldCwgZWRpdG9yKSB7XG4gIC8vIEFsaWduIHRoZSB0ZXh0XG4gIHRoaXMuYWxpZ25UZXh0ID0gZnVuY3Rpb24oYWxpZ25tZW50KSB7XG4gICAgY29uc3QgYWxpZ25tZW50cyA9IFsndGV4dC1sZWZ0JywgJ3RleHQtcmlnaHQnLCAndGV4dC1jZW50ZXInXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsaWdubWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHJlbW92ZSB0aGUgdW53YW50ZWQgYWxpZ25tZW50IGNsYXNzZXNcbiAgICAgIGlmIChlZGl0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKGFsaWdubWVudHNbaV0pKSB7XG4gICAgICAgIGVkaXRvci5jbGFzc0xpc3QucmVtb3ZlKGFsaWdubWVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgdGhlIHJlcXVlc3RlZCBhbGlnbm1lbnQgY2xhc3NcbiAgICBlZGl0b3IuY2xhc3NMaXN0LmFkZChhbGlnbm1lbnQpO1xuICB9XG5cbiAgdGhpcy5lbWl0QWxpZ25UZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gdGVsbCB0aGUgc29ja2V0IHRvIHNlbmQgYSBhbGlnbm1lbnQgYWRqdXN0bWVudCBtZXNzYWdlXG4gICAgc29ja2V0LmVtaXQoJ2FsaWduJywgeyBhbGlnbm1lbnQ6IHRoaXMuaWQgfSk7XG4gIH1cblxuICAvLyBDb2xvciB0aGUgdGV4dFxuICB0aGlzLmNvbG9yVGV4dCA9IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgY29uc3QgY29sb3JzID0gWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICdibGFjaycsICdvcmFuZ2UnLCAncHVycGxlJ107XG4gICAgLy8gcmVtb3ZlIHRoZSB1bndhbnRlZCBjb2xvciBjbGFzc2VzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChlZGl0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKGNvbG9yc1tpXSkpIHtcbiAgICAgICAgZWRpdG9yLmNsYXNzTGlzdC5yZW1vdmUoY29sb3JzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWRpdG9yLmNsYXNzTGlzdC5hZGQoY29sb3IpO1xuICB9XG5cbiAgdGhpcy5lbWl0Q29sb3JUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gdGVsbCB0aGUgc29ja2V0IHRvIHNlbmQgYSBjaGFuZ2VfY29sb3IgbWVzc2FnZVxuICAgIHNvY2tldC5lbWl0KCdjaGFuZ2VfY29sb3InLCB7IGNvbG9yOiB0aGlzLmlkIH0pO1xuICB9XG5cbiAgLy8gRm9udCBzaXplXG4gIHRoaXMuZW1pdENoYW5nZUZvbnRTaXplID0gZnVuY3Rpb24oKSB7XG4gICAgc29ja2V0LmVtaXQoJ2NoYW5nZV9zaXplJywgeyBmb250X3NpemU6IHRoaXMuZGF0YXNldC5mb250U2l6ZSB9KTtcbiAgfVxuXG4gIHRoaXMuY2hhbmdlRm9udFNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgZWRpdG9yLnN0eWxlLmZvbnRTaXplID0gYCR7c2l6ZX1weGA7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JGdW5jdGlvbnM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvamF2YXNjcmlwdHMvZWRpdG9yLWZ1bmN0aW9ucy5qcyJdLCJzb3VyY2VSb290IjoiIn0=