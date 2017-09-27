import CryptoJS from 'crypto-js';

const secretKey = "smarthomegyeyoungandcvnet1234567";
const options = { iv : CryptoJS.enc.Hex.parse("0000000000000000"), padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.CBC};

export const encryptedKey = (value) => {
    const encrypt = '' +CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), CryptoJS.enc.Utf8.parse(secretKey), options);
    
    return encrypt;
}

export const decryptedKey = (value) => {
    const decrypted = CryptoJS.AES.decrypt(value, CryptoJS.enc.Utf8.parse(secretKey), options);
    return decrypted.toString(CryptoJS.enc.Utf8);
}


