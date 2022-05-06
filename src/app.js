let englishLowerCase = [
  '`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift',
  'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'
];
let englishShiftKeys = [
  '~', `!`, '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'
];
let russianShiftKeys = [
  'Ё', `!`, '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+'
]
let russianLowerCase = [
  'ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'Delete',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift',
  'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'
];
class Keyboard {
  constructor(keyboardType) {
    this.keyboardType = keyboardType;
    this.keyboardLang = 'rus';
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
  getLanguage() {
    return this.keyboardLang;
  }
  setRussianKeyboard() {
    this.keyboardType = russianLowerCase;
    this.keyboardLang = 'rus';
  }
  setEnglishKeyboard() {
    this.keyboardType = englishLowerCase;
    this.keyboardLang = 'eng';
  }
  rerenderKeyBoard() {
    this.keyboardLang == 'eng'? this.setRussianKeyboard(): this.setEnglishKeyboard(); 

    let keyboardContainer = document.querySelector('.keyboard_container');
    
    for (let i = 0; i < this.getKeyboard().length; i += 1) {
      keyboardContainer.childNodes[i].innerHTML = this.getKeyboard()[i];
      if(keyboardContainer.childNodes[i].innerHTML!='Shift'&& keyboardContainer.childNodes[i].innerHTML!='Ctrl' && keyboardContainer.childNodes[i].innerHTML!='Alt')
      keyboardContainer.childNodes[i].id =`key${this.getKeyId(this.getKeyboard()[i])}`;
    }
  }
  setKeyboard(keyboardType) {
    this.keyboardType = keyboardType;
  }

  getKeyId(id) {
  for (let item of this.specialKeys) {
          if(item[1]==id) { 
            if(item[1] == 'Shift' && !document.getElementById('keyShiftLeft'))
              return 'ShiftLeft';
            if(item[1] == 'Ctrl' && !document.getElementById('keyControlLeft'))
              return 'ControlLeft';
            if(item[1] == 'Alt' && !document.getElementById('keyAltLeft'))
              return 'AltLeft';
            else
            return item[0]; 
          }
          
    }
  return id;
  }
}
function insertAtCursor(myField, myValue) {
  if (myField.selectionStart || myField.selectionStart == '0') {

    let startPos = myField.selectionStart;
    let endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos)
          + myValue
          + myField.value.substring(endPos, myField.value.length);
      textArea.setSelectionRange(startPos + 1, endPos + 1);
    
  } else {
      myField.value += myValue;
  }
}
backspaceAtCursor = (textArea) => {

    let startPos = textArea.selectionStart;
    let endPos = textArea.selectionEnd;
    console.log(startPos+":"+endPos);
    if(startPos==0 && endPos==0)
    textArea.setSelectionRange(0,0);
    else {
    if(startPos==endPos) {
    textArea.value = textArea.value.substring(0, startPos-1)
          + textArea.value.substring(endPos, textArea.value.length);
    textArea.setSelectionRange(startPos-1, endPos-1);
    }
    
    else {
      textArea.value = textArea.value.substring(0, startPos)
          + textArea.value.substring(endPos, textArea.value.length);
    textArea.setSelectionRange(startPos, startPos);
    }
  }
}
deleteAtCursor = (textArea) => {
  let startPos = textArea.selectionStart;
    let endPos = textArea.selectionEnd;
    console.log(startPos+":"+endPos);
    
    if(startPos==endPos) {
    textArea.value = textArea.value.substring(0, startPos)
          + textArea.value.substring(endPos+1, textArea.value.length);
    textArea.setSelectionRange(startPos, endPos);
    }
    
    else {
      textArea.value = textArea.value.substring(0, startPos)
          + textArea.value.substring(endPos, textArea.value.length);
    textArea.setSelectionRange(startPos, startPos);
    }
}

let keyboard = new Keyboard(russianLowerCase);
let body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', '<textarea onblur="this.focus()" autofocus class=\'text_input\'></textarea>');
body.insertAdjacentHTML('afterbegin', '<h1 class=\'text_header\'>Virtual keyboard by Oscarishe</h1>');
let keyboardContainer = document.createElement('div');
let textArea = document.querySelector('textarea');
textArea.focus();
keyboardContainer.className = 'keyboard_container';
body.insertAdjacentElement('beforeend', keyboardContainer);
for (let i = 0; i < keyboard.getKeyboard().length; i += 1) {
  keyboardContainer.insertAdjacentHTML('beforeend', `<div class='key' id = 'key${keyboard.getKeyId(keyboard.getKeyboard()[i])}'>${keyboard.getKeyboard()[i]}</div>`);
}

Array.from(document.getElementsByClassName('key')).forEach(element => {
  element.addEventListener('mousedown', () => {
    let item = element;
    let insertText = item.innerHTML;
    
    for(let elem of keyboard.getSpecialKeys()) {
      if(elem[1]==item.innerHTML) 
      insertText= elem[2];
    }
    item.className = 'key active';
    if(item.id=='keyBackspace') 
      backspaceAtCursor(textArea);
    if(item.id=='keyDelete')
      deleteAtCursor(textArea);
    else
    insertAtCursor(textArea, insertText);
    
  });
});

document.addEventListener('mouseup', event => {
  for(let item of keyboardContainer.childNodes)
        if(item.className=='key active')
        item.className = 'key';
})
document.addEventListener('keydown', function (event) {
  console.log(event.location);
  if(event.altKey && event.ctrlKey) {
    keyboard.rerenderKeyBoard();
  }
  for (let item of keyboardContainer.childNodes) {
      if((event.key =='Control' || event.key == 'Alt') && event.location==1) {
          console.log(document.getElementById(`key${event.key}Left`));
          document.getElementById(`key${event.key}Left`).className = 'key active';
          return;
      }
      if(event.key=="Shift" && item.innerHTML.length==1 ) {
        if(event.location==1) document.getElementById(`key${event.key}Left`).className = 'key active';
        if(event.location==2) document.getElementById(`key${event.key}`).className = 'key active';
        item.innerHTML= item.innerHTML.toUpperCase();
        if(item.id.length<=4)
        item.id = 'key' + item.id[3].toUpperCase();
        let shiftKeys = keyboard.getLanguage() == 'eng' ? englishShiftKeys : russianShiftKeys;
        for(let j=0; j<englishShiftKeys.length;j++) {
              keyboardContainer.childNodes[j].innerHTML = shiftKeys[j];
        }
      }
      if(event.key=="CapsLock" && item.innerHTML.length==1) {
        if((item.innerHTML.charCodeAt(0)>=97 && item.innerHTML.charCodeAt(0)<=122) || (item.innerHTML.charCodeAt(0)>=1072 && item.innerHTML.charCodeAt(0)<=1105)) {
          document.getElementById('keyCapsLock').className = 'key active';
          if(item.id.length<=4)
          item.id = 'key' + item.id[3].toUpperCase();
          item.innerHTML = item.innerHTML.toUpperCase();
        }
        else {
          document.getElementById('keyCapsLock').className = 'key active';
          item.innerHTML = item.innerHTML.toLowerCase();
          if(item.id.length<=4)
          item.id = 'key' + item.id[3].toLowerCase();
        }
      }
      let keyId = 'key' + event.key;
      
      if((keyId==item.id && keyId!='keyShift')) {
        item.className = 'key active';
      }
      
  }
});

document.addEventListener('keyup', function (event) {

    for(let item of keyboardContainer.childNodes) {
      if(( event.key == 'Shift' || event.key =='Control' || event.key == 'Alt') && event.location==1) {
        document.getElementById(`key${event.key}Left`).className = 'key'
    }
      if(event.key=="Shift" && item.innerHTML.length==1 ) {
        item.innerHTML= item.innerHTML.toLowerCase();
        if(item.id.length<=4)
        item.id = 'key' + item.id[3].toLowerCase();
        for(let j=0; j<englishShiftKeys.length;j++) {
          keyboardContainer.childNodes[j].innerHTML = englishLowerCase[j];
    }
      }
      let keyId = 'key' + event.key;
      if(keyId==item.id)
          item.className = "key";
    }
  });

 document.getElementById('keyCapsLock').onclick = () => {
  for(let item of keyboardContainer.childNodes)
  if(item.innerHTML.length==1) {
    if((item.innerHTML.charCodeAt(0)>=97 && item.innerHTML.charCodeAt(0)<=122) || (item.innerHTML.charCodeAt(0)>=1072 && item.innerHTML.charCodeAt(0)<=1105)) {
      document.getElementById('keyCapsLock').className = 'key active';
      if(item.id.length<=4)
      item.id = 'key' + item.id[3].toUpperCase();
      item.innerHTML = item.innerHTML.toUpperCase();
    }
    else {
      document.getElementById('keyCapsLock').className = 'key';
      item.innerHTML = item.innerHTML.toLowerCase();
      if(item.id.length<=4)
      item.id = 'key' + item.id[3].toLowerCase();
    }
  }
 }
