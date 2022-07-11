import { axiosClient } from "./Axios";

export const getAll = () => {
  const url = `/setlists`;
  return axiosClient.get(url);
};

export const add = (data) => {
  const url = `/setlists`;
  return axiosClient.post(url, data);
};

export const remove = (id, data) => {
  const url = `/setlists/${id}`;
  return axiosClient.delete(url, data);
};
export const upload = (id, data) => {
  console.log(id,data)
  const url = `/setlists/${id}`;
  return axiosClient.put(url, data);
};
