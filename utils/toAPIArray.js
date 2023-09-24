const toAPIArray = (array) => {
  const arrayData = [];
  for (let i = 0; i < array.length; i += 1) {
    arrayData[i] = array[i].toAPI();
  }
  return arrayData;
};

export default toAPIArray;
