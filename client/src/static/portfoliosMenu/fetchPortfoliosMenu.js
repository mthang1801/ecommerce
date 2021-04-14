import {api} from "../../utils/api"
import axios from "axios";

export const fetchPortfoliosMenu = () => {
  return new Promise(async (resolve, reject) => {
    try {
      
      const {data} = await axios.get(api.FETCH_PORTFOLIOS_MENU);
      resolve(true)
    } catch (error) {
      reject(error);
    }
  })
}