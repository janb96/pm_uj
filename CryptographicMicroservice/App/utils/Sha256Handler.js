let hash = require('hash.js');

class Sha256Handler {

    constructor() {
    }

    makeHash(plaintext) {
        return hash.sha256().update(plaintext).digest('hex');
    }

}

module.exports = Sha256Handler;