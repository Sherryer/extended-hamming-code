var hamming = require('./lib/index')

for (let i = 4; i < 10; i++) {
  const {
    encode,
    decode,
  } = hamming.setConfig({
    pow: 5
  })

  var str = '1010101010101010101010101010101010';
  var encodeRes = encode(str);
  var decodeRes = decode(encodeRes);
  // console.log(`encode:`, encodeRes);
  // console.log(`decode:`, decodeRes);
  console.log('result:', decodeRes.code === str)
}
