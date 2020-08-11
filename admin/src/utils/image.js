export const generateBase64FromImage = (fileImage) => {
  const file = fileImage.files[0];
  let fileReader = new FileReader();
  let promise = new Promise((resolve, reject) => {
    fileReader.onload = (e) => resolve(e.target.result);
    fileReader.onerror = (err) => reject(err);
  });
  fileReader.readAsDataURL(file);
  return promise;
};
