import { axiosClient } from "./Axios";

export const getAll = () => {
  const url = `/artist`;
  return axiosClient.get(url);
};

export const add = (data) => {
  const url = `/artist`;
  return axiosClient.post(url, data);
};

export const remove = (id, data) => {
  const url = `/artist/${id}`;
  return axiosClient.delete(url, data);
};
export const upload = (id, data) => {
  const url = `/artist/${id}`;
  return axiosClient.put(url, data);
};
