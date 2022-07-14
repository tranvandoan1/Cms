import { axiosClient } from "./Axios";

export const getAll = () => {
  const url = `/songs`;
  return axiosClient.get(url);
};

export const add = (data) => {
  const url = `/songs`;
  return axiosClient.post(url, data);
};

export const remove = (id, data) => {
  const url = `/songs/${id}`;
  return axiosClient.delete(url, data);
};
export const upload = (id, data) => {
  const url = `/songs/${id}`;
  return axiosClient.put(url, data);
};
