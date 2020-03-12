const bcrypt = require('bcrypt');
const saltRounds = 2;

class BcryptHandler {

    constructor() {

    }

    async hashPassword(plaintextPassword) {
        return await bcrypt.hash(plaintextPassword, saltRounds);
    }

    async checkPassword(plaintextPassword, hashPassword) {
        return await bcrypt.compare(plaintextPassword, hashPassword);
    }

}

module.exports = BcryptHandler;