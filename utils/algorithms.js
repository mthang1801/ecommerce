exports.toCapitalizeString = (str) => {
  let subArr = str.trim().split(" ");
  subArr = subArr.filter((x) => x.trim() !== "");
  let newArr = [];
  for (let subString of subArr) {
    subString = subString.trim();
    newArr.push(subString[0].toUpperCase() + subString.slice(1).toLowerCase());
  }

  let newStr = newArr.join(" ");
  console.log(newStr);
  return newStr;
};
