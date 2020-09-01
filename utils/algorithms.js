exports.toCapitalizeString = (str) => {
  let subArr = str.trim().split(" ");
  subArr = subArr.filter((x) => x.trim() !== "");
  console.log(subArr);
  function capitalizeFirstHelper(arr) {
    if (arr.length == 1) {
      return [arr[0][0].toUpperCase() + arr[0].slice(1).toLowerCase()];
    }

    let res = capitalizeFirstHelper(arr.slice(0, -1));
    const string =
      arr.slice(arr.length - 1)[0][0].toUpperCase() +
      arr
        .slice(arr.length - 1)[0]
        .substr(1)
        .toLowerCase();
    res.push(string);
    return res;
  }
  let newStr = capitalizeFirstHelper(subArr);
  return newStr.join(" ");
};
