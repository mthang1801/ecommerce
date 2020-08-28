import axios from "axios";
import urls from "./urls";
export const getMenu = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(urls.GET_PRODUCT_CATEGORY_MENU);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const createMenu = (dataJSON) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(urls.POST_CREATE_MENU_FILE, dataJSON);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
