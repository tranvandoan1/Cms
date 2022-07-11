import { axiosClient } from "./Axios";

export const signup = (item: any) => {
  const url = "/signup";
  return axiosClient.post(url, item);
};

export const getAll = () => {
  const url = "/users";
  return axiosClient.get(url);
};

export const get = (id: any) => {
  const url = `/users/${id}`;
  return axiosClient.get(url);
};

export const edit = (item: any) => {
  const url = `/users/${item.id}`;
  return axiosClient.patch(url, item);
};

export const filter = (value: string) => {
  const url = `/users?email_like=${value}`;
  return axiosClient.get(url);
};

export const remove = (id: any) => {
  const url = `/users/${id}`;
  return axiosClient.delete(url);
};
