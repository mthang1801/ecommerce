export const generateBase64Image = (fileImage) => {
  let fileReader = new FileReader();
  let promise = new Promise((resolve, reject) => {
    fileReader.onload = (e) => resolve(e.target.result);
    fileReader.onerror = (err) => reject(err);
  });
  fileReader.readAsDataURL(fileImage);
  return promise;
};
