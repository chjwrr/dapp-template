import CryptoJS from 'crypto-js'
const key = 'f6ac9dc91e464630'
const iv = '82757b5722648926'
export function encrypt(data:string){
  const dataHex = CryptoJS.enc.Utf8.parse( data )
  const keyHex = CryptoJS.enc.Utf8.parse( key )
  const ivHex = CryptoJS.enc.Utf8.parse( iv )
  const encrypted = CryptoJS.AES.encrypt( dataHex , keyHex , {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  let encryptedVal = encrypted.ciphertext.toString()
  console.log('-=encryptedVal--=-',encryptedVal)
}
export function decrypt(data:string){
  let encryptedHexStr = CryptoJS.enc.Hex.parse( data  );
  let srcs = CryptoJS.enc.Base64.stringify( encryptedHexStr );
  const keyHex1 = CryptoJS.enc.Utf8.parse( key )
  const ivHex1 = CryptoJS.enc.Utf8.parse( iv )
  let decrypt = CryptoJS.AES.decrypt( srcs , keyHex1 , {
      iv: ivHex1,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
  });
  let decryptedStr = decrypt.toString( CryptoJS.enc.Utf8 );
  console.log('-=-decryptedStr-=-',decryptedStr)
}





