class CryptographicResponse {

    constructor(status, message, cipher) {
        this.status = status;
        this.message = message;
        this.cipher = cipher;
    }

}

module.exports = CryptographicResponse;