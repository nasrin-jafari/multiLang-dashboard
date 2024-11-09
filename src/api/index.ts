import axios from "axios";
import { toast } from "react-toastify";
import i18n from "i18next";
const BASE_URL = "https://api.open-meteo.com/v1/forecast";
const config = {
  baseURL: BASE_URL,
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
      toast.success(i18n.t("toast.searchSuccess"));
    }

    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(
          i18n.t("toast.badRequest", { message: error.response.data.msg }),
        );
      }
    } else if (error.request) {
      toast.error(i18n.t("toast.serverError"));
    } else {
      toast.error(i18n.t("toast.serverError"));
    }

    return Promise.reject(error);
  },
);

export default axiosMethod;
