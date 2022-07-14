import { axiosClient } from "./Axios";

export const getAll = () => {
  const url = `/user`;
  return axiosClient.get(url);
};

export const add = (data) => {
  const url = `/user`;
  return axiosClient.post(url, data);
};

export const remove = (id, data) => {
  const url = `/user/${id}`;
  return axiosClient.delete(url, data);
};
export const upload = (id, data) => {
  const url = `/user/${id}`;
  return axiosClient.put(url, data);
};
