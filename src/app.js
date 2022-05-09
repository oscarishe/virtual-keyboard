let englishLowerCase = [
  '`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift',
  'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'
];
let englishShiftKeys = [
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'
];
let russianShiftKeys = [
  'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+'
];
let russianLowerCase = [
  'ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift',
  'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'
];
class Keyboard {
  constructor(keyboardLang) {
    this.keyboardLang = keyboardLang;
    this.capsOn = false;
    if (keyboardLang === 'rus') this.keyboardType = russianLowerCase;
    else this.keyboardType = englishLowerCase;
    this.specialKeys = [
      ['Tab', 'Tab', '\t'], ['Backspace', 'Backspace', ''], ['Delete', 'Delete', ''], ['CapsLock', 'CapsLock', ''], ['Enter', 'Enter', '\n'], ['Shift', 'Shift', ''],
      ['ArrowUp', '▲', '▲'], ['Shift', 'Shift', ''], ['Control', 'Ctrl', ''], ['Meta', 'Win', ''], ['Alt', 'Alt', ''], ['ArrowLeft', '◄', '◄'], ['ArrowDown', '▼', '▼'], ['ArrowRight', '►', '►']];
  }

  getKeyboard() {
    return this.keyboardType;
  }

  getSpecialKeys() {
    return this.specialKeys;
  }

  changeCaps() {
    if (this.capsOn === true) this.capsOn = false;
    else this.capsOn = true;
    return this.capsOn;
  }

  getLanguage() {
    return this.keyboardLang;
  }

  setRussianKeyboard() {
    localStorage.setItem('lang', 'rus');
    this.keyboardType = russianLowerCase;
    this.keyboardLang = 'rus';
  }

  setEnglishKeyboard() {
    localStorage.setItem('lang', 'eng');
    this.keyboardType = englishLowerCase;
    this.keyboardLang = 'eng';
  }

  rerenderKeyBoard() {
    if (this.keyboardLang === 'eng') this.setRussianKeyboard();
    else this.setEnglishKeyboard();
    this.renderKeyBoard();
  }

  renderKeyBoard() {
    let keyboardContainer = document.querySelector('.keyboard_container');
    for (let i = 0; i < this.getKeyboard().length; i += 1) {
      keyboardContainer.childNodes[i].innerHTML = this.getKeyboard()[i];
      if (keyboardContainer.childNodes[i].innerHTML !== 'Shift' && keyboardContainer.childNodes[i].innerHTML !== 'Ctrl' && keyboardContainer.childNodes[i].innerHTML !== 'Alt') {
        keyboardContainer.childNodes[i].id = `key${this.getKeyId(this.getKeyboard()[i])}`;
      }
    }
  }

  setKeyboard(keyboardType) {
    this.keyboardType = keyboardType;
  }

  getKeyId(id) {
  /* eslint-disable-next-line */
  for (let item of this.specialKeys) {
      if (item[1] === id) {
        if (item[1] === 'Shift' && !document.getElementById('keyShiftLeft')) return 'ShiftLeft';
        if (item[1] === 'Ctrl' && !document.getElementById('keyControlLeft')) return 'ControlLeft';
        if (item[1] === 'Alt' && !document.getElementById('keyAltLeft')) return 'AltLeft';
        return item[0];
      }
    }
    if (id === '\'') {
      return '\'';
    }
    return id;
  }
}
insertAtCursor = (myField, myValue) => {
  if (myField.selectionStart || myField.selectionStart === '0') {
    let startPos = myField.selectionStart;
    let endPos = myField.selectionEnd;
    let input = myField;
    input.value = myField.value.substring(0, startPos)
          + myValue
          + myField.value.substring(endPos, myField.value.length);
    input.setSelectionRange(startPos + 1, endPos + 1);
  } else {
    let input = myField;
    input.value += myValue;
  }
};
backspaceAtCursor = (textArea) => {
  let startPos = textArea.selectionStart;
  let endPos = textArea.selectionEnd;
  let input = textArea;
  if (startPos === 0 && endPos === 0) return;
  if (startPos === endPos) {
    input.value = input.value.substring(0, startPos - 1)
          + input.value.substring(endPos, input.value.length);
    textArea.setSelectionRange(startPos - 1, endPos - 1);
  } else {
    input.value = textArea.value.substring(0, startPos)
          + textArea.value.substring(endPos, textArea.value.length);
    if (startPos === 0) textArea.setSelectionRange(startPos, startPos);
    else textArea.setSelectionRange(startPos, startPos);
  }
};
deleteAtCursor = (textArea) => {
  let startPos = textArea.selectionStart;
  let endPos = textArea.selectionEnd;
  let input = textArea;
  if (startPos === endPos) {
    input.value = textArea.value.substring(0, startPos)
          + textArea.value.substring(endPos + 1, textArea.value.length);
    textArea.setSelectionRange(startPos, endPos);
  } else {
    input.value = textArea.value.substring(0, startPos)
          + textArea.value.substring(endPos, textArea.value.length);
    textArea.setSelectionRange(startPos, startPos);
  }
};

let currentLang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'rus';
let keyboard = new Keyboard(currentLang);
let body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', '<textarea onblur="this.focus()" class=\'text_input\'></textarea>');
body.insertAdjacentHTML('afterbegin', '<h3 class=\'text_header\'>Использование ES6: классы, стрелочные функции, let</h1>');
body.insertAdjacentHTML('afterbegin', '<h3 class=\'text_header\'>Ctrl + alt - смена языка</h1>');
body.insertAdjacentHTML('afterbegin', '<h2 class=\'text_header\'>OS: Windows 10</h1>');
body.insertAdjacentHTML('afterbegin', '<h1 class=\'text_header\'>Virtual keyboard by Oscarishe</h1>');
let keyboardContainer = document.createElement('div');
let textArea = document.querySelector('textarea');
textArea.focus();
keyboardContainer.className = 'keyboard_container';
body.insertAdjacentElement('beforeend', keyboardContainer);
for (let i = 0; i < keyboard.getKeyboard().length; i += 1) {
  let newKey = document.createElement('div');
  newKey.id = `key${keyboard.getKeyId(keyboard.getKeyboard()[i])}`;
  newKey.className = 'key';
  newKey.innerHTML = keyboard.getKeyboard()[i];
  keyboardContainer.insertAdjacentElement('beforeend', newKey);
}

Array.from(document.getElementsByClassName('key')).forEach(element => {
  element.addEventListener('mousedown', () => {
    let item = element;
    let insertText = item.id[3];
    for (let elem of keyboard.getSpecialKeys()) {
      if (elem[1] === item.innerHTML) { insertText = elem[2]; }
    }
    if (item.id === 'keyShift' || item.id === 'keyShiftLeft') {
      for (let el of keyboardContainer.childNodes) {
        if (el.innerHTML.length <= 1) {
          el.innerHTML = el.innerHTML.toUpperCase();
          if (el.id.length <= 4) { el.id = 'key' + el.id[3].toUpperCase(); }
          let shiftKeys = keyboard.getLanguage() === 'eng' ? englishShiftKeys : russianShiftKeys;
          for (let j = 0; j < englishShiftKeys.length; j += 1) {
            keyboardContainer.childNodes[j].innerHTML = shiftKeys[j];
            keyboardContainer.childNodes[j].id = 'key' + shiftKeys[j];
          }
          if (keyboard.getLanguage() === 'rus') {
            keyboardContainer.childNodes[27].innerHTML = '/';
            keyboardContainer.childNodes[27].id = 'key/';
            keyboardContainer.childNodes[52].innerHTML = ',';
            keyboardContainer.childNodes[52].id = 'key,';
          }
          if (keyboard.getLanguage() === 'eng') {
            keyboardContainer.childNodes[25].innerHTML = '{';
            keyboardContainer.childNodes[26].innerHTML = '}';
            keyboardContainer.childNodes[27].innerHTML = '|';
            keyboardContainer.childNodes[39].innerHTML = ':';
            keyboardContainer.childNodes[40].innerHTML = '"';
            keyboardContainer.childNodes[50].innerHTML = '<';
            keyboardContainer.childNodes[51].innerHTML = '>';
            keyboardContainer.childNodes[52].innerHTML = '?';
            keyboardContainer.childNodes[25].id = 'key{';
            keyboardContainer.childNodes[26].id = 'key}';
            keyboardContainer.childNodes[27].id = 'key|';
            keyboardContainer.childNodes[39].id = 'key:';
            keyboardContainer.childNodes[40].id = 'key"';
            keyboardContainer.childNodes[50].id = 'key<';
            keyboardContainer.childNodes[51].id = 'key>';
            keyboardContainer.childNodes[52].id = 'key?';
          }
        }
      }
    }
    if (item.className === 'key' && (item.id === 'keyShift' || item.id === 'keyShiftLeft')) item.className = 'key caps';
    else item.className = 'key active';
    if (item.id === 'keyBackspace') backspaceAtCursor(textArea);
    else if (item.id === 'keyDelete') deleteAtCursor(textArea);
    else if (item.id !== 'keyCapsLock' && item.id !== 'keyControlLeft' && item.id !== 'keyAltLeft' && item.id !== 'keyMeta' && item.id !== 'keyControl' && item.id !== 'keyAlt' && item.id !== 'keyShift' && item.id !== 'keyShiftLeft') { insertAtCursor(textArea, insertText); }
  });
});

document.addEventListener('mouseup', event => {
  if (event.target.id === 'keyShiftLeft' || event.target.id === 'keyShift') {
    let item = event;
    item.className = 'key';
    keyboard.renderKeyBoard();
  }
  for (let item of keyboardContainer.childNodes) { if (item.className === 'key active' && item.className !== 'key caps') item.className = 'key'; }
});
document.addEventListener('keydown', event => {
  if (event.altKey && event.ctrlKey) {
    keyboard.rerenderKeyBoard();
    let caps = document.getElementById('keyCapsLock');
    if (caps.className === 'key caps') caps.className = 'key';
  }
  if (event.key === 'Tab') {
    event.preventDefault();
    insertAtCursor(textArea, '\t');
  }
  if (event.key === 'Alt' || event.key === 'Meta') {
    event.preventDefault();
  }
  for (let item of keyboardContainer.childNodes) {
    if ((event.key === 'Control' || event.key === 'Alt') && event.location === 1) {
      document.getElementById(`key${event.key}Left`).className = 'key active';
      return;
    }
    if (event.key === 'Shift' && item.innerHTML.length === 1) {
      if (event.location === 1) document.getElementById(`key${event.key}Left`).className = 'key active';
      if (event.location === 2) document.getElementById(`key${event.key}`).className = 'key active';
      item.innerHTML = item.innerHTML.toUpperCase();
      if (item.id.length <= 4) { item.id = 'key' + item.id[3].toUpperCase(); }
      let shiftKeys = keyboard.getLanguage() === 'eng' ? englishShiftKeys : russianShiftKeys;
      for (let j = 0; j < englishShiftKeys.length; j += 1) {
        keyboardContainer.childNodes[j].innerHTML = shiftKeys[j];
        keyboardContainer.childNodes[j].id = 'key' + shiftKeys[j];
      }
      if (keyboard.getLanguage() === 'rus') {
        keyboardContainer.childNodes[27].innerHTML = '/';
        keyboardContainer.childNodes[27].id = 'key/';
        keyboardContainer.childNodes[52].innerHTML = ',';
        keyboardContainer.childNodes[52].id = 'key,';
      }
      if (keyboard.getLanguage() === 'eng') {
        keyboardContainer.childNodes[25].innerHTML = '{';
        keyboardContainer.childNodes[26].innerHTML = '}';
        keyboardContainer.childNodes[27].innerHTML = '|';
        keyboardContainer.childNodes[39].innerHTML = ':';
        keyboardContainer.childNodes[40].innerHTML = '"';
        keyboardContainer.childNodes[50].innerHTML = '<';
        keyboardContainer.childNodes[51].innerHTML = '>';
        keyboardContainer.childNodes[52].innerHTML = '?';
        keyboardContainer.childNodes[25].id = 'key{';
        keyboardContainer.childNodes[26].id = 'key}';
        keyboardContainer.childNodes[27].id = 'key|';
        keyboardContainer.childNodes[39].id = 'key:';
        keyboardContainer.childNodes[40].id = 'key"';
        keyboardContainer.childNodes[50].id = 'key<';
        keyboardContainer.childNodes[51].id = 'key>';
        keyboardContainer.childNodes[52].id = 'key?';
      }
    }
    if (event.key === 'CapsLock' && item.innerHTML.length === 1) {
      if ((item.innerHTML.charCodeAt(0) >= 97 && item.innerHTML.charCodeAt(0) <= 122)
       || (item.innerHTML.charCodeAt(0) >= 1072 && item.innerHTML.charCodeAt(0) <= 1105)) {
        if (item.id.length <= 4) { item.id = 'key' + item.id[3].toUpperCase(); }
        item.innerHTML = item.innerHTML.toUpperCase();
      } else {
        item.innerHTML = item.innerHTML.toLowerCase();
        if (item.id.length <= 4) { item.id = 'key' + item.id[3].toLowerCase(); }
      }
    }

    let keyId = 'key' + event.key;

    if ((keyId === item.id && keyId !== 'keyShift')) {
      item.className = 'key active';
    }
  }
  if (event.key === 'CapsLock') {
    let caps = document.getElementById('keyCapsLock');
    if (keyboard.changeCaps() === true) caps.className = 'key caps';
    else caps.className = 'key';
  }
});

document.addEventListener('keyup', event => {
  for (let item of keyboardContainer.childNodes) {
    if ((event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt') && event.location === 1) {
      document.getElementById(`key${event.key}Left`).className = 'key';
    }
    if (event.key === 'Shift' && item.innerHTML.length === 1) {
      keyboard.renderKeyBoard();
    }
    let keyId = 'key' + event.key;
    if (keyId === item.id && keyId !== 'keyCapsLock') { item.className = 'key'; }
  }
});

document.getElementById('keyCapsLock').onclick = () => {
  let caps = document.getElementById('keyCapsLock');
  if (keyboard.changeCaps() === true) caps.className = 'key caps';
  else caps.className = 'key';
  for (let item of keyboardContainer.childNodes) {
    if (item.innerHTML.length === 1) {
      if ((item.innerHTML.charCodeAt(0) >= 97 && item.innerHTML.charCodeAt(0) <= 122)
      || (item.innerHTML.charCodeAt(0) >= 1072 && item.innerHTML.charCodeAt(0) <= 1105)) {
        if (item.id.length <= 4) { item.id = 'key' + item.id[3].toUpperCase(); }
        item.innerHTML = item.innerHTML.toUpperCase();
      } else {
        item.innerHTML = item.innerHTML.toLowerCase();
        if (item.id.length <= 4) { item.id = 'key' + item.id[3].toLowerCase(); }
      }
    }
  }
};
