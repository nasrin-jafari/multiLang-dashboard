import axios from "axios";
import { toast } from "react-toastify";

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

const config = {
  baseURL: WEATHER_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30000,
};
export const axiosMethod = axios.create(config);
axiosMethod.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      toast.success("جستجو با موفقیت انجام شد");
    }

    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(error.response.data.msg);
      }
    } else if (error.request) {
      toast.error("خطای سرور");
    } else {
      toast.error("خطای سرور");
    }

    return Promise.reject(error);
  },
);

export default axiosMethod;
