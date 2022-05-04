class Keyboard {
  constructor(keyboardType) {
    this.keyboardType = keyboardType;
  }

  getKeyboard() {
    return this.keyboardType;
  }

  setKeyboard(keyboardType) {
    this.keyboardType = keyboardType;
  }
}
let englishLowerCase = [
  'ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\x2F', 'del',
  'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '.', 'Enter',
  'Shift', '\x2F', 'z', 'x', 'c', 'v', 'b', 'n', 'M', ',', '.', '/', '▲', 'Shift',
  'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'
];
let keyboard = new Keyboard(englishLowerCase);
let body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', '<textarea class=\'text_input\'></textarea>');
let keyboardContainer = document.createElement('div');
let textArea = document.querySelector('textarea');
textArea.focus();
keyboardContainer.className = 'keyboard_container';
body.insertAdjacentElement('beforeend', keyboardContainer);
for (let i = 0; i < englishLowerCase.length; i += 1) {
  keyboardContainer.insertAdjacentHTML('beforeend', `<div class='key'>${englishLowerCase[i]}</div>`);
}
Array.from(document.getElementsByClassName('key')).forEach(element => {
  element.addEventListener('mousedown', () => {
    let item = element;
    textArea.value += item.innerHTML;
    item.className = 'key active';
  });
});
Array.from(document.getElementsByClassName('key')).forEach(function (element) {
    element.addEventListener('mouseup', function () {
        element.className = 'key';
    });
  });
document.addEventListener('keydown', function (event) {
  console.log(event.key);
  for(let item of keyboardContainer.childNodes) {
      if(item.innerHTML==event.key)
        item.className = "key active";
  }
});
document.addEventListener('keyup', function (event) {
    console.log(event.key);
    for(let item of keyboardContainer.childNodes) {
        if(item.innerHTML==event.key)
          item.className = "key";
    }
  });