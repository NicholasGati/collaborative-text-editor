const Type = require('./type');
const EditorFunctions = require('./editor-functions');
const socket = io.connect();
// Inintiate Type
const t = new Type();
const editFuncs = new EditorFunctions(socket, document.getElementById('inline-editor'));

// change color
socket.on('change_color', (data) => {
  editFuncs.colorText(data.color);
});

// align text
socket.on('align', (data) => {
  editFuncs.alignText(data.alignment);
});

const alignmentItems = document.getElementById("text-alignment").getElementsByTagName("li");
for (let i = 0; i < alignmentItems.length; i++) {
  alignmentItems[i].addEventListener('click', editFuncs.emitAlignText, false);
}

const colors = document.getElementById("text-color").getElementsByTagName("li");
for (let i = 0; i < colors.length; i++) {
  colors[i].addEventListener('click', editFuncs.emitColorText, false);
}
