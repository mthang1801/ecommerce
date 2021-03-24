function arrayBufferToBase64(buffer){
  return btoa( new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
}
export default arrayBufferToBase64