module.exports = (productData, query) => {
  const prodName = productData.name.toLowerCase();
  // console.log(prodName);
  const query_ = query.split(' ');
  // console.log(query_);
  const data = query_.filter((word) => {
    if (prodName.includes(word)) {
      return word;
    }
  });
  // console.log(data);
  if (data.length === query_.length) {
    console.log('check');
    return true;
  } else {
    return false;
  }
};
