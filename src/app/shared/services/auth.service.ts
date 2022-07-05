import axios from "axios";
import API_URL from "../../../environments/environment";
import { message } from "antd";
import { ERROR_CODE, ERROR_MESSAGE_500, ERROR_MESSAGE_401, INFO_LOCALSTORAGE, ERROR_CONNECT } from './../constants/constant';

const Login = () => {
  const defaultOptions = {
    baseURL: API_URL.API,
    headers: {
      "Content-Type": "application/json",
    },
  };
  let instance = axios.create(defaultOptions);
  instance.interceptors.response.use((res) => {
    return Promise.resolve(res);
  },
    (error) => {
      // message.error({
      //   key: "error",
      //   content: ERROR_MESSAGE_500
      // });
      message.error({
        key: "error3",
        content: ERROR_CONNECT
      });
      return Promise.reject(error);
    })
  return instance;
};

export default Login();

