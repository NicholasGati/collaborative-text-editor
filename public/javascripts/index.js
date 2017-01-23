const Type = require('./type');
const EditorFunctions = require('./editor-functions');

// Inintiate Type
const t = new Type();
const editFuncs = new EditorFunctions(document.getElementById('inline-editor'));

const alignmentItems = document.getElementById("text-alignment").getElementsByTagName("li");
for (let i = 0; i < alignmentItems.length; i++) {
  alignmentItems[i].addEventListener('click', editFuncs.alignText, false);
}

const colors = document.getElementById("text-color").getElementsByTagName("li");
for (let i = 0; i < colors.length; i++) {
  colors[i].addEventListener('click', editFuncs.colorText, false);
}
