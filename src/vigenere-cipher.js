const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  getNewLetter(letter, keyLetter, isEncrypt) {
    const letterCode = letter.charCodeAt(0) - 65;
    const keyCode = keyLetter.charCodeAt(0) - 65;
    let newCode;
    if (isEncrypt) {
      newCode = (letterCode + keyCode) % 26;
    } else {
      newCode = (letterCode - keyCode + 26) % 26;
    }

    return String.fromCharCode(newCode + 65);
  }

  encrypt(message, key) {
    if (message === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }
    const text = message.toUpperCase();
    const password = key.toUpperCase();
    let encryptedText = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i += 1) {
      const letter = text[i];

      if (letter >= 'A' && letter <= 'Z') {
        const keyLetter = password[keyIndex % password.length];
        encryptedText += this.getNewLetter(letter, keyLetter, true);
        keyIndex += 1;
      } else {
        encryptedText += letter;
      }
    }

    if (!this.isDirect) {
      encryptedText = encryptedText.split('').reverse().join('');
    }
    return encryptedText;
  }

  decrypt(message, key) {
    if (message === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }
    const text = message.toUpperCase();
    const password = key.toUpperCase();
    let decryptedText = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i += 1) {
      const letter = text[i];
      if (letter >= 'A' && letter <= 'Z') {
        const keyLetter = password[keyIndex % password.length];
        decryptedText += this.getNewLetter(letter, keyLetter, false);
        keyIndex += 1;
      } else {
        decryptedText += letter;
      }
    }
    if (!this.isDirect) {
      decryptedText = decryptedText.split('').reverse().join('');
    }

    return decryptedText;
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
