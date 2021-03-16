const encodeLinkUrl = (pathLink) => {
  if (typeof pathLink !== "string") {
    return false;
  }
  return encodeURIComponent(pathLink.replace(/[^\w\s]/gi, "") + Date.now());
};
module.exports = encodeLinkUrl;
