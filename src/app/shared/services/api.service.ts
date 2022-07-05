import { ERROR_CODE, ERROR_MESSAGE_500, ERROR_MESSAGE_401, INFO_LOCALSTORAGE, ERROR_CONNECT } from './../constants/constant';
import { message } from "antd";
import axios from "axios";
import API_URL from "../../../environments/environment";

const ApiService = () => {
  const defaultOptions = {
    baseURL: API_URL.API,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let token = localStorage.getItem(INFO_LOCALSTORAGE.TOKEN);
  // Create instance
  let instance = axios.create(defaultOptions);
  if (token != null && token !== "") {
    instance.interceptors.request.use(function (config: any) {
      //add token to header
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    });
    instance.interceptors.response.use(
      (res) => {
        return Promise.resolve(res);
      },
      (error) => {
        if(error.response.status === ERROR_CODE.ERROR_500){
          message.error({
            key: ERROR_CODE.ERROR_500,
            content: ERROR_MESSAGE_500
          });
          window.location.href = "/error500";
        }
        if(error.response.status === ERROR_CODE.ERROR_401){
          message.error({
            key: ERROR_CODE.ERROR_401,
            content: ERROR_MESSAGE_401
          });
          // window.location.href = "/error500";
        }
        // window.location.href = "/error500";
        message.error({
          key: "error3",
          content: ERROR_CONNECT
        });
        console.log("error: ", error);
        return Promise.reject(error);
      }
    );
  }
  return instance;
};
export default ApiService();
