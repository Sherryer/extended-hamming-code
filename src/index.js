const setConfig = ({ pow } = { pow: 4 }) => {
  if (isNaN(pow)) {
    throw new Error('please pass number');
  }
  if (pow < 4) {
    throw new Error(`argument need > 4, now is ${pow}`);
  }
  const BlockLength = Math.pow(2, pow);
  const ContainerLength = BlockLength - pow - 1;
  const position = [0];
  for (let i = 0; i < pow; i++) {
    position.push(1 << i);
  }

  const xor = (array) => (array.length ? array.reduce((one, two) => one ^ two) : 0);
  const handlePosition = (index) => position.includes(index);

  const hammingList = (str) => {
    if (str.length > ContainerLength) {
      const message = `${str} length is too long, max ${ContainerLength}`;
      throw new Error(message);
    }
    const hammingBlock = [];
    const trueIndexList = [];
    const strLength = str.length;
    for (let i = 0, j = 0; j < strLength; i++) {
      if (handlePosition(i)) {
        hammingBlock[i] = 0;
      } else {
        if (str[j] && +str[j] !== 0) {
          trueIndexList.push(i);
        }
        hammingBlock[i] = str[j] || 0;
        j++;
      }
    }

    const xorData = `${xor(trueIndexList).toString(2)}`.padStart(pow, 0);

    for (let i = 0, xorLength = xorData.length; i < xorLength; i++) {
      const position = Math.pow(2, i);
      if (+xorData[xorLength - i - 1]) {
        hammingBlock[position] = xorData[xorLength - i - 1];
      }
    }
    hammingBlock[0] = xor(hammingBlock);
    return hammingBlock;
  };

  const decodeHammingList = (str) => {
    const numList = str.split('');
    // 整体奇偶性正确
    const totalCorrect = !xor(numList);

    const trueList = [];
    for (let i = 1; i < numList.length; i++) {
      if (numList[i] && +numList[i]) {
        trueList.push(i);
      }
    }

    const xorData = xor(trueList);

    let correct = false; // 返回数据是否正确
    // 都正确
    if (xorData === 0 && totalCorrect) {
      correct = true;
    }
    // 多位反转无法修复
    if (xorData !== 0 && totalCorrect) {
      correct = false;
    }
    // 1位反转可修复
    if (xorData !== 0 && !totalCorrect) {
      correct = true;
      numList[xorData] = Number(!+numList[xorData]);
    }
    const code = [];
    for (let i = 0; i < numList.length; i++) {
      if (!handlePosition(i)) {
        code.push(numList[i]);
      }
    }
    return {
      correct,
      code: code.join(''),
      originCode: str,
    };
  };

  const sliceContainer = (data, lengh) => {
    const result = [];
    for (let i = 0, len = data.length; i < len; i += lengh) {
      result.push(data.slice(i, i + lengh));
    }
    return result;
  };

  const encode = (str) => {
    const sliceArray = sliceContainer(str, ContainerLength);
    return sliceArray
      .map((item) => hammingList(item))
      .flat()
      .join('');
  };

  const decode = (str) => {
    const sliceArray = sliceContainer(str, BlockLength);
    const decodeResult = sliceArray.map((item) => decodeHammingList(item));
    const res = decodeResult.reduce((one, two) => {
      return {
        correct: one.correct && two.correct,
        code: one.code + two.code,
        originCode: one.originCode + two.originCode,
      };
    });
    return {
      ...res,
      decodeResult,
    };
  };

  return {
    encode,
    decode,
  };
}

export default {
  setConfig
};