const coverByte = require('./index');

const dataSize = 114115;

console.log('B:', 1141165);
console.log('KB:', coverByte(1141165, 1));
console.log('MB:', coverByte(dataSize, 2));
console.log('GB:', coverByte(dataSize, 3));
console.log('TB:', coverByte(dataSize, 4));
