# extended-hamming-code

extended [hamming code](https://en.wikipedia.org/wiki/Hamming_code) allows you to encode and decode binary strings, it has not any dependencies.Works only with binary strings. For example '101010'.

extended means first index of code handle odd-even of all code. 

It is UMD module. It means it capable of working in AMD, CommonJS-like, nodejs, browrser environments. For more information go to [UMD](https://github.com/umdjs/umd).


# usage

```js
npm install extended-hamming-code -S
```

```js
import ExtendHammingCode from 'extended-hamming-code';

const {
  encode,
  decode,
} = ExtendHammingCode.setConfig({
  pow: 4
})
```

# Options

| Name | Type   | Default | Description                                                                                                                  |
|------|--------|---------|------------------------------------------------------------------------------------------------------------------------------|
| `pow`  | Number | 4       | preset max size of encode size, you will get [`Math.pow(2, pow)`, `Math.pow(2, pow) - pow - 1`] hamming code's encode and decode |

relation of 'pow' and size :

| pow | size                                         | Description                                                                        |
|-----|----------------------------------------------|------------------------------------------------------------------------------------|
| 4   | [16, 11]                                     | Maximum encoding 11 bit, Maximum return 16 bit                                     |
| 5   | [32, 26]                                     | Maximum encoding 26 bit, Maximum return 32 bit                                     |
| 6   | [64, 57]                                     | Maximum encoding 57 bit, Maximum return 64 bit                                     |
| n   | [`Math.pow(2, n)`, `Math.pow(2, n) - n - 1`] | Maximum encoding `Math.pow(2, n) - n - 1` bit, Maximum return `Math.pow(2, n)` bit |


#  example

when we set 4 to pow，we will get [16, 11] hamming code's encode and decode methord.

in this case, maximum encode 11 bit. when encode too long like this case below. `str` will be splited as many parts，and be encoded for each of them. join each other and return.


```js
import ExtendHammingCode from 'extended-hamming-code';

const {
  encode,
  decode,
} = ExtendHammingCode.setConfig({
  pow: 4
})

const str = '1010101010101010101010101010101010';
const encodeRes = encode(str);
const decodeRes = decode(encodeRes);
const {
  code,
  correct,
  originCode,
  decodeResult,
} = decodeRes;
console.log(`encode:`, encodeRes);
console.log(`decode:`, decodeRes);
console.log('is correct?', correct, code === str)

```

### result of decode:

| key            | type    | Description              |
|----------------|---------|--------------------------|
| `code`         | String  | result code of decode    |
| `correct`      | Boolean | correct or not           |
| `originCode`   | String  | input data               |
| `decodeResult` | Array   | all parts of decode data |
