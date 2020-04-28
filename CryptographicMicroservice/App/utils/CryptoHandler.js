let CryptoJS = require("crypto-js");

const secretKey = "my private key";

class CryptoHandler {

    constructor() {

    }

    encryptText(plaintext) {
        return CryptoJS.AES.encrypt(plaintext, secretKey).toString();
    }

    decryptText(ciphertext) {
        let bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    encryptObject(object) {
        return CryptoJS.AES.encrypt(JSON.stringify(object), secretKey).toString();
    }

    decryptObject(ciphertext) {
        let bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

}

module.exports = CryptoHandler;